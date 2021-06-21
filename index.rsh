'reach 0.1';
'use strict';

export const main = Reach.App(
  {  },
  [Participant('Alice', {
    amt: UInt,
    pass: UInt
  }),
  Participant('Bob', { getPass: Fun([], UInt) })],
  (Alice, Bob) => {
    Alice.only(() => {
      const [amt, passDigest] =
        declassify([interact.amt,
        digest(interact.pass)]);
    });
    Alice.publish(passDigest, amt)
      .pay(amt);
    commit();

    Bob.only(() => {
      const pass = declassify(interact.getPass());
    });
    Bob.publish(pass);
    if (passDigest == digest(pass))
      transfer(amt).to(Bob);
    if (passDigest != digest(pass))
      transfer(amt).to(Alice);
    commit();
    exit();
  });
