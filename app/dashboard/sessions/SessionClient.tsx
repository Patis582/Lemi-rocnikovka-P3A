"use client";
import SessionCard from "@/components/SessionCard";
import { SessionHistory } from "@/types/training";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

interface Props {
  sessions: SessionHistory[];
}

export default function SessionClient({ sessions }: Props) {
  const [searchQuerry, setSearchQuerry] = useState("");
  const [displayCount, setDisplayCount] = useState(5);
  const [timeFilter, setTimeFilter] = useState("all");

  const filteredSessions = sessions.filter((sessions) => {
    const dateObj = new Date(sessions.date);
    const now = new Date();
    if (timeFilter === "month") {
      if (
        dateObj.getMonth() !== now.getMonth() ||
        dateObj.getFullYear() !== now.getFullYear()
      )
        return false;
    }
    if (timeFilter === "3months") {
      const monthsDiff =
        (now.getFullYear() - dateObj.getFullYear()) * 12 +
        now.getMonth() -
        dateObj.getMonth();
      if (monthsDiff > 3) return false;
    }
    if (timeFilter === "year") {
      if (dateObj.getFullYear() !== now.getFullYear()) return false;
    }
    const searchStringDateEN = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(dateObj);
    const searchStringDate = `${dateObj.getDate()}.${dateObj.getMonth() + 1}.${dateObj.getFullYear()}`;
    const matchesDate =
      searchStringDateEN.toLowerCase().includes(searchQuerry.toLowerCase()) ||
      searchStringDate.includes(searchQuerry.toLowerCase());

    const matchesNotes = sessions.notes
      ?.toLowerCase()
      .includes(searchQuerry.toLowerCase());
    const matchesSkills = sessions.rounds.some((round) =>
      round.fig_string.toLowerCase().includes(searchQuerry.toLowerCase()),
    );

    return matchesDate || matchesNotes || matchesSkills;
  });
  const displayedSessions = filteredSessions.slice(0, displayCount);
  return (
    <div className="pb-14 min-h-screen bg-slate-50/50">
      <div className="max-w-md mx-auto w-full pt-6 px-4 flex flex-col gap-4">
        <h1 className="font-bold text-2xl">Training Sessions</h1>
        <div>
          <div className="relative mb-6 flex gap-2">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search skills or dates..."
              value={searchQuerry}
              onChange={(e) => {
                setSearchQuerry(e.target.value);
                setDisplayCount(5);
              }}
              className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400 shadow-sm transition-all"
            />
            <div className="relative w-[52px] h-[50px] bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-center shrink-0">
              
              <SlidersHorizontal className={`w-5 h-5 ${timeFilter === 'all' ? 'text-slate-500' : 'text-primary'}`} />
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              >
                <option value="all">All Time</option>
                <option value="month">This Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-6">
            {displayedSessions.map((rawSession) => {
              const dateObj = new Date(rawSession.date);

              const formattedDate = new Intl.DateTimeFormat("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              }).format(dateObj);

              const formattedTime = new Intl.DateTimeFormat("en-US", {
                hour: "numeric",
                minute: "2-digit",
              }).format(dateObj);
              return (
                <SessionCard
                  key={rawSession.id}
                  date={formattedDate}
                  time={formattedTime}
                  rating={rawSession.rating || 0}
                  difficulty={rawSession.total_difficulty || 0}
                  rounds={rawSession.total_rounds || 0}
                  jumps={rawSession.total_jumps || 0}
                  total_routines={rawSession.total_routines || 0}
                  notes={rawSession.notes || ""}
                />
              );
            })}
            {displayCount < filteredSessions.length && (
              <button
                onClick={() => setDisplayCount(displayCount + 10)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400 shadow-sm transition-all"
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
