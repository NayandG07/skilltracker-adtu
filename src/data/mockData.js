/**
 * SkillTracker Official Data Store
 * Verified Academic Records for Assam Down Town University (ADTU)
 */

export const INITIAL_STUDENT_RECORD = {
  id: "ADTU/0/2024-28/BCSM/047",
  name: "Nayandeep Goswami",
  email: "nayandg8@gmail.com",
  maskedEmail: "n***8@gmail.com",
  phone: "+91 98765 43210",
  program: "B.Tech in Computer Science & Engineering",
  specialization: "Artificial Intelligence & Systems",
  semester: 5,
  section: "Section A",
  batch: "2024 - 2028",
  institution: "Faculty of Engineering & Technology, Assam Down Town University",
  cgpa: 8.95,
  attendanceRate: 92.4,
  cohortRank: 2,
  totalCohortSize: 59,
  totalProblemsSolved: 142,
  totalLabsCompleted: 18,
  totalLabsAssigned: 20,
  streakDays: 7,
  lastActiveDate: "2026-09-07",
  advisor: "Dr. R. K. Sarma, Assoc. Professor CSE",
  sgpaHistory: [
    { semester: 1, sgpa: 8.80, credits: 22, status: "Completed", grade: "A+" },
    { semester: 2, sgpa: 9.10, credits: 24, status: "Completed", grade: "O" },
    { semester: 3, sgpa: 8.90, credits: 25, status: "Completed", grade: "A+" },
    { semester: 4, sgpa: 9.05, credits: 26, status: "Completed", grade: "O" },
    { semester: 5, sgpa: 8.95, credits: 24, status: "In Progress", grade: "A+" }
  ],
  skillsRadar: [
    { subject: "Data Structures & Algorithms", score: 94 },
    { subject: "Operating Systems", score: 91 },
    { subject: "Database Management", score: 88 },
    { subject: "Computer Networks", score: 86 },
    { subject: "System Design", score: 82 }
  ]
};

// Top Cohort Records for v1 MVP (with Rank #2 Nayandeep Goswami)
export const COHORT_LEADERBOARD = [
  { rank: 1, name: "Aarav Sharma", enrollment: "ADTU/0/2024-28/BCSM/012", email: "a***a@gmail.com", score: 2890, dsaSolved: 148, labsDone: 19, avatarColor: "#d97757", isCurrentUser: false },
  { rank: 2, name: "Nayandeep Goswami", enrollment: "ADTU/0/2024-28/BCSM/047", email: "n***8@gmail.com", score: 2840, dsaSolved: 142, labsDone: 18, avatarColor: "#d97757", isCurrentUser: true },
  { rank: 3, name: "Priyanka Das", enrollment: "ADTU/0/2024-28/BCSM/031", email: "p***s@gmail.com", score: 2795, dsaSolved: 139, labsDone: 18, avatarColor: "#5a8c69", isCurrentUser: false },
  { rank: 4, name: "Debojit Kalita", enrollment: "ADTU/0/2024-28/BCSM/019", email: "d***a@gmail.com", score: 2710, dsaSolved: 135, labsDone: 17, avatarColor: "#c4ad8f", isCurrentUser: false },
  { rank: 5, name: "Ananya Baruah", enrollment: "ADTU/0/2024-28/BCSM/008", email: "a***h@gmail.com", score: 2680, dsaSolved: 131, labsDone: 17, avatarColor: "#d4973b", isCurrentUser: false },
  { rank: 6, name: "Rituraj Hazarika", enrollment: "ADTU/0/2024-28/BCSM/052", email: "r***a@gmail.com", score: 2640, dsaSolved: 128, labsDone: 17, avatarColor: "#cc5a5a", isCurrentUser: false },
  { rank: 7, name: "Sneha Sen", enrollment: "ADTU/0/2024-28/BCSM/058", email: "s***n@gmail.com", score: 2615, dsaSolved: 126, labsDone: 16, avatarColor: "#5a8c69", isCurrentUser: false },
  { rank: 8, name: "Kaushik Nath", enrollment: "ADTU/0/2024-28/BCSM/027", email: "k***h@gmail.com", score: 2580, dsaSolved: 124, labsDone: 16, avatarColor: "#d97757", isCurrentUser: false },
  { rank: 9, name: "Bhaswati Roy", enrollment: "ADTU/0/2024-28/BCSM/014", email: "b***y@gmail.com", score: 2550, dsaSolved: 120, labsDone: 16, avatarColor: "#c4ad8f", isCurrentUser: false },
  { rank: 10, name: "Manash Pratim", enrollment: "ADTU/0/2024-28/BCSM/038", email: "m***m@gmail.com", score: 2520, dsaSolved: 119, labsDone: 16, avatarColor: "#d4973b", isCurrentUser: false },
  { rank: 11, name: "Tanmoy Deka", enrollment: "ADTU/0/2024-28/BCSM/055", email: "t***a@gmail.com", score: 2490, dsaSolved: 116, labsDone: 15, avatarColor: "#5a8c69", isCurrentUser: false },
  { rank: 12, name: "Juri Borgohain", enrollment: "ADTU/0/2024-28/BCSM/025", email: "j***n@gmail.com", score: 2450, dsaSolved: 114, labsDone: 15, avatarColor: "#d97757", isCurrentUser: false },
  { rank: 13, name: "Pranjal Saikia", enrollment: "ADTU/0/2024-28/BCSM/044", email: "p***a@gmail.com", score: 2420, dsaSolved: 112, labsDone: 15, avatarColor: "#c4ad8f", isCurrentUser: false },
  { rank: 14, name: "Meghna Chetia", enrollment: "ADTU/0/2024-28/BCSM/039", email: "m***a@gmail.com", score: 2390, dsaSolved: 110, labsDone: 15, avatarColor: "#d4973b", isCurrentUser: false },
  { rank: 15, name: "Deepjyoti Paul", enrollment: "ADTU/0/2024-28/BCSM/021", email: "d***l@gmail.com", score: 2350, dsaSolved: 107, labsDone: 14, avatarColor: "#5a8c69", isCurrentUser: false }
];

