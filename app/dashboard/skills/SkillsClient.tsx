"use client";
import SkillsCard from "@/components/SkillsCard";
import { SkillLibrary } from "@/types/training";

interface Props {
  skills: SkillLibrary[];
}

export default function SkillsClient({ skills }: Props) {
  const statusPriority = {
    mastered: 1,
    learning: 2,
    not_started: 3,
  };
  return (
    <div className="min-h-screen pb-12 bg-slate-50/50">
      <div className="max-w-md mx-auto p-3 pt-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {[...skills]
            .sort((a, b) => statusPriority[a.status] - statusPriority[b.status])
            .map((skill) => (
              <SkillsCard key={skill.id} skill={skill} />
            ))}
        </div>
      </div>
    </div>
  );
}
