'use client';

import { useProjectStore } from "@/lib/zustand/ProjectStore";
import { useEffect } from "react";

export default function WarRoomLayout(
    { children }: { children: React.ReactNode }
) {
    const { fetchProjects } = useProjectStore();

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);
    
    return (
        <div className="flex flex-col w-full">
            {children}
        </div>
    )
};