// Curated DSA 300 with Verified Canonical LeetCode Slugs (No regex 404s!)
export const INITIAL_DSA_PROBLEMS = [
  {
    id: 1,
    title: "Two Sum",
    slug: "two-sum",
    leetcodeUrl: "https://leetcode.com/problems/two-sum/",
    difficulty: "Easy",
    category: "Arrays",
    acceptance: "52.4%",
    solved: true,
    solvedAt: "2026-08-15"
  },
  {
    id: 2,
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    difficulty: "Medium",
    category: "Sliding Window",
    acceptance: "34.8%",
    solved: true,
    solvedAt: "2026-08-18"
  },
  {
    id: 3,
    title: "Median of Two Sorted Arrays",
    slug: "median-of-two-sorted-arrays",
    leetcodeUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    difficulty: "Hard",
    category: "Binary Search",
    acceptance: "39.1%",
    solved: false
  },
  {
    id: 4,
    title: "Container With Most Water",
    slug: "container-with-most-water",
    leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/",
    difficulty: "Medium",
    category: "Two Pointers",
    acceptance: "54.6%",
    solved: true,
    solvedAt: "2026-08-20"
  },
  {
    id: 5,
    title: "3Sum",
    slug: "3sum",
    leetcodeUrl: "https://leetcode.com/problems/3sum/",
    difficulty: "Medium",
    category: "Two Pointers",
    acceptance: "33.9%",
    solved: true,
    solvedAt: "2026-08-22"
  },
  {
    id: 6,
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/",
    difficulty: "Easy",
    category: "Stack",
    acceptance: "40.3%",
    solved: true,
    solvedAt: "2026-08-12"
  },
  {
    id: 7,
    title: "Merge Two Sorted Lists",
    slug: "merge-two-sorted-lists",
    leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/",
    difficulty: "Easy",
    category: "Linked List",
    acceptance: "63.2%",
    solved: true,
    solvedAt: "2026-08-14"
  },
  {
    id: 8,
    title: "Trapping Rain Water",
    slug: "trapping-rain-water",
    leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/",
    difficulty: "Hard",
    category: "Two Pointers",
    acceptance: "60.5%",
    solved: false
  },
  {
    id: 9,
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/",
    difficulty: "Medium",
    category: "Dynamic Programming",
    acceptance: "50.4%",
    solved: true,
    solvedAt: "2026-08-25"
  },
  {
    id: 10,
    title: "Climbing Stairs",
    slug: "climbing-stairs",
    leetcodeUrl: "https://leetcode.com/problems/climbing-stairs/",
    difficulty: "Easy",
    category: "Dynamic Programming",
    acceptance: "52.8%",
    solved: true,
    solvedAt: "2026-08-16"
  },
  {
    id: 11,
    title: "Coin Change",
    slug: "coin-change",
    leetcodeUrl: "https://leetcode.com/problems/coin-change/",
    difficulty: "Medium",
    category: "Dynamic Programming",
    acceptance: "43.1%",
    solved: true,
    solvedAt: "2026-08-29"
  },
  {
    id: 12,
    title: "Number of Islands",
    slug: "number-of-islands",
    leetcodeUrl: "https://leetcode.com/problems/number-of-islands/",
    difficulty: "Medium",
    category: "Graphs",
    acceptance: "58.2%",
    solved: true,
    solvedAt: "2026-08-30"
  },
  {
    id: 13,
    title: "Course Schedule",
    slug: "course-schedule",
    leetcodeUrl: "https://leetcode.com/problems/course-schedule/",
    difficulty: "Medium",
    category: "Graphs",
    acceptance: "46.9%",
    solved: false
  },
  {
    id: 14,
    title: "LRU Cache",
    slug: "lru-cache",
    leetcodeUrl: "https://leetcode.com/problems/lru-cache/",
    difficulty: "Medium",
    category: "Linked List",
    acceptance: "42.0%",
    solved: true,
    solvedAt: "2026-09-02"
  },
  {
    id: 15,
    title: "Binary Tree Level Order Traversal",
    slug: "binary-tree-level-order-traversal",
    leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    difficulty: "Medium",
    category: "Trees",
    acceptance: "65.7%",
    solved: true,
    solvedAt: "2026-09-04"
  },
  {
    id: 16,
    title: "Lowest Common Ancestor of a Binary Search Tree",
    slug: "lowest-common-ancestor-of-a-binary-search-tree",
    leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
    difficulty: "Medium",
    category: "Trees",
    acceptance: "63.8%",
    solved: true,
    solvedAt: "2026-09-05"
  },
  {
    id: 17,
    title: "Word Break",
    slug: "word-break",
    leetcodeUrl: "https://leetcode.com/problems/word-break/",
    difficulty: "Medium",
    category: "Dynamic Programming",
    acceptance: "46.2%",
    solved: false
  },
  {
    id: 18,
    title: "Alien Dictionary",
    slug: "alien-dictionary",
    leetcodeUrl: "https://leetcode.com/problems/alien-dictionary/",
    difficulty: "Hard",
    category: "Graphs",
    acceptance: "35.6%",
    solved: false
  }
];

