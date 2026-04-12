import { create } from "zustand";
import { ScannerStore, ScannerType } from "@/types";
import { scanRisk } from "../InsightStream/crisis/riskCrisis";

export const useScannerStore = create<ScannerStore>((set, get) => ({
    Scanner: null,

    Scan: (data: ScannerType) => set({ Scanner: data }),

    fetchScannerData: async () => {
        const savedId = localStorage.getItem("ProjectId");
        const data = await scanRisk(savedId || "");
        get().Scan(data);
    },
}));
