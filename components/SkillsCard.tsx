import { SkillLibrary } from "@/types/training";


export default function SkillsCard({skill}: {skill: SkillLibrary}) {
    return(
        <div>
            <div className="flex gap-2">
                <p>{skill.fig_code}</p>
                <p>{skill.status}</p>
                <p>{skill.date_mastered}</p>
                <p>{skill.difficulty_value}</p>
                <p>{skill.direction}</p>
                <p>{skill.name}</p>
            </div>
        </div>
    )
}