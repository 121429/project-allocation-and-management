// Mock data for the application
export interface Project {
  id: string;
  title: string;
  description: string;
  mentor: string;
  status: 'available' | 'assigned' | 'completed';
  deadline: string;
}

export interface Application {
  id: string;
  studentId: string;
  studentName: string;
  projectId: string;
  projectTitle: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
}

export interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  projectId: string;
  projectTitle: string;
  submissionDate: string;
  status: 'pending' | 'reviewed';
  feedback?: string;
}

export interface Test {
  id: string;
  title: string;
  questions: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

export interface TestResult {
  id: string;
  studentId: string;
  studentName: string;
  testId: string;
  testTitle: string;
  score: number;
  completedDate: string;
  status: 'completed' | 'pending';
}

export interface Student {
  id: string;
  name: string;
  email: string;
  mentor?: string;
}

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Chat Application',
    description: 'Develop a real-time chat application using machine learning for smart responses.',
    mentor: 'Dr. Smith',
    status: 'available',
    deadline: '2024-05-01',
  },
  {
    id: '2',
    title: 'Blockchain Voting System',
    description: 'Create a secure voting system using blockchain technology.',
    mentor: 'Prof. Johnson',
    status: 'assigned',
    deadline: '2024-06-15',
  },
  {
    id: '3',
    title: 'IoT Smart Home System',
    description: 'Build a system to control and monitor home devices using IoT sensors.',
    mentor: 'Dr. Williams',
    status: 'available',
    deadline: '2024-07-30',
  },
];

export const mockApplications: Application[] = [
  {
    id: '1',
    studentId: 'std1',
    studentName: 'John Doe',
    projectId: '1',
    projectTitle: 'AI-Powered Chat Application',
    status: 'pending',
    appliedDate: '2024-03-15',
  },
  {
    id: '2',
    studentId: 'std2',
    studentName: 'Jane Smith',
    projectId: '3',
    projectTitle: 'IoT Smart Home System',
    status: 'approved',
    appliedDate: '2024-03-14',
  },
];

export const mockSubmissions: Submission[] = [
  {
    id: '1',
    studentId: 'std2',
    studentName: 'Jane Smith',
    projectId: '2',
    projectTitle: 'Blockchain Voting System',
    submissionDate: '2024-03-10',
    status: 'pending',
  },
  {
    id: '2',
    studentId: 'std3',
    studentName: 'Mike Johnson',
    projectId: '1',
    projectTitle: 'AI-Powered Chat Application',
    submissionDate: '2024-03-12',
    status: 'reviewed',
    feedback: 'Excellent work! The implementation is clean and well-documented.',
  },
];

export const mockTest: Test = {
  id: '1',
  title: 'Programming Fundamentals Test',
  questions: [
    {
      id: 'q1',
      question: 'What is the primary purpose of version control systems?',
      options: [
        'To make backup copies of files',
        'To track changes in source code over time',
        'To compress source code files',
        'To encrypt source code',
      ],
      correctAnswer: 1,
    },
    {
      id: 'q2',
      question: 'Which of the following is NOT a primitive data type in JavaScript?',
      options: [
        'number',
        'string',
        'boolean',
        'array',
      ],
      correctAnswer: 3,
    },
    {
      id: 'q3',
      question: 'What does API stand for?',
      options: [
        'Application Programming Interface',
        'Advanced Programming Integration',
        'Automated Program Installation',
        'Application Process Integration',
      ],
      correctAnswer: 0,
    },
  ],
};

export const mockTestResults: TestResult[] = [
  {
    id: '1',
    studentId: 'std1',
    studentName: 'John Doe',
    testId: '1',
    testTitle: 'Programming Fundamentals Test',
    score: 85,
    completedDate: '2024-03-10',
    status: 'completed',
  },
  {
    id: '2',
    studentId: 'std2',
    studentName: 'Jane Smith',
    testId: '1',
    testTitle: 'Programming Fundamentals Test',
    score: 92,
    completedDate: '2024-03-11',
    status: 'completed',
  },
];

export const mockStudents: Student[] = [
  {
    id: 'std1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    mentor: 'Dr. Smith',
  },
  {
    id: 'std2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    mentor: 'Prof. Johnson',
  },
  {
    id: 'std3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
  },
];