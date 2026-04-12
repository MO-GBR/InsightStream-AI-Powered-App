import { create } from "zustand";
import { ProjectType, ProjectStore } from "@/types";

const normalizeProjectId = (value: string | null) => {
    if (!value) return null;
    return value.replace(/^"(.*)"$/, "$1");
};

export const useProjectStore = create<ProjectStore>((set) => ({
    projects: [],
    currentProject: null,

    setProjects: (projects: ProjectType[]) => set({ projects }),
    
    setCurrentProject: (project: ProjectType) => {
        localStorage.setItem("ProjectId", JSON.stringify(project.id));
        document.cookie = `currentProjectId=${project.id}; path=/; max-age=31536000; samesite=lax`;
        set({ currentProject: project });
    },

    fetchProjects: async () => {
        try {
            const savedId = normalizeProjectId(localStorage.getItem("ProjectId"));

            const response = await fetch("/api/projects/get_all");
            if (!response.ok) {
                throw new Error("Failed to fetch projects");
            }
            const data = await response.json();
            set({
                projects: data.projects,
                currentProject: data.projects.find((p: ProjectType) => p.id === savedId) || data.projects[0] || null,
            });
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    },
}));