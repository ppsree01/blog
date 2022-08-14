---
title: 'Maximum Profit by buying and selling a stock over a given day range'
metaTitle: 'Maximum Profit by buying and selling a stock over a given day range'
metaDesc: 'Get the maximum profit obtained by buying and selling a stock over a given day range'
socialImage: images/22-09-2021.png
date: '2022-08-13'
tags: ['leetcode', 'arrays']
---

Given an array that represents the starting price of a given stock over a given day range, how do we find the maximum profit one can obtain by buying and selling the stock within the above range? 

We can iterate over the given shares and record the local minimum value seen thus far, and calculate the profit for every price higher than the local mininum. We use a different variable to store the max profit obtained.

Code for this in Typescript:

```
function MaxProfit( shares: number[] ): number {
    if ( shares.length == 0 ) {
        return 0;
    }
    const [ min, max ] = [ 
        ( a: number, b: number ) => {
            return a > b ? a : b;
        }, 
        ( a: number, b: number ) => {
            return a > b ? b : a;
        } 
    ];
    const [ localMinimum, maxProfit ] = [ shares[0], 0 ];
    for ( let share of shares ) {
        localMinimum = min( localMinimum, share );
        maxProfit = max( maxProfit, share - localMinimum );
    }
    return maxProfit;
}
```

The below test script verifies that the problem works:

```
import { MaxProfit } from '../TS/MaxProfit';
const testvar = [6, 1, 3, 10, 0, 6];
test('maxProfit for given day range should be 9', () => {
    expect(MaxProfit(testvar)).toBe(9);
});
```