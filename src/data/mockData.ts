import { User, Project, Application, Publication, StudentProject, College } from '../types';

export const mockColleges: College[] = [
  { id: '1', name: 'ABC Engineering College', adminUserId: 'admin1' },
  { id: '2', name: 'XYZ Institute of Technology', adminUserId: 'admin2' },
  { id: '3', name: 'PQR University', adminUserId: 'admin3' },
];

export const mockUsers: User[] = [
  {
    id: 'student1',
    name: 'Rahul Sharma',
    email: 'rahul@student.com',
    role: 'student',
    collegeId: '1',
    collegeName: 'ABC Engineering College',
    isVerified: true,
    branch: 'Computer Science',
    year: 3,
    skills: ['React', 'Node.js', 'Python', 'Machine Learning'],
    interests: 'Web Development, AI/ML, Data Science',
    contactInfo: '+91 9876543210'
  },
  {
    id: 'student2',
    name: 'Priya Patel',
    email: 'priya@student.com',
    role: 'student',
    collegeId: '1',
    collegeName: 'ABC Engineering College',
    isVerified: false,
    branch: 'Electronics',
    year: 2,
    skills: ['C++', 'Arduino', 'IoT'],
    interests: 'Embedded Systems, IoT, Robotics',
    contactInfo: '+91 9876543211'
  },
  {
    id: 'faculty1',
    name: 'Dr. Anil Kumar',
    email: 'anil@faculty.com',
    role: 'faculty',
    collegeId: '1',
    collegeName: 'ABC Engineering College',
    isVerified: true,
    department: 'Computer Science',
    researchInterests: 'Machine Learning, Natural Language Processing, Computer Vision',
    areasOfExpertise: ['Machine Learning', 'Deep Learning', 'Python', 'TensorFlow']
  },
  {
    id: 'faculty2',
    name: 'Prof. Sunita Verma',
    email: 'sunita@faculty.com',
    role: 'faculty',
    collegeId: '1',
    collegeName: 'ABC Engineering College',
    isVerified: true,
    department: 'Electronics',
    researchInterests: 'IoT, Embedded Systems, Wireless Communication',
    areasOfExpertise: ['IoT', 'Embedded Systems', 'Arduino', 'Sensors']
  },
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@abc.edu',
    role: 'admin',
    collegeId: '1',
    collegeName: 'ABC Engineering College',
    isVerified: true
  }
];

export const mockProjects: Project[] = [
  {
    id: 'proj1',
    title: 'AI-Powered Chatbot for Student Support',
    description: 'Develop an intelligent chatbot using NLP to assist students with academic queries, course information, and general support. The project involves training a language model and creating a user-friendly interface.',
    facultyId: 'faculty1',
    facultyName: 'Dr. Anil Kumar',
    requiredSkills: ['Python', 'NLP', 'Machine Learning', 'React'],
    expectedOutcomes: 'A fully functional chatbot with web interface, trained model, and documentation',
    duration: '6 months',
    status: 'open',
    department: 'Computer Science'
  },
  {
    id: 'proj2',
    title: 'Smart Campus IoT System',
    description: 'Create an IoT-based system to monitor and control various campus facilities including lighting, temperature, and security. The system should provide real-time data visualization and remote control capabilities.',
    facultyId: 'faculty2',
    facultyName: 'Prof. Sunita Verma',
    requiredSkills: ['Arduino', 'IoT', 'Sensors', 'C++', 'Web Development'],
    expectedOutcomes: 'Complete IoT system with sensors, dashboard, and mobile app',
    duration: '8 months',
    status: 'open',
    department: 'Electronics'
  },
  {
    id: 'proj3',
    title: 'Blockchain-based Certificate Verification',
    description: 'Develop a blockchain solution for secure and tamper-proof academic certificate verification. The system should allow institutions to issue certificates and employers to verify them instantly.',
    facultyId: 'faculty1',
    facultyName: 'Dr. Anil Kumar',
    requiredSkills: ['Blockchain', 'Solidity', 'Web3', 'JavaScript'],
    expectedOutcomes: 'Blockchain network, smart contracts, and verification portal',
    duration: '10 months',
    status: 'in-progress',
    department: 'Computer Science'
  }
];

