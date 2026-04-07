'use client';

import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Play, Pause } from "lucide-react";

export default function BriefingAudioPlayer({ audioUrl }: { audioUrl: string }) {
    const waveformRef = useRef(null);
    const wavesurferRef = useRef<WaveSurfer | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if (!waveformRef.current) return;

        const ws = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: "#000",
            progressColor: "#6366f1",
            barWidth: 2,
            height: 64,
        });

        wavesurferRef.current = ws;

        try {
            ws.load(audioUrl);
        } catch (err) {
            console.error("Audio failed to load", err);
        }

        ws.on("ready", () => {
            setDuration(ws.getDuration());
        });

        ws.on("audioprocess", () => {
            setCurrentTime(ws.getCurrentTime());
        });

        wavesurferRef.current.on("finish", () => {
            setIsPlaying(false);
        });

        return () => wavesurferRef.current?.destroy();
    }, [audioUrl]);

    const togglePlay = () => {
        wavesurferRef.current?.playPause();
        setIsPlaying(!isPlaying);
    };

    const changeSpeed = (rate: number) => {
        setPlaybackRate(rate);
        wavesurferRef.current?.setPlaybackRate(rate);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    return (
    <div className="w-full max-w-2xl mx-auto bg-[#3d3d3d] rounded-2xl shadow col-span-2 p-4 space-y-4">
        <div ref={waveformRef} className="w-full" />

        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button
                    onClick={togglePlay}
                    className="p-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >{isPlaying ? <Pause size={18} /> : <Play size={18} />}</button>

                <span className="text-sm text-gray-500">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </span>
            </div>

            <div className="flex items-center gap-2">
                {
                    [0.75, 1, 1.25, 1.5].map((rate) => (
                        <button
                            key={rate}
                            onClick={() => changeSpeed(rate)}
                            className={`px-3 py-1 rounded-lg text-sm border ${
                            playbackRate === rate
                                ? "bg-indigo-600 text-white border-indigo-600"
                                : "border-gray-300 text-gray-300"
                            }`}
                        >
                            {rate}x
                        </button>
                    ))
                }
            </div>
        </div>
    </div>
  );
}
