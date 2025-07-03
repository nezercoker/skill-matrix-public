import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserSkill, Skill, SkillLevel } from "@/types";
import { Check } from "lucide-react";

interface SkillCardProps {
  skill: Skill;
  userSkill?: UserSkill;
  onLevelChange: (skillId: string, level: SkillLevel) => void;
  canEdit?: boolean;
}

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

export function SkillCard({ skill, userSkill, onLevelChange, canEdit = true }: SkillCardProps) {
  const currentLevel = userSkill?.level;

  return (
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-hover)]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-card-foreground">
              {skill.name}
            </CardTitle>
            {skill.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {skill.description}
              </p>
            )}
          </div>
          {userSkill?.approved && (
            <Badge variant="secondary" className="bg-success-light text-success-foreground">
              <Check className="w-3 h-3 mr-1" />
              Approved
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Skill Level
          </p>
          <div className="flex gap-2">
            {(['competent', 'good', 'excellent'] as SkillLevel[]).map((level) => (
              <Button
                key={level}
                variant={currentLevel === level ? "default" : "outline"}
                size="sm"
                className={`flex-1 text-xs transition-all duration-200 ${
                  currentLevel === level 
                    ? `${levelColors[level]} border-0 font-medium` 
                    : "hover:bg-muted"
                }`}
                onClick={() => canEdit && onLevelChange(skill.id, level)}
                disabled={!canEdit}
              >
                {levelLabels[level]}
              </Button>
            ))}
          </div>
          {userSkill && !userSkill.approved && (
            <p className="text-xs text-muted-foreground">
              Pending approval
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}