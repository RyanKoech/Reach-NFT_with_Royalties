'reach 0.1';
'use strict';

const Common =
    { seeOutcome: Fun([UInt, Address], Null),
      showBid: Fun([UInt, Address], Null),
      informTimeout: Fun([], Null),
      isAuctionOn: Fun([], Bool)
    };

const handlePayOut = (royalty, price, Creator, Owner) => {
  const creatorShare = (royalty * price) / 100;
  const ownerShare = price - creatorShare;
  transfer(creatorShare).to(Creator)
  transfer(ownerShare).to(Owner)
}

export const main =
  Reach.App(
    {},
    [Participant('Creator', {
      ...Common,
      getId: UInt,
      createNFT: Fun([], Object({basePrice: UInt, royalty: UInt, uri: Bytes(80) })),
      deadline: UInt,
    }),
     ParticipantClass('Bidder', {
       ...Common,
       getBid: Fun([UInt], UInt),
     }),
     View('NFT', {
       owner: Address,
     }),
    ],

    (Creator, Bidder, vNFT) => {
      Creator.only(() => {
          const id = declassify(interact.getId);
          const deadline = declassify(interact.deadline);
          const nftInfo = declassify(interact.createNFT());
          // assert(nftInfo.royalty >= 0 && nftInfo.royalty < 50);
      });
      Creator.publish(id, deadline, nftInfo);

      var [owner, price, lastBidder, keepGoing, auctionOn] = [Creator, nftInfo.basePrice, Creator, true, false];
      { vNFT.owner.set(owner); };
      invariant(balance() == 0);
      while (keepGoing) {
        if(auctionOn === false) {
          commit();

          each([Creator, Bidder], () => {
            const isAuctionOn = this === owner ? declassify(interact.isAuctionOn()) : true;
          });

          Anybody.publish(isAuctionOn).when(owner == this).timeout(false);
          if (!isAuctionOn) {
            each([Creator, Bidder], () => {
              interact.seeOutcome(price,owner);
            });
            [owner, price, lastBidder, keepGoing, auctionOn] = [owner, price, lastBidder, false, auctionOn];            
            continue;
          };
        };
        commit();

        Bidder.only(() => {
          const bid = (this !== lastBidder && this !== owner) ? declassify(interact.getBid(price)) : price;
          const winner = (this !== lastBidder && this !== owner) ? this : lastBidder;
        });

        Bidder.publish(bid, winner)
          .when(bid>price && this !== lastBidder)
          .timeout(relativeTime(deadline), () => {
            each([Creator, Bidder], () => {
              interact.seeOutcome(price, lastBidder);
            });

            Bidder.pay(price).when(lastBidder == this).timeout(relativeTime(100), () => {
              each([Creator, Bidder], () => {
                interact.informTimeout();
              });

              Bidder.publish();
              [owner, price, lastBidder, keepGoing, auctionOn] = [owner, nftInfo.basePrice, owner, true, false]
              continue;
            });
            // transfer(price).to(owner);
            handlePayOut(nftInfo.royalty, price, Creator, owner);

            [owner, price, lastBidder, keepGoing, auctionOn] = [lastBidder, nftInfo.basePrice, lastBidder, true, false]
            continue;
          })
        commit();

        each([Creator, Bidder], () => {
          interact.showBid(bid, winner);
        });

        Anybody.publish();

        [owner, price, lastBidder, keepGoing, auctionOn] = [owner, bid, winner, true, true]
        continue;
      };
      
      commit();
      exit();
    }
  );