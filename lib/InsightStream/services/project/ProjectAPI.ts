import { apiFetcherWithRetries } from "@/lib/utils/API_Fetcher";
import { useProjectStore } from "@/lib/zustand/ProjectStore";
import { ProjectType } from "@/types";



export const ProjectAPI = {
    getProjects: async () => {
        const data = await apiFetcherWithRetries("/api/projects/get_all");
        return data.projects as ProjectType[];
    },
    createProject: async (projectData: ProjectType) => {
        const data = await apiFetcherWithRetries("/api/projects/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(projectData),
        });
        return data.project as ProjectType;
    },
};