import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkillCard } from "@/components/SkillCard";
import { UserProfile } from "@/components/UserProfile";
import { 
  mockSkills, 
  mockUserSkills, 
  currentUser, 
  skillCategories 
} from "@/data/mockData";
import { SkillLevel, UserSkill } from "@/types";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [userSkills, setUserSkills] = useState<UserSkill[]>(mockUserSkills);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleLevelChange = (skillId: string, level: SkillLevel) => {
    const existingSkill = userSkills.find(us => us.skillId === skillId);
    
    if (existingSkill) {
      // Update existing skill
      setUserSkills(prev => prev.map(us => 
        us.skillId === skillId 
          ? { ...us, level, approved: false, updatedAt: new Date() }
          : us
      ));
    } else {
      // Add new skill
      const newUserSkill: UserSkill = {
        id: Date.now().toString(),
        userId: currentUser.id,
        skillId,
        level,
        selfAssessed: true,
        approved: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setUserSkills(prev => [...prev, newUserSkill]);
    }
    
    toast({
      title: "Skill Updated",
      description: `Your ${level} level has been recorded and is pending approval.`,
    });
  };

  const filteredSkills = useMemo(() => {
    return mockSkills.filter(skill => 
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const skillsByCategory = useMemo(() => {
    return skillCategories.map(category => ({
      ...category,
      skills: filteredSkills.filter(skill => skill.category === category.name)
    })).filter(category => category.skills.length > 0);
  }, [filteredSkills]);

  const approvedCount = userSkills.filter(us => us.approved).length;
  const pendingCount = userSkills.filter(us => !us.approved).length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Skill Matrix Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your professional skills and track your development progress
          </p>
        </div>

        {/* User Profile */}
        <UserProfile user={currentUser} />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{userSkills.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Approved Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{approvedCount}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{pendingCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="max-w-md">
          <Input
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-card"
          />
        </div>

        {/* Skills Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="bg-card">
            <TabsTrigger value="all">All Skills</TabsTrigger>
            <TabsTrigger value="my-skills">
              My Skills
              <Badge variant="secondary" className="ml-2">
                {userSkills.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {skillsByCategory.map(category => (
              <div key={category.id} className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">{category.name}</h3>
                  {category.description && (
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {category.skills.map(skill => {
                    const userSkill = userSkills.find(us => us.skillId === skill.id);
                    return (
                      <SkillCard
                        key={skill.id}
                        skill={skill}
                        userSkill={userSkill}
                        onLevelChange={handleLevelChange}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="my-skills" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {userSkills.map(userSkill => {
                const skill = mockSkills.find(s => s.id === userSkill.skillId);
                if (!skill) return null;
                
                return (
                  <SkillCard
                    key={userSkill.id}
                    skill={skill}
                    userSkill={userSkill}
                    onLevelChange={handleLevelChange}
                  />
                );
              })}
            </div>
            {userSkills.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">
                    You haven't selected any skills yet. Use the "All Skills" tab to get started.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}