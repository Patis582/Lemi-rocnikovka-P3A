import { createClient } from "@/utils/supabase/server";

export type DashboardStats = {
  username: string;
  maxDifficulty: string;
  trainings: number;
  totalRounds: number;
  recentTrainings: Array<{
    id: string;
    date: string;
    time: string;
    rounds: number;
    jumps: number;
    diff: number;
  }>;
};

export async function getDashboardData(userId: string): Promise<DashboardStats> {
  const supabase = await createClient();

  const { data: sessions, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (error || !sessions) {
    console.error("Error fetching sessions:", error?.message);
    return {
      username: "",
      maxDifficulty: "0.0",
      trainings: 0,
      totalRounds: 0,
      recentTrainings: [],
    };
  }

  const { data: userSkills } = await supabase
    .from("user_skills")
    .select(`
      status,
      skills (
        difficulty_value
      )
    `)
    .eq("user_id", userId)
    .eq("status", "mastered");

  let maxDiff = 0;
  if (userSkills && userSkills.length > 0) {
    const difficulties = userSkills
      .map(us => {
        const skill = us.skills as unknown as { difficulty_value: number } | null;
        return skill?.difficulty_value || 0;
      });
    maxDiff = Math.max(...difficulties);
  }

  const trainingsCount = sessions.length;
  const totalRounds = sessions.reduce((sum, currentSession) => {
    return sum + (currentSession.total_rounds || 0);
  }, 0);
  const recent = sessions.slice(0, 5).map(session => {
    const dateObj = new Date(session.date);
    
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    }).format(dateObj);

    const formattedTime = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    }).format(dateObj);

    return {
      id: session.id,
      date: formattedDate,
      time: formattedTime,
      rounds: session.total_rounds || 0,
      jumps: 0,
      diff: session.max_difficulty || 0
    };
  });

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", userId)
    .single();

  return {
    username: profile?.username || "",
    maxDifficulty: maxDiff.toFixed(1),
    trainings: trainingsCount,
    totalRounds: totalRounds,
    recentTrainings: recent,
  };
}
