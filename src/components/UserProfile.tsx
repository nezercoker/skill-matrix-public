import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types";
import { User as UserIcon } from "lucide-react";

interface UserProfileProps {
  user: User;
}

const roleLabels = {
  technician: "Technician",
  engineer: "Engineer", 
  senior_engineer: "Senior Engineer",
  technical_specialist: "Technical Specialist",
  manager: "Manager"
};

const roleColors = {
  technician: "bg-muted text-muted-foreground",
  engineer: "bg-primary-light text-primary-foreground",
  senior_engineer: "bg-accent-light text-accent-foreground",
  technical_specialist: "bg-success-light text-success-foreground", 
  manager: "bg-warning-light text-warning-foreground"
};

export function UserProfile({ user }: UserProfileProps) {
  return (
    <Card className="bg-gradient-to-br from-card to-muted border-0 shadow-[var(--shadow-card)]">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <UserIcon className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg text-card-foreground">{user.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <Badge className={`${roleColors[user.role]} border-0 font-medium`}>
            {roleLabels[user.role]}
          </Badge>
        </div>
      </CardHeader>
      {user.department && (
        <CardContent>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Department:</span> {user.department}
          </p>
        </CardContent>
      )}
    </Card>
  );
}