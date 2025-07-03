import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check, X, Clock } from "lucide-react";
import { 
  mockSkills, 
  mockUsers, 
  currentUser as mockCurrentUser 
} from "@/data/mockData";
import { UserSkill, SkillLevel } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

// Mock data for pending skills from all team members
const mockPendingSkills: UserSkill[] = [
  {
    id: '5',
    userId: '9', // Chris Lee
    skillId: '7', // PostgreSQL
    level: 'competent',
    selfAssessed: true,
    approved: false,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '6',
    userId: '10', // Rachel Green
    skillId: '3', // Python
    level: 'good',
    selfAssessed: true,
    approved: false,
    createdAt: new Date('2024-01-21'),
    updatedAt: new Date('2024-01-21')
  },
  {
    id: '7',
    userId: '11', // Mark Thompson
    skillId: '11', // AWS
    level: 'excellent',
    selfAssessed: true,
    approved: false,
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22')
  },
  {
    id: '8',
    userId: '12', // Kelly White
    skillId: '19', // Jest
    level: 'good',
    selfAssessed: true,
    approved: false,
    createdAt: new Date('2024-01-23'),
    updatedAt: new Date('2024-01-23')
  }
];

const levelColors = {
  competent: "bg-warning-light text-warning-foreground",
  good: "bg-accent-light text-accent-foreground", 
  excellent: "bg-success-light text-success-foreground"
};

const levelLabels = {
  competent: "Competent",
  good: "Good",
  excellent: "Excellent"
};

export default function TechnicalSpecialistDashboard() {
  const [pendingSkills, setPendingSkills] = useState<UserSkill[]>(mockPendingSkills);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleApproval = (skillId: string, approved: boolean) => {
    setPendingSkills(prev => prev.map(skill => 
      skill.id === skillId 
        ? { 
            ...skill, 
            approved, 
            approvedBy: mockCurrentUser.id,
            approvedAt: new Date(),
            updatedAt: new Date()
          }
        : skill
    ));

    toast({
      title: approved ? "Skill Approved" : "Skill Rejected",
      description: `The skill assessment has been ${approved ? 'approved' : 'rejected'}.`,
    });

    // Remove from pending list after approval/rejection
    setTimeout(() => {
      setPendingSkills(prev => prev.filter(skill => skill.id !== skillId));
    }, 1000);
  };

  const filteredSkills = useMemo(() => {
    return pendingSkills.filter(userSkill => {
      const skill = mockSkills.find(s => s.id === userSkill.skillId);
      const user = mockUsers.find(u => u.id === userSkill.userId);
      
      if (!skill || !user) return false;
      
      return (
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [pendingSkills, searchTerm]);

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Technical Specialist Dashboard
              </h1>
              <p className="text-muted-foreground">
                Review and approve team member skill assessments
              </p>
            </div>
            <Link to="/">
              <Button variant="outline" className="ml-4">
                Back to My Skills
              </Button>
            </Link>
          </div>
        </div>

        {/* User Profile */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getUserInitials(mockCurrentUser.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">{mockCurrentUser.name}</CardTitle>
                <p className="text-muted-foreground">{mockCurrentUser.email}</p>
                <Badge variant="secondary" className="mt-1 capitalize">
                  {mockCurrentUser.role.replace('_', ' ')}
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{pendingSkills.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {mockUsers.filter(u => ['engineer', 'senior_engineer', 'technician'].includes(u.role)).length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Available Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{mockSkills.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="max-w-md">
          <Input
            placeholder="Search by skill, team member, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-card"
          />
        </div>

        {/* Pending Skills Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Pending Skill Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredSkills.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {pendingSkills.length === 0 
                    ? "No pending skill approvals at this time." 
                    : "No skills match your search criteria."
                  }
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team Member</TableHead>
                    <TableHead>Skill</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Self-Assessed Level</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSkills.map((userSkill) => {
                    const skill = mockSkills.find(s => s.id === userSkill.skillId);
                    const user = mockUsers.find(u => u.id === userSkill.userId);
                    
                    if (!skill || !user) return null;

                    return (
                      <TableRow key={userSkill.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                                {getUserInitials(user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground capitalize">
                                {user.role.replace('_', ' ')}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{skill.name}</p>
                            {skill.description && (
                              <p className="text-sm text-muted-foreground">{skill.description}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{skill.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={levelColors[userSkill.level]}>
                            {levelLabels[userSkill.level]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">
                            {userSkill.createdAt.toLocaleDateString()}
                          </p>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              className="bg-success hover:bg-success/90 text-success-foreground"
                              onClick={() => handleApproval(userSkill.id, true)}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleApproval(userSkill.id, false)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}