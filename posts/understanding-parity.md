---
title: 'Understanding Parity'
metaDesc: 'The parity of a given number is 1 if the number of bits set is odd, otherwise it is 0'
socialImage: 'images/parity.png'
date: '2022-08-14'
tags: ['epi', 'bits']
---
The parity of a given number is 1 if the number of bits set is odd, otherwise it is 0

To calculate the parity, we use the below methods for an O(k) solution where **k** is the number of set bits in the given number

1. x & ( x - 1 ) => sets the lowest set bit in the number to 0
2. A value initially set as 0 and continuously xor-ed with 1 alternates between 0 and 1

With the above two approaches in mind, we solve parity in the below manner:

```
def parity( x ):
    count = 0
    while x:
        count ^= 1
        x &= ( x - 1)
    return count
```

In the above code, the ```count``` variable correctly alternates between 0 and 1 to generate the parity of the input.

Examples:

x = 3

| x | x - 1 | x & ( x - 1 ) | count |
| ---- | ---- | ---- | ---- |
| 0011 | 0010 | 0010 | 0 -> 1 |
| 0010 | 0001 | 0000 | 1 -> 0 |

By the end of the loop, we have count = 0, indicating a parity of 0