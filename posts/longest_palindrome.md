---
title: 'Longest Palindrome'
metaDesc: 'Given a string s consisting of both lowercase and uppercase letters, return the largest palindrome that can be formed using characters from the string'
date: '2022-08-18'
tags: ['leetcode', 'strings']
---

Given a string consisting of both lowercase and uppercase letters, how do we find the longest palindrome that can be built using characters from the string?

Read the leetcode problem along with example cases [here](https://leetcode.com/problems/longest-palindrome/)

## Thinking about the solution:

Looking at the problem constraints: 
- the string would at max have 2000 characters 
- the characters could be uppercase / lowercase English characters 
- the palindrome is case sensitive - *Aa* is not a valid palindrome

A palindrome is a string that reads the same forward and backward. Taking one step further, we could call it as a string that contains even numbered characters and optionally one odd numbered character like the example below:

"abccccdd" --> "ccdadcc" ( a lot more combinations possible, but taking out the largest palindrome that could be formed )

"a" --> "a" ( this is the largest palindrome that could be formed using s )

### My First Attempt:

With the limited set of examples that seemed pretty straight forward, I soon came up with a simple solution: 

- Create a dictionary to store the characters along with their count
- Get the sum of count of even numbered characters
- Add the count of largest odd numbered character

I arrived at the initial solution below with the above steps in mind:

```
from collections import defaultdict

class Solution:
    def longestPalindrome(self, s: str) -> int:
    
        maxOddCount = 0
        count = 0
        lookup = defaultdict(int)

        for char in s:
            lookup[char] += 1

        for char in lookup:
            if lookup[char] % 2 != 0:
                maxOddCount = max(lookup[char], maxOddCount)
                
        for char in lookup:
            if lookup[char] % 2 == 0:
                count += lookup[char]
                
        return count + maxOddCount
```

Soon my code failed for a very large input. Writing a similar smaller test case for clarity:

| Input | Output | Expected Output |
| ---- | ---- | ---- |
| "abbbccdddeeff" | 9 | 11 |

#### Analysing:

My code created the below lookup for the above input:

```
{
    "a": 1, "b": 3, "c": 2, "d": 3, "e": 2, "f": 2
}
```

It then added up all the even numbered character counts and added the largest odd numbered character count to arrive at 9:

```
# count(c) + count(e) + count(f) + max(count(b), count(d), count(a))

2 + 2 + 2 + 3 = 9
```

What went wrong?

Looking at the above examples, I could still pull out character pairs from odd numbered characters and add to my final palindrome string.

| Input | Adding all pairs to the palindrome | Left out |
| ---- | ---- | ---- |
| "abbbccdddeeff" | "fedcbbcdef" | "abd" | 

Finally I could add one of the remaining characters to create the maximum count palindrome ( if odd numbered characters existed ).

"fedcbabcdef" - having a length of 11. ( Yay! )

### Solution:

```
from collections import defaultdict

class Solution:
    def longestPalindrome(self, s: str) -> int:

        odd, count = 0, 0
        lookup = defaultdict(int)

        for char in s:
            lookup[char] += 1

        for char in lookup:
            if lookup[char] % 2 != 0:
                lookup[char] -= 1
                odd += 1
            count += lookup[char]

        return count + (1 if odd > 0 else 0)
```

### Using collections.Counter:

```
from collections import Counter

class Solution:
    def longestPalindrome(self, s: str) -> int:

        odd, count = 0, 0
        lookup = Counter(s)

        for char in lookup:
            if lookup[char] % 2 != 0:
                lookup[char] -= 1
                odd += 1
            count += lookup[char]
        return count + (1 if odd > 0 else 0

```

Happy Coding!