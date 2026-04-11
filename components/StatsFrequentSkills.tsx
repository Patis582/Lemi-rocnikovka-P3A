import { getFrequentSkills } from "@/services/stats.service";
import StatsFrequentSkillsClient from "./StatsFrequentSkillsClient";

interface Props {
  filter: string;
  userId: string;
}

export default async function StatsFrequentSkills({ filter, userId }: Props) {
    const allSkills = await getFrequentSkills(userId, filter);
    
    const highestCount = allSkills.length > 0 ? allSkills[0].count : 1;

    return(
      <StatsFrequentSkillsClient skills={allSkills} highestCount={highestCount} />
    )
}
