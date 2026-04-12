import { apiFetcher, resolveApiUrl } from "@/lib/utils/API_Fetcher";
import { useProjectStore } from "@/lib/zustand/ProjectStore";
import { ProjectType } from "@/types";



export const ProjectAPI = {
    getProjects: async () => {
        const response = await fetch(resolveApiUrl("/api/projects/get_all"));
        if (!response.ok) {
            throw new Error("Failed to fetch projects");
        };
        const data = await response.json();
        return data.projects as ProjectType[];
    },
    createProject: async (projectData: ProjectType) => {
        const response = await fetch("/api/projects/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(projectData),
        });
        if (!response.ok) {
            throw new Error("Failed to create project");
        };
        const data = await response.json();
        return data.project as ProjectType;
    },
};

export const fetchCurrentProject = async () => {
    const { currentProject } = useProjectStore.getState();

    const savedId = localStorage.getItem("ProjectId");

    if ( currentProject?.id === savedId) {
        const data = await apiFetcher(`/api/projects/${currentProject.id}`);
        return data.project as ProjectType;
    }
};