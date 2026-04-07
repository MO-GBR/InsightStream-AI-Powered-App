import { supabase } from "@/lib/supabase/client";

const uploadAudio = async (
    audioBuffer: ArrayBuffer,
    projectId: string,
    briefingId: string
): Promise<string> => {
    const filePath = `${projectId}/${briefingId}.mp3`;

    const { error } = await supabase().storage.from("Audios").upload(filePath, new Blob([audioBuffer]), {
        contentType: "audio/mpeg",
        upsert: true,
    });

    if(error) {
        console.error("Error uploading audio:", error);
        throw new Error("Failed to upload audio");
    };

    const { data: { publicUrl } } = supabase().storage.from("Audios").getPublicUrl(filePath);

    return publicUrl;
};

export const generateBriefingAudio = async (text: string) => {
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
    const projectId = "your-project-id"; // Replace with actual project ID
    const briefingId = crypto.randomUUID(); // Replace with actual briefing ID
  
    // Upload to storage (Supabase / S3)
    const url = await uploadAudio(audioBuffer, projectId, briefingId);
  
    return url;
};