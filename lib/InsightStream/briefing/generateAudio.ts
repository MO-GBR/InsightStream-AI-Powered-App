import { createClient } from "@supabase/supabase-js";
import { apiFetcherWithRetries } from "@/lib/utils/API_Fetcher";


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;


const uploadAudio = async (
    audioBuffer: ArrayBuffer,
    projectId: string,
    briefingId: string
): Promise<string> => {

    if (!supabaseUrl || !supabaseKey) {
        throw new Error("Supabase credentials are missing for briefing audio upload.");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const filePath = `${projectId}/${briefingId}.mp3`;

    const { error } = await supabase.storage.from("Audios").upload(filePath, new Blob([audioBuffer]), {
        contentType: "audio/mpeg",
        upsert: true,
    });

    if(error) {
        console.error("Error uploading audio:", error);
        throw new Error("Failed to upload audio");
    };

    const { data: { publicUrl } } = supabase.storage.from("Audios").getPublicUrl(filePath);

    return publicUrl;
};

export const generateBriefingAudio = async (text: string, projectId: string) => {
    const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/voice-id", {
        method: "POST",
        headers: {
            "xi-api-key": process.env.ELEVENLABS_API_KEY!,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text,
            model_id: "eleven_multilingual_v2"
        })
    });
  
    const audioBuffer = await response.arrayBuffer();
    const briefingId = crypto.randomUUID(); // Replace with actual briefing ID
  
    // Upload to storage (Supabase / S3)
    const url = await uploadAudio(audioBuffer, projectId, briefingId);
  
    return url;
};