const quizzes = {
  1: [
    {
      question: "What is the time complexity of finding an element in a balanced binary search tree (BST)?",
      answer:
        "In a balanced binary search tree (BST), the time complexity of finding an element is O(log n), where 'n' is the number of elements in the tree. This efficiency is achieved because at each comparison, the search space is halved.",
      distractors: ["O(n)", "O(1)", "O(n^2)"]
    },
    {
      question: "Explain the difference between a stack and a queue.",
      answer:
        "A stack is a Last In, First Out (LIFO) data structure, where elements are added and removed from the same end. A queue is a First In, First Out (FIFO) data structure, where elements are added at the back and removed from the front.",
      distractors: ["Both are LIFO", "Both are FIFO", "Stack uses two ends"]
    },
    {
      question: "What is an array, and how does it differ from a linked list?",
      answer:
        "An array is a collection of elements stored at contiguous memory locations. It has a fixed size and allows O(1) time access to elements via indexing. A linked list, on the other hand, consists of nodes where each node contains a data element and a reference (or link) to the next node, allowing dynamic size but with O(n) access time.",
      distractors: ["Linked list is contiguous", "Array has dynamic size", "Array elements are linked"]
    },
    {
      question: "What are the advantages of using a linked list over an array?",
      answer:
        "Linked lists provide dynamic memory allocation, meaning they can grow or shrink in size without reallocating memory. They also allow efficient insertions and deletions at any position, compared to arrays which may require shifting elements.",
      distractors: ["Array elements don't shift", "Array is always faster", "Linked list has fixed size"]
    },
    {
      question: "Define a binary tree and explain its properties.",
      answer:
        "A binary tree is a hierarchical data structure in which each node has at most two children, referred to as the left child and the right child. Properties include: a tree with 'n' nodes has exactly 'n-1' edges, and the height of the tree affects its performance.",
      distractors: ["Each node has three children", "It always has n edges", "Height does not affect performance"]
    },
    {
      question: "What is a doubly linked list, and how does it differ from a singly linked list?",
      answer:
        "A doubly linked list is a type of linked list where each node contains a reference to both the next and the previous node, allowing traversal in both directions. In contrast, a singly linked list allows traversal in only one direction.",
      distractors: [
        "Doubly linked list is faster",
        "Singly linked list can traverse both ways",
        "Doubly linked list has one reference"
      ]
    },
    {
      question: "Explain Big O notation and its importance in analyzing algorithms.",
      answer:
        "Big O notation describes the upper bound of the time complexity of an algorithm, focusing on the worst-case scenario as the input size grows. It's essential for comparing the efficiency of algorithms by quantifying their growth rates.",
      distractors: [
        "Big O describes the best case",
        "Big O is for small input sizes",
        "Big O is not related to time complexity"
      ]
    },
    {
      question: "What is a circular queue, and how is it implemented?",
      answer:
        "A circular queue is a linear data structure that follows the FIFO principle but connects the last position back to the first position, forming a circle. It is implemented using an array and two pointers, 'front' and 'rear', to track the queue's elements.",
      distractors: ["Circular queue is LIFO", "It does not form a circle", "No pointers are used"]
    },
    {
      question: "What are the basic operations supported by a stack?",
      answer:
        "A stack supports the following basic operations: push (add an element to the top), pop (remove the top element), peek (view the top element without removing it), and isEmpty (check if the stack is empty).",
      distractors: ["Peek removes the element", "Push adds to the bottom", "Stack has no isEmpty operation"]
    },
    {
      question: "Describe the process of inserting a new node in a binary search tree (BST).",
      answer:
        "To insert a new node in a BST, start at the root and compare the new node's value with the current node. If it's smaller, move to the left child; if larger, move to the right child. Continue this until an appropriate null position is found, where the new node is inserted.",
      distractors: [
        "Always insert at the root",
        "Insert directly into the left child",
        "Insert at the first available position"
      ]
    }
  ],
  2: [
    {
      question: "What are the different types of trees in data structures?",
      answer:
        "There are several types of trees in data structures, including Binary Trees, Binary Search Trees, AVL Trees, B-Trees, Red-Black Trees, and more. Each has specific properties and applications, such as ensuring balanced heights or providing efficient search operations.",
      distractors: ["Hash Trees", "Array Trees", "Queue Trees"]
    },
    {
      question: "How does Depth First Search (DFS) differ from Breadth First Search (BFS)?",
      answer:
        "Depth First Search (DFS) explores as far down a branch as possible before backtracking, using a stack or recursion. Breadth First Search (BFS) explores all neighbors at the present depth before moving on to nodes at the next depth level, using a queue.",
      distractors: ["DFS uses a queue", "BFS uses recursion", "DFS and BFS are identical"]
    }
  ],
  3: [
    {
      question: "What is the difference between Merge Sort and Quick Sort?",
      answer:
        "Merge Sort is a stable, comparison-based sorting algorithm with a time complexity of O(n log n). It divides the array into halves and merges them after sorting. Quick Sort, also O(n log n) on average, is an in-place sort that uses a pivot element to partition the array.",
      distractors: ["Merge Sort is in-place", "Quick Sort is stable", "Quick Sort is O(n^2)"]
    },
    {
      question: "What is the best case time complexity for Insertion Sort?",
      answer:
        "The best case time complexity for Insertion Sort is O(n), which occurs when the input array is already sorted.",
      distractors: ["O(1)", "O(n log n)", "O(n^2)"]
    }
  ],
  4: [
    {
      question: "What is a hash function?",
      answer:
        "A hash function takes an input (or 'key') and returns a fixed-size string of bytes. The output is typically a 'hash code' that uniquely identifies the input data, used in hash tables to efficiently locate data.",
      distractors: [
        "Hash function creates arrays",
        "Hash function always returns the same value",
        "Hash function only works for numbers"
      ]
    },
    {
      question: "Explain collision in hashing and how it is handled.",
      answer:
        "A collision occurs in hashing when two different inputs produce the same hash code. Collisions are handled using techniques like chaining (storing multiple elements in the same bucket) or open addressing (finding another empty slot using a probing sequence).",
      distractors: [
        "Collisions cannot occur",
        "Collisions are ignored",
        "Collisions are resolved by rehashing everything"
      ]
    }
  ],
  5: [
    {
      question: "What is the base case in recursion?",
      answer:
        "The base case in recursion is the condition under which the recursive function stops calling itself, preventing an infinite loop. It is a simple case that can be solved directly without further recursion.",
      distractors: [
        "The case that causes infinite recursion",
        "The first call to the recursive function",
        "The most complex case in recursion"
      ]
    },
    {
      question: "What is tail recursion?",
      answer:
        "Tail recursion is a type of recursion where the recursive call is the last operation in the function. Tail-recursive functions can be optimized by the compiler to iterative loops, making them more efficient in terms of space.",
      distractors: [
        "Recursion with a tail",
        "Recursion that doesn't stop",
        "Recursion that happens in the middle of a function"
      ]
    }
  ],
  6: [
    {
      question: "What is dynamic programming and how does it differ from divide and conquer?",
      answer:
        "Dynamic programming is a method for solving complex problems by breaking them down into simpler subproblems and storing the results of subproblems to avoid redundant calculations. Unlike divide and conquer, dynamic programming solves overlapping subproblems.",
      distractors: [
        "Dynamic programming only solves unique subproblems",
        "Divide and conquer stores subproblem results",
        "Dynamic programming is always faster"
      ]
    },
    {
      question: "Give an example of a problem solved by dynamic programming.",
      answer:
        "The Knapsack problem, where the goal is to maximize the value of items in a knapsack without exceeding the weight limit, is a classic example of a problem that can be efficiently solved using dynamic programming.",
      distractors: ["Binary Search", "Sorting Algorithms", "Graph Traversal"]
    }
  ],
  7: [
    {
      question: "What is the purpose of Dijkstra's algorithm?",
      answer:
        "Dijkstra's algorithm is used to find the shortest path from a source node to all other nodes in a graph with non-negative edge weights. It uses a priority queue to explore the nearest unvisited nodes.",
      distractors: ["To find the longest path", "To find all possible paths", "To create a minimum spanning tree"]
    },
    {
      question: "Explain the concept of a Minimum Spanning Tree (MST).",
      answer:
        "A Minimum Spanning Tree (MST) is a subset of the edges in a weighted graph that connects all vertices without any cycles and with the minimum possible total edge weight. Algorithms like Kruskal's and Prim's are used to find the MST.",
      distractors: [
        "MST connects vertices with maximum edge weight",
        "MST always includes all edges",
        "MST is not cycle-free"
      ]
    }
  ]
};

export default quizzes;
