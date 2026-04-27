import { createBriefing } from '../briefing/createBriefing';
import { useProjectStore } from '@/lib/zustand/ProjectStore';

export const runBriefing = async () => {
    const selectedProjectId = useProjectStore.getState().currentProject?.id;
    try {
        // await createBriefing(selectedProjectId);
        console.log('Worker here xxxxx', selectedProjectId);
    } catch (error) {
        console.log('AI Briefing Audio Worker Error', error)
    }
};