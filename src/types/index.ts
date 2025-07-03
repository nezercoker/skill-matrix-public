export type UserRole = 'technician' | 'engineer' | 'senior_engineer' | 'technical_specialist' | 'manager';

export type SkillLevel = 'competent' | 'good' | 'excellent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  description?: string;
}

export interface UserSkill {
  id: string;
  userId: string;
  skillId: string;
  level: SkillLevel;
  selfAssessed: boolean;
  approved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SkillCategory {
  id: string;
  name: string;
  description?: string;
}