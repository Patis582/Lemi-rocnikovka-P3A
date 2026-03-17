import SkillsCard from "@/components/SkillsCard";
import { SkillLibrary } from "@/types/training";

interface Props {
  skills: SkillLibrary[];
}

export default function SkillsClient({skills}: Props) {
    
    return(
        <div>
            <p>Skills</p>
            {skills.map((skill) => (
                <SkillsCard key={skill.id} skill={skill} />
            ))}
        </div>
    )
}