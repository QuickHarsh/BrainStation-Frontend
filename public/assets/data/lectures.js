const lectures = [
  {
    id: 1,
    title: "IT2060 - Operating Systems and System Administration",
    slides: [
      {
        id: 1,
        title: "Slide 1: IT2060 - Operating Systems and System Administration",
        content: `
          <p><strong>Subtitles:</strong></p>
          <ul>
            <li>Lecture 01</li>
            <li>Introduction to Operating System</li>
          </ul>
        `
      },
      {
        id: 2,
        title: "Slide 2: Introduction",
        content: `
          <p><strong>Subtitles:</strong></p>
          <ul>
            <li>Learn the major components of the operating systems</li>
            <li>Practice with utilities of Unix system administration.</li>
            <li>Students will also apply the knowledge they learn in the lectures, tutorial and labs to complete the unit's programming assignment</li>
          </ul>
        `
      },
      {
        id: 3,
        title: "Slide 3: Method of Delivery",
        content: `
          <p><strong>Subtitles:</strong></p>
          <ul>
            <li>2 Hours Lecture</li>
            <li>1 Hour Tutorial</li>
            <li>2 Hours Practical</li>
            <li>Attendance will be marked.</li>
          </ul>
        `
      },
      {
        id: 4,
        title: "Slide 4: Assessment Criteria",
        content: `
          <p><strong>Subtitles:</strong></p>
          <ul>
            <li>Mid Term Test (Online) 20% Lessons 1 to 5</li>
            <li>Assignment (Online) 20% Based on Practical Sessions (C Language)</li>
            <li>Final Examination (Written) 60% Lessons 6 to 12</li>
          </ul>
        `
      },
      {
        id: 5,
        title: "Slide 5: References",
        content: `
          <p><strong>Subtitles:</strong></p>
          <ul>
            <li>A. Silberschatz, P.B. Galvin, G. Gagne, Operating System Concepts, 10th Edition, John Wiley & Sons, 2018</li>
          </ul>
          <p><strong>Visual Aids:</strong></p>
          <ul>
            <li>Image 5: /content/images/image5.jpg</li>
            <li>Image 6: /content/images/image6.jpg</li>
          </ul>
        `
      },
      {
        id: 6,
        title: "Slide 6: Linux Programming",
        content: `
          <p><strong>Subtitles:</strong></p>
          <ul>
            <li>Beginning Linux Programming</li>
            <li>4th Edition</li>
            <li>by Neil Matthew Richard Stones</li>
            <li>PThreads Primer</li>
            <li>A Guide to Multithreaded Programming</li>
            <li>Bil Lewis Daniel J. Berg</li>
          </ul>
          <p><strong>Visual Aids:</strong></p>
          <ul>
            <li>Image 6: /content/images/image6.jpg</li>
          </ul>
        `
      },
      {
        id: 7,
        title: "Slide 7: Computer System Structure",
        content: `
          <p><strong>Subtitles:</strong></p>
          <ul>
            <li>Computer system can be divided into four components:</li>
          </ul>
          <p><strong>Key Concepts:</strong></p>
          <ul>
            <li>Hardware – provides basic computing resources</li>
            <li style="margin-left:20px;">Hardware encompasses the physical components of a computer system, such as the processor, memory, storage devices, and input/output peripherals. These components work together to execute instructions, store and retrieve data, and interact with users</li>
            <li>CPU, memory, I/O devices</li>
            <li style="margin-left:20px;">An operating system is software that manages computer hardware, software resources, and provides common services for programs. It acts as an intermediary between the user and the computer hardware, handling tasks such as memory management, process sc</li>
            <li>Operating system</li>
            <li style="margin-left:20px;">Application programs are software that utilize system resources, such as memory, processing power, and storage, to perform specific tasks and solve users' computing problems. They interact with the operating system, which manages these resources, to </li>
            <li>Controls and coordinates use of hardware among various applications and users</li>
            <li style="margin-left:20px;">The CPU, memory, and I/O devices are essential computer components. The CPU executes instructions and processes data. Memory, including RAM and ROM, stores data and programs for the CPU to access. I/O devices, such as keyboards, mice, and monitors, a</li>
            <li>Application programs – define the ways in which the system resources are used to solve the computing problems of the users</li>
            <li style="margin-left:20px;">The operating system manages and allocates hardware resources, such as CPU time, memory, and I/O devices, among running applications and users. It acts as an intermediary, ensuring efficient utilization and preventing conflicts. This allows multiple </li>
            <li>Word processors, compilers, web browsers, database systems, video games</li>
            <li style="margin-left:20px;">Users are the individuals who interact with computer systems and software applications. They can be classified based on their roles, such as end-users, power users, or administrators. Understanding user needs, behaviors, and preferences is crucial fo</li>
            <li>Users</li>
            <li style="margin-left:20px;">In computer science and IT, people interact with machines and other computers to perform tasks, exchange information, and solve problems. This interconnected network of users, devices, and systems forms the basis for modern computing, enabling collab</li>
            <li>People, machines, other computers</li>
            <li style="margin-left:20px;">The operating system is responsible for controlling and executing user and application programs. It allocates system resources, such as CPU time and memory, to programs as needed. The OS also provides an interface between software and hardware, enabl</li>
          </ul>
        `
      }
    ]
  },
  {
    id: 2,
    title: "Advanced Data Structures",
    slides: [
      {
        id: 1,
        title: "Understanding Trees",
        content: `
            <p>Trees are a type of data structure that simulates a hierarchical tree structure, with a root value and subtrees of children with a parent node, represented as a set of linked nodes.</p>
            <ul>
                <li><strong>Types of Trees:</strong> Binary Trees, AVL Trees, B-Trees, Red-Black Trees.</li>
                <li><strong>Operations:</strong> Insertion, Deletion, Traversal (Preorder, Inorder, Postorder).</li>
            </ul>
          `
      },
      {
        id: 2,
        title: "Graph Theory Basics",
        content: `
            <p>Graphs are a versatile data structure that can represent various systems in the real world such as networks, paths in a city, etc.</p>
            <ul>
                <li><strong>Components:</strong> Vertices (nodes), Edges (links).</li>
                <li><strong>Types of Graphs:</strong> Directed, Undirected, Weighted, Unweighted.</li>
                <li><strong>Graph Traversal:</strong> Depth First Search (DFS), Breadth First Search (BFS).</li>
            </ul>
          `
      }
    ]
  },
  {
    id: 3,
    title: "Sorting Algorithms",
    slides: [
      {
        id: 1,
        title: "Introduction to Sorting Algorithms",
        content: `
          <p>Sorting algorithms are essential for organizing data in a specific order, typically ascending or descending.</p>
          <ul>
            <li><strong>Types of Sorting:</strong> Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort.</li>
            <li><strong>Use Cases:</strong> Data retrieval, optimization, and searching algorithms.</li>
          </ul>
        `
      }
    ]
  },
  {
    id: 4,
    title: "Hashing",
    slides: [
      {
        id: 1,
        title: "Understanding Hashing",
        content: `
          <p>Hashing is a technique used to uniquely identify a specific object from a group of similar objects.</p>
          <ul>
            <li><strong>Hash Functions:</strong> Converts an input (or 'key') into a fixed-size string of bytes.</li>
            <li><strong>Applications:</strong> Data storage, password verification, and indexing.</li>
          </ul>
        `
      }
    ]
  },
  {
    id: 5,
    title: "Recursion",
    slides: [
      {
        id: 1,
        title: "Introduction to Recursion",
        content: `
          <p>Recursion is a method of solving a problem where the solution depends on solutions to smaller instances of the same problem.</p>
          <ul>
            <li><strong>Key Concepts:</strong> Base case, recursive case, stack overflow.</li>
            <li><strong>Examples:</strong> Factorial, Fibonacci sequence, Tower of Hanoi.</li>
          </ul>
        `
      }
    ]
  },
  {
    id: 6,
    title: "Dynamic Programming",
    slides: [
      {
        id: 1,
        title: "Fundamentals of Dynamic Programming",
        content: `
          <p>Dynamic programming is an optimization technique used to solve complex problems by breaking them down into simpler subproblems.</p>
          <ul>
            <li><strong>Principles:</strong> Overlapping subproblems, optimal substructure.</li>
            <li><strong>Applications:</strong> Knapsack problem, Fibonacci sequence, matrix chain multiplication.</li>
          </ul>
        `
      }
    ]
  },
  {
    id: 7,
    title: "Graph Algorithms",
    slides: [
      {
        id: 1,
        title: "Introduction to Graph Algorithms",
        content: `
          <p>Graph algorithms are a set of instructions that traverse (visit nodes) or modify graphs (add/remove edges or vertices).</p>
          <ul>
            <li><strong>Types:</strong> Depth-First Search (DFS), Breadth-First Search (BFS), Dijkstra's Algorithm, Kruskal's Algorithm.</li>
            <li><strong>Applications:</strong> Network routing, social networks, mapping applications.</li>
          </ul>
        `
      }
    ]
  }
];

export default lectures;
