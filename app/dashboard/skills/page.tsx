
import { getSkills } from "@/services/skills.service";
import SkillsClient from "./SkillsClient";


export default async function SkillsPage() {
    const skills = await getSkills();
    if (!skills) return [];
    
    return <SkillsClient skills={skills}/>
}