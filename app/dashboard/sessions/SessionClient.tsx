"use client";
import SessionCard from "@/components/SessionCard";
import { SessionHistory } from "@/types/training";

interface Props {
  sessions: SessionHistory[];
}

export default function SessionClient({ sessions }: Props) {
  return (
    <div>
      <h1>Training Sessions</h1>
      <div>
        <div>
          <input type="text" placeholder="Search skills or dates..." />
          <div></div>
          {/* Tady budou filters */}
        </div>
        <div className="flex flex-col gap-4 mt-6">
          {sessions.map((rawSession) => {
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
        </div>
      </div>
    </div>
  );
}