// Lab Assignments
export const INITIAL_LABS = [
  {
    id: "lab-os-05",
    title: "Lab 05: Virtual Memory & Page Replacement Algorithms",
    courseCode: "CS502",
    courseName: "Operating Systems Lab",
    deadline: new Date(Date.now() + 4 * 3600 * 1000 + 12 * 60 * 1000).toISOString(), // Closes in 4h 12m
    durationMinutes: 90,
    totalMarks: 100,
    status: "active",
    topics: ["FIFO", "LRU", "Optimal Page Replacement", "Demand Paging"],
    description: "Implement and benchmark page replacement algorithms in C/C++. Simulate page reference strings under variable frame allocation limits and calculate page fault ratios.",
    starterCode: `#include <stdio.h>
#include <stdlib.h>

#define MAX_FRAMES 10
#define REF_LEN 20

int calculate_lru_faults(int ref_str[], int n, int frames) {
    // TODO: Implement LRU page replacement algorithm
    return 0;
}

int main() {
    int ref[REF_LEN] = {7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1};
    int faults = calculate_lru_faults(ref, REF_LEN, 3);
    printf("Total Page Faults: %d\\n", faults);
    return 0;
}`
  },
  {
    id: "lab-cn-06",
    title: "Lab 06: TCP Concurrent Multi-Client Socket Architecture",
    courseCode: "CS503",
    courseName: "Computer Networks Lab",
    deadline: new Date(Date.now() + 48 * 3600 * 1000).toISOString(), // In 2 days
    durationMinutes: 120,
    totalMarks: 100,
    status: "active",
    topics: ["POSIX Sockets", "Select/Poll I/O", "TCP Handshake", "Multi-threading"],
    description: "Architect a non-blocking TCP chat server capable of servicing at least 5 concurrent client sessions without deadlocking or thread starvation.",
    starterCode: `// TCP Multi-Client Echo Server in C
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <stdio.h>

int main() {
    // TODO: Initialize socket, bind to port 8080, and listen
    return 0;
}`
  },
  {
    id: "lab-os-04",
    title: "Lab 04: Process Scheduling: Priority vs Round Robin",
    courseCode: "CS502",
    courseName: "Operating Systems Lab",
    deadline: "2026-08-28T18:00:00.000Z",
    durationMinutes: 90,
    totalMarks: 100,
    status: "graded",
    score: 98,
    gradedBy: "Prof. N. K. Choudhury",
    remarks: "Exceptional edge-case handling on zero-burst processes and gantt chart visualization.",
    topics: ["Preemptive Scheduling", "Gantt Chart", "Turnaround Time", "Waiting Time"]
  },
  {
    id: "lab-db-03",
    title: "Lab 03: Relational Query Optimization & B-Tree Indexing",
    courseCode: "CS501",
    courseName: "Database Engineering Lab",
    deadline: "2026-08-20T18:00:00.000Z",
    durationMinutes: 60,
    totalMarks: 100,
    status: "graded",
    score: 95,
    gradedBy: "Dr. P. Sharma",
    remarks: "Clean EXPLAIN ANALYZE traces demonstrating 14x query latency reduction.",
    topics: ["EXPLAIN ANALYZE", "B-Tree Indexing", "Hash Joins", "Execution Plans"]
  }
];

