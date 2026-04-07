'use client';
import { useEffect } from "react";
import { useProjectStore } from "@/lib/zustand/ProjectStore";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { fetchProjects } = useProjectStore();

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    return (
        <div className="flex flex-col">
            {children}
        </div>
    )
}