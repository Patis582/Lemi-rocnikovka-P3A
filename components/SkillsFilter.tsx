import { Filter, Search, SlidersHorizontal, Target } from "lucide-react";


export type SortOption = "status" | "diff_asc" | "diff_desc" | "name_asc" | "name_desc";
export type DirectionFilter = "all" | "F" | "B" | "none";

interface SkillsFilterProps {
  searchQuery: string;
  onSearchQuery: (q: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  directionFilter: DirectionFilter;
  onDirectionChange: (dir: DirectionFilter) => void;
  statusFilter: string;
  onStatusFilter: (status: string) => void;
}

export default function SkillsFilter({
  searchQuery,
  onSearchQuery,
  sortBy,
  onSortChange,
  directionFilter,
  onDirectionChange,
  statusFilter,
  onStatusFilter,
}: SkillsFilterProps) {
  return (
  <div className="relative mb-6 flex gap-2">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-muted-foreground" />
      </div>
      <input
        type="text"
        placeholder="Search skills or dates..."
        value={searchQuery}
        onChange={(e) => {
          onSearchQuery(e.target.value);
        }}
        className="w-full bg-card border border-border rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground shadow-sm transition-all text-foreground"
      />
      <div className="relative w-[52px] h-[50px] bg-card border border-border rounded-xl shadow-sm flex items-center justify-center shrink-0">
        <Filter className={`w-5 h-5`}/>
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value as SortOption)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
          <option value="status">Status</option>
          <option value="diff_asc">Difficulty: Ascending</option>
          <option value="diff_desc">Difficulty: Descending</option>
          <option value="name_asc">Name: A-Z</option>
          <option value="name_desc">Name: Z-A</option>
        </select>
        </div>
        <div className="relative w-[52px] h-[50px] bg-card border border-border rounded-xl shadow-sm flex items-center justify-center shrink-0">
          <SlidersHorizontal />
          <select
            value={directionFilter}
            onChange={(e) => onDirectionChange(e.target.value as DirectionFilter)}
            className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${directionFilter === "all" ? "text-muted-foreground" : "text-primary"}`}
          >
            <option value="all">Direction: All</option>
            <option value="F">Frontwards</option>
            <option value="B">Backwards</option>
            <option value="none">None</option>
          </select>
        </div>
        <div className="relative w-[52px] h-[50px] bg-card border border-border rounded-xl shadow-sm flex items-center justify-center shrink-0">
          <Target
            className={`w-5 h-5 ${statusFilter === "all" ? "text-muted-foreground" : "text-primary"}`}
          />
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilter(e.target.value)}
            className={`absolute  inset-0 w-full h-full opacity-0 cursor-pointer ${statusFilter === "all" ? "text-muted-foreground" : "text-primary"}`}
          >
            <option value="all">Status: All</option>
            <option value="mastered">Mastered</option>
            <option value="learning">Learning</option>
            <option value="not_started">Not Started</option>
          </select>
        </div>
    </div>
  );
}