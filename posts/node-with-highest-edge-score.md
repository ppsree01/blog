---
title: Node with highest edge score
metaDesc: 'Given a directed graph with n nodes (0 to n-1), return the node with the highest edge score'
socialImage: images/leetcode_contest.png
date: '2022-08-15'
tags: ['contest', 'leetcode', 'arrays', 'dictionary']
---

Given a directed graph with n nodes (0 to n-1), return the node with the highest edge score

Read the problem here: [Leetcode - Node with highest edge score](https://leetcode.com/contest/weekly-contest-306/problems/node-with-highest-edge-score/)

## Understanding the Problem:

You are given a **1D** array as input. The index of the array represents the source node and the element at the index represents the destination node to which it points. 

For each node provided in the array, the edge score is defined as the sum of labels of all nodes pointing to that node. 

Consider the below array:
```
edges = [1,0,0,0,0,7,7,5]
```

Here, we have node 0 pointing to node 1, node 1 pointing to node 0, node 2 pointing to node 0 and so on. The below table summarises the edge direction for the above example:

| source edge | destination edge |
| ---- | ---- |
| 0 | 1 |
| 1 | 0 |
| 2 | 0 |
| 3 | 0 |
| 4 | 0 |
| 5 | 7 |
| 6 | 7 |
| 7 | 5 |

From the above table, we arrive at the below conclusion:

| target node | nodes pointing to target node | sum of labels source nodes |
| ---- | ---- | ---- |
| 0 | 1 + 2 + 3 + 4 | 10 |
| 1 | 0 | 0 |
| 2 | NA | 0 |
| 3 | NA | 0 |
| 4 | NA | 0 |
| 5 | 7 | 7 |
| 6 | NA | 0 |
| 7 | 5 + 6 | **11** |

## Formulating the Solution:

We first create a dictionary **score** to store the maximum score for all nodes. Iterating through the *edges* array, we store the element value as the key and the running sum of indexes that match this key as value.

The final step is to iterate through the dictionary and return the key with maximum value. 
NOTE: The sorted function is used since the problem requires returning the smallest node with maximum edge score. 

### Solution:

```
# python solution
from collections import defaultdict

class Solution:
    def edgeScore(self, edges: List[int]) -> int:
        score = defaultdict(int)
        
        for index in range(len(edges)):
            score[edges[index]] += index
        
        # return the node with the highest score
        max_score = 0
        node = 0

        for i in sorted(score.keys()):
            if score[i] > max_score:
                max_score = score[i]
                node = i
                
        return node
```

## Time and Space Complexity:

The above solution passes through the array once to create the dictionary *score*. Then it iterates through all keys in the new dictionary, to find the max score. The total time complexity it:

| Input Array | Dictionary | Total | 
| ---- | ---- | ---- |
| O(n) | O(n) | O(2n) ~ O(n) |

The space complexity is O(n) since we create a dictionary out of the input array.