export const mockApplications: Application[] = [
  {
    id: 'app1',
    projectId: 'proj1',
    studentId: 'student1',
    studentName: 'Rahul Sharma',
    message: 'I am very interested in this project as I have experience with Python and machine learning. I have worked on similar NLP projects during my coursework.',
    relevantExperience: 'Built a sentiment analysis tool using Python and NLTK. Completed online courses in machine learning and deep learning.',
    status: 'pending',
    appliedAt: new Date('2024-01-15')
  },
  {
    id: 'app2',
    projectId: 'proj2',
    studentId: 'student2',
    studentName: 'Priya Patel',
    message: 'This project aligns perfectly with my interests in IoT and embedded systems. I have hands-on experience with Arduino and sensor integration.',
    relevantExperience: 'Created a home automation system using Arduino and ESP32. Participated in IoT hackathon and won second place.',
    status: 'accepted',
    appliedAt: new Date('2024-01-10')
  }
];

export const mockPublications: Publication[] = [
  {
    id: 'pub1',
    facultyId: 'faculty1',
    title: 'Advanced Machine Learning Techniques in Educational Technology',
    year: 2023,
    fileUrl: '/publications/ml-edtech-2023.pdf'
  },
  {
    id: 'pub2',
    facultyId: 'faculty1',
    title: 'Natural Language Processing for Academic Applications',
    year: 2022,
    fileUrl: '/publications/nlp-academic-2022.pdf'
  },
  {
    id: 'pub3',
    facultyId: 'faculty2',
    title: 'IoT Integration in Smart Campus Infrastructure',
    year: 2023,
    fileUrl: '/publications/iot-campus-2023.pdf'
  }
];

export const mockStudentProjects: StudentProject[] = [
  {
    id: 'stuproj1',
    studentId: 'student1',
    title: 'Personal Portfolio Website',
    description: 'A responsive portfolio website built with React and Tailwind CSS showcasing my projects and skills.',
    githubLink: 'https://github.com/rahul/portfolio',
    demoLink: 'https://rahul-portfolio.vercel.app',
    imageUrl: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'stuproj2',
    studentId: 'student1',
    title: 'Movie Recommendation System',
    description: 'A machine learning-based movie recommendation system using collaborative filtering and content-based filtering techniques.',
    githubLink: 'https://github.com/rahul/movie-recommender',
    imageUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'stuproj2',
    studentId: 'student1',
    title: 'Movie Recommendation System',
    description: 'A machine learning-based movie recommendation system using collaborative filtering and content-based filtering techniques.',
    githubLink: 'https://github.com/rahul/movie-recommender',
    imageUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'stuproj2',
    studentId: 'student1',
    title: 'Movie Recommendation System',
    description: 'A machine learning-based movie recommendation system using collaborative filtering and content-based filtering techniques.',
    githubLink: 'https://github.com/rahul/movie-recommender',
    imageUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export const skillGaps = [
  'Advanced React Patterns',
  'System Design',
  'Cloud Computing (AWS/Azure)',
  'DevOps & CI/CD',
  'Database Optimization',
  'Microservices Architecture'
];

export const learningResources = [
  {
    title: 'React Advanced Patterns',
    description: 'Master advanced React patterns including HOCs, render props, and hooks',
    url: 'https://reactjs.org/docs/higher-order-components.html',
    type: 'Documentation'
  },
  {
    title: 'System Design Interview Prep',
    description: 'Comprehensive guide to system design interviews with real-world examples',
    url: 'https://github.com/donnemartin/system-design-primer',
    type: 'GitHub Repository'
  },
  {
    title: 'AWS Cloud Practitioner',
    description: 'Get started with AWS cloud services and earn your first certification',
    url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
    type: 'Certification'
  }
];