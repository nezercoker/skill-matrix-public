import { User, Skill, UserSkill, SkillCategory } from "@/types";

export const mockUsers: User[] = [
  { id: '1', name: 'John Smith', email: 'john.smith@company.com', role: 'manager', department: 'Engineering' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.j@company.com', role: 'technical_specialist', department: 'Engineering' },
  { id: '3', name: 'Mike Chen', email: 'mike.chen@company.com', role: 'technical_specialist', department: 'Engineering' },
  { id: '4', name: 'Lisa Brown', email: 'lisa.brown@company.com', role: 'technical_specialist', department: 'Engineering' },
  { id: '5', name: 'David Wilson', email: 'david.w@company.com', role: 'senior_engineer', department: 'Engineering' },
  { id: '6', name: 'Emma Davis', email: 'emma.davis@company.com', role: 'senior_engineer', department: 'Engineering' },
  { id: '7', name: 'Tom Anderson', email: 'tom.a@company.com', role: 'senior_engineer', department: 'Engineering' },
  { id: '8', name: 'Amy Taylor', email: 'amy.taylor@company.com', role: 'senior_engineer', department: 'Engineering' },
  { id: '9', name: 'Chris Lee', email: 'chris.lee@company.com', role: 'engineer', department: 'Engineering' },
  { id: '10', name: 'Rachel Green', email: 'rachel.g@company.com', role: 'engineer', department: 'Engineering' },
  { id: '11', name: 'Mark Thompson', email: 'mark.t@company.com', role: 'engineer', department: 'Engineering' },
  { id: '12', name: 'Kelly White', email: 'kelly.white@company.com', role: 'engineer', department: 'Engineering' },
  { id: '13', name: 'Alex Rodriguez', email: 'alex.r@company.com', role: 'engineer', department: 'Engineering' },
  { id: '14', name: 'Jennifer Kim', email: 'jennifer.k@company.com', role: 'engineer', department: 'Engineering' },
  { id: '15', name: 'Steve Garcia', email: 'steve.garcia@company.com', role: 'technician', department: 'Engineering' },
  { id: '16', name: 'Maria Martinez', email: 'maria.m@company.com', role: 'technician', department: 'Engineering' },
  { id: '17', name: 'James Wilson', email: 'james.w@company.com', role: 'technician', department: 'Engineering' },
  { id: '18', name: 'Linda Jones', email: 'linda.jones@company.com', role: 'technician', department: 'Engineering' }
];

export const skillCategories: SkillCategory[] = [
  { id: '1', name: 'Programming Languages', description: 'Software development languages and frameworks' },
  { id: '2', name: 'Database Management', description: 'Database design, optimization, and administration' },
  { id: '3', name: 'Cloud Technologies', description: 'Cloud platforms and deployment strategies' },
  { id: '4', name: 'DevOps & CI/CD', description: 'Development operations and continuous integration' },
  { id: '5', name: 'Testing & Quality Assurance', description: 'Testing methodologies and quality control' },
  { id: '6', name: 'Project Management', description: 'Planning, coordination, and team leadership' },
  { id: '7', name: 'Security', description: 'Cybersecurity and data protection' },
  { id: '8', name: 'Data Analysis', description: 'Data processing and analytical tools' }
];

export const mockSkills: Skill[] = [
  // Programming Languages
  { id: '1', name: 'JavaScript', category: 'Programming Languages', description: 'Modern JavaScript development' },
  { id: '2', name: 'TypeScript', category: 'Programming Languages', description: 'Strongly typed JavaScript' },
  { id: '3', name: 'Python', category: 'Programming Languages', description: 'General purpose programming language' },
  { id: '4', name: 'React', category: 'Programming Languages', description: 'Frontend JavaScript library' },
  { id: '5', name: 'Node.js', category: 'Programming Languages', description: 'Server-side JavaScript runtime' },
  { id: '6', name: 'Java', category: 'Programming Languages', description: 'Enterprise programming language' },
  
  // Database Management
  { id: '7', name: 'PostgreSQL', category: 'Database Management', description: 'Advanced relational database' },
  { id: '8', name: 'MongoDB', category: 'Database Management', description: 'NoSQL document database' },
  { id: '9', name: 'Redis', category: 'Database Management', description: 'In-memory data structure store' },
  { id: '10', name: 'SQL Optimization', category: 'Database Management', description: 'Query performance tuning' },
  
  // Cloud Technologies
  { id: '11', name: 'AWS', category: 'Cloud Technologies', description: 'Amazon Web Services platform' },
  { id: '12', name: 'Docker', category: 'Cloud Technologies', description: 'Container technology' },
  { id: '13', name: 'Kubernetes', category: 'Cloud Technologies', description: 'Container orchestration' },
  { id: '14', name: 'Azure', category: 'Cloud Technologies', description: 'Microsoft cloud platform' },
  
  // DevOps & CI/CD
  { id: '15', name: 'Git', category: 'DevOps & CI/CD', description: 'Version control system' },
  { id: '16', name: 'Jenkins', category: 'DevOps & CI/CD', description: 'Continuous integration server' },
  { id: '17', name: 'GitHub Actions', category: 'DevOps & CI/CD', description: 'CI/CD automation' },
  { id: '18', name: 'Terraform', category: 'DevOps & CI/CD', description: 'Infrastructure as code' },
  
  // Testing & Quality Assurance
  { id: '19', name: 'Jest', category: 'Testing & Quality Assurance', description: 'JavaScript testing framework' },
  { id: '20', name: 'Selenium', category: 'Testing & Quality Assurance', description: 'Web automation testing' },
  { id: '21', name: 'API Testing', category: 'Testing & Quality Assurance', description: 'REST API validation' },
  
  // Project Management
  { id: '22', name: 'Agile/Scrum', category: 'Project Management', description: 'Agile project methodologies' },
  { id: '23', name: 'Team Leadership', category: 'Project Management', description: 'Leading development teams' },
  { id: '24', name: 'Stakeholder Management', category: 'Project Management', description: 'Managing project stakeholders' },
  
  // Security
  { id: '25', name: 'OAuth/JWT', category: 'Security', description: 'Authentication and authorization' },
  { id: '26', name: 'Penetration Testing', category: 'Security', description: 'Security vulnerability assessment' },
  { id: '27', name: 'OWASP', category: 'Security', description: 'Web application security practices' },
  
  // Data Analysis
  { id: '28', name: 'Excel/Spreadsheets', category: 'Data Analysis', description: 'Advanced spreadsheet analysis' },
  { id: '29', name: 'Power BI', category: 'Data Analysis', description: 'Business intelligence reporting' },
  { id: '30', name: 'Data Visualization', category: 'Data Analysis', description: 'Creating meaningful data presentations' }
];

// Mock user skills for current user (id: '9' - Chris Lee, Engineer)
export const mockUserSkills: UserSkill[] = [
  {
    id: '1',
    userId: '9',
    skillId: '1', // JavaScript
    level: 'excellent',
    selfAssessed: true,
    approved: true,
    approvedBy: '5',
    approvedAt: new Date('2024-01-15'),
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    userId: '9', 
    skillId: '4', // React
    level: 'good',
    selfAssessed: true,
    approved: true,
    approvedBy: '5',
    approvedAt: new Date('2024-01-15'),
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '3',
    userId: '9',
    skillId: '7', // PostgreSQL
    level: 'competent',
    selfAssessed: true,
    approved: false,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '4',
    userId: '9',
    skillId: '15', // Git
    level: 'excellent',
    selfAssessed: true,
    approved: true,
    approvedBy: '2',
    approvedAt: new Date('2024-01-12'),
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-12')
  }
];

// Current logged in user
export const currentUser = mockUsers[1]; // Sarah Johnson - Technical Specialist