// Diagnostic Result Report (Fixes the red X on correct answer bug!)
export const DIAGNOSTIC_RESULT_RECORD = {
  id: "diag-result-502",
  assessmentTitle: "Operating Systems & Advanced Data Structures Diagnostic Evaluation",
  studentId: "ADTU/0/2024-28/BCSM/047",
  studentName: "Nayandeep Goswami",
  completionDate: "2026-09-04T11:45:00.000Z",
  timeSpentMinutes: 44,
  scoreObtained: 95,
  maxScore: 100,
  percentage: 95,
  status: "Distinction Passed",
  summary: "Comprehensive mastery exhibited in Memory Management, Process Synchronization, and Hash Table amortization.",
  questions: [
    {
      id: "q1",
      questionText: "In Belady's Anomaly, increasing the number of page frames results in:",
      options: [
        { id: "A", text: "A decrease in page fault rate", isCorrect: false },
        { id: "B", text: "An unexpected increase in the number of page faults", isCorrect: true },
        { id: "C", text: "Instant starvation of the operating system kernel", isCorrect: false },
        { id: "D", text: "Linear acceleration of context switching", isCorrect: false }
      ],
      selectedOption: "B",
      isUserCorrect: true, // Marked with emerald CheckCircle2 (NOT red ✗!)
      explanation: "Belady's Anomaly occurs primarily with the FIFO page replacement algorithm, where allocating more physical frames can paradoxically produce more page faults."
    },
    {
      id: "q2",
      questionText: "Which of the following data structures provides guaranteed O(1) worst-case lookup?",
      options: [
        { id: "A", text: "Red-Black Balanced Search Tree", isCorrect: false },
        { id: "B", text: "Standard Chained Hash Table", isCorrect: false },
        { id: "C", text: "Perfect Hashing (FKS 2-Level Scheme)", isCorrect: true },
        { id: "D", text: "Skip List", isCorrect: false }
      ],
      selectedOption: "C",
      isUserCorrect: true,
      explanation: "Fredman, Komlós, and Szemerédi (FKS) 2-level perfect hashing guarantees worst-case O(1) memory lookup for static key sets without collision chaining."
    },
    {
      id: "q3",
      questionText: "What mechanism is utilized in Linux to prevent priority inversion in real-time tasks?",
      options: [
        { id: "A", text: "Priority Ceiling Protocol / Priority Inheritance", isCorrect: true },
        { id: "B", text: "Banker's Deadlock Algorithm", isCorrect: false },
        { id: "C", text: "First-In-First-Out Scheduling", isCorrect: false },
        { id: "D", text: "Aging without preemption", isCorrect: false }
      ],
      selectedOption: "A",
      isUserCorrect: true,
      explanation: "Priority Inheritance temporarily raises the priority of a lower-priority task holding a shared lock to the priority of the highest-priority waiting task."
    }
  ]
};

