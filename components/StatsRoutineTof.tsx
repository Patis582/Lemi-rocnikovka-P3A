import { getRoutineTofProgression } from "@/services/stats.service";
import StatsTofChart from "./StatsTofChart"; 

interface Props {
  filter: string;
  userId: string;
}

export default async function StatsRoutineTof({ filter, userId }: Props) {
    const data = await getRoutineTofProgression(userId, filter);

    return (
        <StatsTofChart 
           data={data} 
           title="Routine Time of Flight (s)" 
           color="#3b82f6"
        />
    );
}

