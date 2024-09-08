const quizzes = {
  1: [
    {
      context:
        "An operating system acts as an intermediary between the user and the computer hardware, handling tasks such as memory management, process scheduling, and input/output operations.",
      question: "What is one of the primary roles of an operating system in a computer system?",
      answer: "Memory management",
      distractors: ["Graphics processing", "Database management", "Network security"]
    },
    {
      context:
        "Application programs are software that utilize system resources, such as memory, processing power, and storage, to perform specific tasks.",
      question: "How do application programs interact with the operating system?",
      answer: "By utilizing system resources",
      distractors: [
        "By manipulating the hardware directly",
        "By bypassing the operating system",
        "By using network protocols exclusively"
      ]
    },
    {
      context: "Users can be classified based on their roles, such as end-users, power users, or administrators.",
      question: "Which classification of users typically has more privileges in a computing system?",
      answer: "Administrators",
      distractors: ["End-users", "Power users", "Casual users"]
    },
    {
      context:
        "The CPU executes instructions and processes data, while memory, including RAM and ROM, stores data and programs for the CPU to access.",
      question: "What is the primary function of the CPU in a computer system?",
      answer: "Executing instructions",
      distractors: ["Storing data", "User interface management", "Connecting to the internet"]
    },
    {
      context:
        "System resources include CPU time, memory, and I/O devices, which the operating system manages and allocates among running applications.",
      question: "Which of the following is NOT considered a system resource managed by the operating system?",
      answer: "User preferences",
      distractors: ["CPU time", "Memory", "I/O devices"]
    },
    {
      context:
        "The operating system controls and coordinates the use of hardware among various applications and users.",
      question: "What is essential for running multiple applications concurrently without interference?",
      answer: "Resource allocation by the operating system",
      distractors: ["User intervention", "Hardware upgrades", "Dedicated servers"]
    },
    {
      context:
        "Users interact with computer systems and software applications to perform tasks, exchange information, and solve problems.",
      question: "What forms the basis for modern computing, enabling collaboration across diverse platforms?",
      answer: "An interconnected network of users, devices, and systems",
      distractors: ["Single-user systems", "Isolated applications", "Standalone devices"]
    },
    {
      context: "The operating system is responsible for controlling and executing user and application programs.",
      question: "Whose responsibility is it to provide an interface between software and hardware?",
      answer: "The operating system",
      distractors: ["The application programs", "The user", "The CPU"]
    },
    {
      context:
        "Hardware encompasses the physical components of a computer system, such as the processor, memory, storage devices, and input/output peripherals.",
      question: "Which of the following does NOT belong to the hardware components of a computer system?",
      answer: "Operating system",
      distractors: ["CPU", "Memory", "Storage devices"]
    },
    {
      context: "The operating system manages and allocates hardware resources among running applications and users.",
      question: "Why is efficient resource management by the operating system crucial?",
      answer: "To prevent conflicts and ensure optimal performance",
      distractors: ["To enhance graphics rendering", "To improve user interface design", "To increase internet speed"]
    },
    {
      context: "The CPU executes instructions, processes data, and interacts with memory and I/O devices.",
      question: "Which component of a computer system processes user commands and carries out tasks?",
      answer: "CPU",
      distractors: ["RAM", "Hard drive", "Network adapter"]
    },
    {
      context: "Input/output devices, such as keyboards, mice, and monitors, allow users to interact with the system.",
      question: "What role do I/O devices play in a computer system?",
      answer: "Enabling user interaction with the system",
      distractors: ["Executing computer programs", "Managing system memory", "Storing user data"]
    },
    {
      context:
        "Understanding user needs, behaviors, and preferences is crucial for designing effective computing systems.",
      question: "Why is it important to understand user needs in IT?",
      answer: "To design effective computing systems",
      distractors: ["To enhance system security", "To reduce hardware costs", "To limit application features"]
    },
    {
      context:
        "An operating system provides common services for programs and manages computer hardware and software resources.",
      question: "What is a key service provided by an operating system to application programs?",
      answer: "Managing hardware resources",
      distractors: [
        "Optimizing graphics performance",
        "Maintaining internet security",
        "Controlling user access directly"
      ]
    },
    {
      context: "The operating system allocates system resources, such as CPU time and memory, to programs as needed.",
      question: "What aspect of the operating system is critical for maintaining performance during multitasking?",
      answer: "Resource allocation",
      distractors: ["Data encryption", "Hardware configuration", "User interface design"]
    },
    {
      context:
        "Application programs define the ways in which the system resources are used to solve the computing problems of the users.",
      question: "What do application programs utilize to perform specific tasks?",
      answer: "System resources",
      distractors: ["User preferences", "Application protocols", "Hardware upgrades"]
    },
    {
      context: "In computer science and IT, individuals interact with machines and other computers to perform tasks.",
      question: "What is the primary outcome of user interaction with computer systems?",
      answer: "Performing tasks and exchanging information",
      distractors: ["Increasing software security", "Improving hardware performance", "Reducing user errors"]
    },
    {
      context: "The CPU, memory, and I/O devices are essential computer components.",
      question: "Which component directly executes instructions in a computer system?",
      answer: "CPU",
      distractors: ["RAM", "I/O devices", "Motherboard"]
    },
    {
      context:
        "Computer systems can be divided into four main components, which include hardware and operating systems.",
      question: "What are the four main components of a computer system?",
      answer: "Hardware, OS, application programs, and users",
      distractors: [
        "Hardware, firmware, software, and users",
        "CPU, RAM, storage, and users",
        "Networking, storage, processors, and applications"
      ]
    },
    {
      context: "The operating system serves as a bridge between user applications and the computer's hardware.",
      question: "Which task is NOT performed by the operating system?",
      answer: "Creating hardware specifications",
      distractors: ["Managing application requests", "Allocating system resources", "Facilitating user interactions"]
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
