export interface User {
  _id: string; 
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  collegeId: string;
  collegeName?: string;
  isVerified: boolean;
  isBlocked?: boolean;
  contactInfo?: string;
  year?: number;
  skills?: string[];
  interests?: string;
  department?: string;
  researchInterests?: string;
  areasOfExpertise?: string[];
  linkedin?: string;
  github?: string;
  resume?: string;
  avatar?: string;
  followers?: string[];   // Just use string[] if you’re not populating user data
  following?: string[];
  personalProjects?: string[];
  projects?: string[];
  publications?: string[];
  events?: string[];
  createdAt?: string;
  updatedAt?: string;
  
}


export interface College {
  id: string;
  name: string;
  adminUserId: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  facultyId: string;
  facultyName: string;
  requiredSkills: string[];
  expectedOutcomes: string;
  duration: string;
  status: 'open' | 'in-progress' | 'completed';
  department: string;
}

export interface Application {
  id: string;
  projectId: string;
  studentId: string;
  studentName: string;
  message: string;
  relevantExperience: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: Date;
}

export interface Publication {
  id: string;
  facultyId: string;
  title: string;
  year: number;
  fileUrl?: string;
}

export interface StudentProject {
  id: string;
  _id: string;
  studentId: string;
  title: string;
  description: string;
  githubLink?: string;
  demoLink?: string;
  image?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  projectId?: string;
}

export interface Chat {
  id: string;
  participants: string[];
  projectId?: string;
  projectTitle?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
}


export interface StudentProject {
  id: string;
  title: string;
  description: string;
  githubLink?: string;
  demoLink?: string;
  imageUrl?: string;
}