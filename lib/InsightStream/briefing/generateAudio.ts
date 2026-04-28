import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

const uploadAudio = async (
    audioBuffer: ArrayBuffer,
    projectId: string,
    briefingId: string
): Promise<string> => {
    const filePath = `${projectId}/${briefingId}.mp3`;

    const { error } = await supabaseAdmin.storage.from("Audios").upload(filePath, Buffer.from(audioBuffer), {
        contentType: "audio/mpeg",
        upsert: true,
    });

    if(error) {
        console.error("Error uploading audio:", error);
        throw new Error("Failed to upload audio");
    };

    const {
        data: { publicUrl },
    } = supabaseAdmin.storage.from("Audios").getPublicUrl(filePath);

    return publicUrl;
};

export const generateBriefingAudio = async (text: string, projectId: string) => {
    const response = await fetch(
        "https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB",
        {
            method: "POST",
            headers: {
                "xi-api-key": process.env.ELEVENLABS_API_KEY!,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: text,
                model_id: "eleven_multilingual_v2",
                voice_settings: {
                    stability: 0.75,
                    similarity_boost: 0.85,
                    style: 0.4,
                    use_speaker_boost: true
                }
            })
        }
    );
  
    if (!response.ok) {
        throw new Error("TTS request failed");
    }
  
    const audioBuffer = await response.arrayBuffer();
    const briefingId = crypto.randomUUID(); // Replace with actual briefing ID

    console.log('res ....', response.ok);
  
    // Upload to storage (Supabase / S3)
    const url = await uploadAudio(audioBuffer, projectId, briefingId);
  
    return url;
};