// Initial Notifications
export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Approaching Deadline: Lab 05",
    body: "Operating Systems Lab 05 closes in 4 hours 12 minutes. Complete your page replacement submission.",
    type: "lab_deadline",
    timestamp: "10 minutes ago",
    read: false,
    priority: "high",
    actionUrl: "/student/detail/lab-os-05"
  },
  {
    id: "notif-2",
    title: "Daily Practice Streak: 7 Days!",
    body: "You are 1 problem away from maintaining your 7-day commit streak. Solve today's sliding window problem.",
    type: "streak_alert",
    timestamp: "1 hour ago",
    read: false,
    priority: "normal",
    actionUrl: "/student/dsa-track"
  },
  {
    id: "notif-3",
    title: "Faculty Announcement",
    body: "Prof. N. K. Choudhury graded your Lab 04: Process Scheduling submission (Score: 98/100).",
    type: "system",
    timestamp: "Yesterday",
    read: true,
    priority: "normal",
    actionUrl: "/student/result/diag-result-502"
  }
];

// Interactive Quiz Questions Map for Lab Assessments
export const QUIZ_QUESTIONS_MAP = {
  "lab-os-05": [
    {
      id: 1,
      topic: "Page Replacement",
      questionText: "In Belady's Anomaly, increasing the number of page frames results in:",
      codeSnippet: `// FIFO Page Replacement Simulation
int frames = 4; // previously 3
int faults = simulate_fifo(reference_string, frames);
// Result: faults increased from 9 to 10!`,
      options: [
        { id: "A", text: "A guaranteed decrease in page fault rate across all reference strings" },
        { id: "B", text: "An unexpected increase in page faults (primarily observed in FIFO)" },
        { id: "C", text: "Instant starvation of the kernel context switcher" },
        { id: "D", text: "Hardware MMU cache failure during TLB invalidation" }
      ],
      correctAnswer: "B",
      explanation: "Belady's Anomaly demonstrates that for some reference strings, the FIFO algorithm suffers more page faults when given more physical frames."
    },
    {
      id: 2,
      topic: "Optimal Page Replacement",
      questionText: "Which page replacement policy replaces the page that will not be used for the longest period of time in the future?",
      codeSnippet: null,
      options: [
        { id: "A", text: "Least Recently Used (LRU)" },
        { id: "B", text: "First-In First-Out (FIFO)" },
        { id: "C", text: "Optimal Page Replacement (OPT / MIN)" },
        { id: "D", text: "Second-Chance (Clock) Algorithm" }
      ],
      correctAnswer: "C",
      explanation: "The Optimal Page Replacement algorithm (OPT/Belady's MIN) replaces the page that will not be accessed for the longest duration into the future. It is primarily used as a theoretical benchmark."
    },
    {
      id: 3,
      topic: "Thrashing & Working Set",
      questionText: "Thrashing occurs in an operating system when:",
      codeSnippet: `// High Page Fault Frequency (PFF)
if (current_page_fault_rate > upper_threshold) {
    // OS spends more time swapping pages than executing instructions
    cpu_utilization = CRITICAL_LOW;
}`,
      options: [
        { id: "A", text: "The CPU spends more time swapping pages in and out than executing instructions" },
        { id: "B", text: "Multiple threads access a non-atomic integer without mutex synchronization" },
        { id: "C", text: "The disk scheduler switches from SCAN to C-LOOK under heavy I/O" },
        { id: "D", text: "The page table size exceeds physical RAM capacity" }
      ],
      correctAnswer: "A",
      explanation: "Thrashing is high paging activity where the system spends the majority of its execution cycles servicing page faults rather than productive computation."
    },
    {
      id: 4,
      topic: "Virtual Memory MMU",
      questionText: "The Translation Lookaside Buffer (TLB) is primarily implemented using:",
      codeSnippet: null,
      options: [
        { id: "A", text: "DRAM memory cells located on the motherboard" },
        { id: "B", text: "Fast, fully-associative SRAM cache hardware integrated into the CPU MMU" },
        { id: "C", text: "Secondary swap partitions on the NVMe drive" },
        { id: "D", text: "A balanced B+ Tree in kernel memory space" }
      ],
      correctAnswer: "B",
      explanation: "The TLB is high-speed associative hardware cache embedded inside the Memory Management Unit (MMU) for single-cycle virtual-to-physical address translation."
    },
    {
      id: 5,
      topic: "Clock Algorithm",
      questionText: "In the Second-Chance (Clock) page replacement algorithm, what happens when a page frame has its reference bit set to 1?",
      codeSnippet: `struct PageFrame {
    int page_num;
    unsigned int reference_bit: 1;
};`,
      options: [
        { id: "A", text: "It is immediately evacuated to the swap partition" },
        { id: "B", text: "The reference bit is cleared to 0 and the clock pointer advances to the next frame" },
        { id: "C", text: "It is locked permanently into physical memory" },
        { id: "D", text: "The page frame is marked as corrupted" }
      ],
      correctAnswer: "B",
      explanation: "The Clock algorithm gives the page a second chance: it clears the reference bit from 1 to 0 and inspects the next page frame."
    }
  ],
  "lab-cn-06": [
    {
      id: 1,
      topic: "TCP Socket Architecture",
      questionText: "Which system call transforms an active TCP socket descriptor into a passive listening socket?",
      codeSnippet: `int sockfd = socket(AF_INET, SOCK_STREAM, 0);
bind(sockfd, (struct sockaddr *)&serv_addr, sizeof(serv_addr));
// What system call belongs here?`,
      options: [
        { id: "A", text: "accept()" },
        { id: "B", text: "listen()" },
        { id: "C", text: "connect()" },
        { id: "D", text: "poll()" }
      ],
      correctAnswer: "B",
      explanation: "listen() marks the stream socket as passive, enabling incoming connection requests to be queued."
    },
    {
      id: 2,
      topic: "Non-blocking I/O",
      questionText: "What mechanism allows a single server process to monitor multiple file descriptors without spawning a thread per client?",
      codeSnippet: null,
      options: [
        { id: "A", text: "I/O Multiplexing (select, poll, or epoll)" },
        { id: "B", text: "Spinlock busy-waiting loops" },
        { id: "C", text: "UDP Datagram tunneling" },
        { id: "D", text: "Direct Memory Access (DMA) interrupts" }
      ],
      correctAnswer: "A",
      explanation: "I/O multiplexing primitives such as epoll/poll/select monitor multiple open sockets simultaneously, alerting the process when data is ready for reading or writing."
    }
  ]
};

