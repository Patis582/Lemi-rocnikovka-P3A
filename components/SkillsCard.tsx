"use client";
import { updateSkillStatus } from "@/services/skills.service";
import { SkillLibrary } from "@/types/training";
import { useRouter } from "next/navigation";


export default function SkillsCard({skill}: {skill: SkillLibrary}) {
    const router = useRouter();
    const handleStatusChange = async (newStatus: "not_started" | "learning" | "mastered")=> {
        await updateSkillStatus(skill.id, newStatus);
        router.refresh();
    }
    return(
        <div>
            <div className="flex gap-2">
                <p>{skill.fig_code}</p>
                <p>{skill.status}</p>
                <p>{skill.date_mastered}</p>
                <p>{skill.difficulty_value}</p>
                <p>{skill.direction}</p>
                <p>{skill.name}</p>
                <button onClick={() => handleStatusChange("not_started")}>Not Started</button>
                <button onClick={() => handleStatusChange("learning")}>Learning</button>
                <button onClick={() => handleStatusChange("mastered")}>Mastered</button>
            </div>
        </div>
    )
}