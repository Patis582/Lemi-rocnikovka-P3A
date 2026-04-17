"use client";
import SkillsFilter, {
  DirectionFilter,
  SortOption,
} from "@/components/SkillsFilter";
import SkillsCard from "@/components/SkillsCard";
import { SkillLibrary } from "@/types/training";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props {
  skills: SkillLibrary[];
}

export default function SkillsClient({ skills }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState<SortOption>("status");
  const [directionFilter, setDirectionFilter] =
    useState<DirectionFilter>("all");
  const isFromOnboarding = searchParams.get("onboarding") === "true";
  const statusPriority = {
    mastered: 1,
    learning: 2,
    not_started: 3,
  };
  const lowerQuery = searchQuery.toLowerCase();
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    weekday: "long",
  });

  return (
    <div className="min-h-screen pb-12 bg-background">
      <div className="max-w-2xl md:max-w-5xl mx-auto p-3 pt-4 flex flex-col gap-4">
        <h1 className="font-bold text-2xl text-foreground">Skills</h1>
        {isFromOnboarding && (
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-4">
            <h2 className="font-bold text-foreground">Welcome to Lemi! 🎉</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Start by selecting skills you&apos;ve already mastered. You can
              always update this later.
            </p>
          </div>
        )}

        <SkillsFilter
          searchQuery={searchQuery}
          onSearchQuery={(search) => {
            setSearchQuery(search);
          }}
          statusFilter={statusFilter}
          onStatusFilter={(status) => {
            setStatusFilter(status);
          }}
          sortBy={sortBy}
          onSortChange={(sort) => {
            setSortBy(sort);
          }}
          directionFilter={directionFilter}
          onDirectionChange={(direction) => {
            setDirectionFilter(direction);
          }}
        />
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
          {[...skills]
            .filter((skill) =>
              checkSkillSearchMatch(skill, lowerQuery, dateFormatter),
            )
            .filter((skill) => {
              if (directionFilter === "all") return true;
              if (directionFilter === "none") return skill.direction === null;
              return skill.direction === directionFilter;
            })
            .filter(
              (skill) =>
                statusFilter === "all" || skill.status === statusFilter,
            )
            .sort((a, b) => {
              if (sortBy === "diff_asc")
                return a.difficulty_value - b.difficulty_value;
              if (sortBy === "diff_desc")
                return b.difficulty_value - a.difficulty_value;
              if (sortBy === "name_asc") return a.name.localeCompare(b.name);
              if (sortBy === "name_desc") return b.name.localeCompare(a.name);

              return statusPriority[a.status] - statusPriority[b.status];
            })
            .map((skill) => (
              <SkillsCard key={skill.id} skill={skill} />
            ))}
        </div>
      </div>
    </div>
  );
}

function checkSkillSearchMatch(
  skill: SkillLibrary,
  lowerQuery: string,
  dateFormatter: Intl.DateTimeFormat,
): boolean {
  const matchesName = skill.name.toLowerCase().includes(lowerQuery);

  const matchesCode = skill.fig_code.toLowerCase().includes(lowerQuery);

  let matchesDate = false;
  if (skill.date_mastered) {
    const dateObj = new Date(skill.date_mastered);
    const searchStringDate = dateFormatter.format(dateObj);
    const searchStringDateNUMBER = `${dateObj.getDate()}.${dateObj.getMonth() + 1}.${dateObj.getFullYear()}`;
    matchesDate =
      searchStringDate.toLowerCase().includes(lowerQuery) ||
      searchStringDateNUMBER.includes(lowerQuery);
  }

  return matchesName || matchesCode || matchesDate;
}