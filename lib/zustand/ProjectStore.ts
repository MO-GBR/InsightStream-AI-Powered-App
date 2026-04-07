import { create } from "zustand";
import { ProjectType, ProjectStore } from "@/types";

export const useProjectStore = create<ProjectStore>((set) => ({
    projects: [],
    currentProject: null,

    setProjects: (projects: ProjectType[]) => set({ projects }),
    setCurrentProject: (project: ProjectType) => {
        localStorage.setItem("ProjectId", JSON.stringify(project.id));
        set({ currentProject: project })
    },

    fetchProjects: async () => {
        try {
            const savedId = localStorage.getItem("ProjectId");

            const response = await fetch("/api/projects/get_all");
            if (!response.ok) {
                throw new Error("Failed to fetch projects");
            }
            const data = await response.json();
            set({
                projects: data.projects,
                currentProject: data.projects.find((p: ProjectType) => p.id === savedId) || null,
            });
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    },
}));