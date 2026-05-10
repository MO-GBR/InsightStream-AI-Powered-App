"use client"

import { InsightStreamLinks } from "@/constants"
import { useToggleMenuStore } from "@/lib/zustand/ToggleStore"
import { Command } from "cmdk"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const CommandBar = () => {
    // const [open, setOpen] = useState(false);
    const router = useRouter();

    const { open: openCommandMenu, toggle: toggleCommandMenu, setToggle: setToggleCommandMenu } = useToggleMenuStore();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                toggleCommandMenu();
            }
        };

        document.addEventListener('keydown', down);

        return () => document.removeEventListener('keydown', down);
    }, []);
    return (
        <Command.Dialog
            open={openCommandMenu} 
            className="fixed inset-0 z-50 flex items-start justify-center pt-40 bg-black/40"
            onOpenChange={setToggleCommandMenu} label="Command Menu"
        >
            <h1>Main Menu</h1>
            <Command className="w-fit rounded-xl bg-black shadow-xl p-4">
                <Command.Input 
                    placeholder="Search InsightStream..."
                    className="w-[600px] rounded-xl bg-gray-700 shadow-xl p-4 mb-3"
                />
                <Command.List>
                    {
                        InsightStreamLinks.map((link, index) => (
                            <Command.Item key={index} onSelect={() => router.push(link.href)} className="cursor-pointer hover:text-gray-400">
                                {link.name}
                            </Command.Item>
                        ))
                    }
                </Command.List>
            </Command>
        </Command.Dialog>
    )
}

export default CommandBar