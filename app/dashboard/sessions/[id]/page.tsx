import { SessionDetailRounds } from "@/components/SessionDetailRounds";
import { getSessionById } from "@/services/session.service";
import { Round } from "@/types/training";
import { v4 as uuidv4 } from "uuid";

export default async function SessionByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSessionById(id);

  if (!session) return <div>Training session not found</div>;

  const rounds: Round[] = session.rounds.map((round) => {
    return {
      id: round.id,
      total_difficulty: round.difficulty || 0,
      is_routine: round.is_routine || false,
      routine_type: (round.routine_type as "VS" | "PS") || undefined,
      tof: round.tof || undefined,
      skills: round.fig_string.split(",").map((figCodeString) => {
        return {
          id: uuidv4(),
          fig_code: figCodeString,
          difficulty: 0,
          tof: figCodeString === "-" ? round.tof || undefined : undefined,
        };
      }),
    };
  });

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-md mx-auto p-3 pt-4 flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <p>Date:</p>
            <p>{session?.date}</p>
          </div>
          <div className="flex flex-row gap-4">
            <p>Rating:</p>
            <p>{session?.rating}</p>
          </div>
          <div className="flex flex-row gap-4">
            <p>Total Difficulty:</p>
            <p>{session?.total_difficulty}</p>
          </div>
          <div className="flex flex-row gap-4">
            <p>Total Rounds:</p>
            <p>{session?.total_rounds}</p>
          </div>
          <div className="flex flex-row gap-4">
            <p>Notes:</p>
            <p>{session?.notes}</p>
          </div>
          <div className="flex flex-row gap-4">
            <p>Total Jumps:</p>
            <p>{session?.total_jumps}</p>
          </div>
          <div className="flex flex-row gap-4">
            <p>Total Routines:</p>
            <p>{session?.total_routines}</p>
          </div>
        </div>

        <SessionDetailRounds rounds={rounds} />
      </div>
    </div>
  );
}
