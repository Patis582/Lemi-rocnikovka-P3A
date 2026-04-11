import { getTenJumpTimeProgression } from "@/services/stats.service";
import StatsTofChart from "./StatsTofChart";

interface Props {
  filter: string;
  userId: string;
}

export default async function StatsTof({ filter, userId }: Props) {
    const data = await getTenJumpTimeProgression(userId, filter);

    return <StatsTofChart data={data} />;
}
