"use client";

import { Loader2 } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const FILTER_OPTIONS = [
  { id: "all", label: "All Time" },
  { id: "year", label: "Year" },
  { id: "month", label: "Month" },
  { id: "week", label: "Week" },
  { id: "day", label: "Day" },
];

export default function StatsTimeFilter() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("time") || "all";
  const [pendingFilter, setPendingFilter] = useState<string | null>(null)


  const updateFilter = (time: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("time", time);
    setPendingFilter(time)
    startTransition(() => router.replace(`${pathname}?${params}`));
  };

  return (
      <div className="flex gap-2">
        {FILTER_OPTIONS.map((option) => {
          const isActive = currentFilter === option.id;
          return (
            
            <button
              key={option.id}
              onClick={() => updateFilter(option.id)}
              className={`
                            hover:cursor-pointer hover:scale-105 transition-transform text-sm font-semibold rounded-lg px-3 py-1 
                            ${
                              isActive
                                ? "bg-primary text-white"
                                : "bg-slate-100 text-slate-500"
                            }
                        `}
            >
              {isPending && pendingFilter === option.id ? <Loader2 className="h-4 w-4 animate-spin text-primary" /> : option.label}
            </button>
          );
        })}
      </div>
  );
}