// Initial Student Feedback Submissions (matching the live theskilltracker.in feedback module)
export const INITIAL_FEEDBACK_ITEMS = [
  {
    id: "fb-101",
    title: "Request for LeetCode dynamic submission auto-sync verification",
    category: "Platform Enhancement",
    priority: "Medium",
    status: "Resolved",
    submittedAt: "2026-09-02",
    response: "Implemented canonical LeetCode slug resolution and IndexedDB offline cache.",
    message: "Some problem links previously failed due to dynamic regex slug calculation. Would appreciate direct canonical URL links."
  },
  {
    id: "fb-102",
    title: "Operating Systems Lab 05 submission deadline extension",
    category: "Academic Query",
    priority: "High",
    status: "In Progress",
    submittedAt: "2026-09-06",
    response: "Under review by Prof. N. K. Choudhury.",
    message: "Requesting 24-hour grace window for benchmarking LRU algorithm across 10-frame configurations."
  },
  {
    id: "fb-103",
    title: "Semester 5 Transcript printable format margin correction",
    category: "Bug Report",
    priority: "Low",
    status: "Resolved",
    submittedAt: "2026-08-28",
    response: "Print CSS updated with clean @media print margins and PDF headers.",
    message: "Sidebar was overlapping with the semester marks table when saving as PDF."
  }
];

