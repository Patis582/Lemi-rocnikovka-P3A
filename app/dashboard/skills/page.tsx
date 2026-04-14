
import { getSkills } from "@/services/skills.service";
import SkillsClient from "./SkillsClient";
import { SkillLibrary } from "@/types/training";


export default async function SkillsPage() {
    const skills = await getSkills();
    if (!skills) return [];
    
    return <SkillsClient skills={skills as SkillLibrary[]}/>
}