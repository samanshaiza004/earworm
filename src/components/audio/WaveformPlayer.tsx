import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, Volume2 } from 'lucide-react';

interface WaveformPlayerProps {
  url: string;
  waveformData?: number[];
}

export function WaveformPlayer({ url, waveformData }: WaveformPlayerProps) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4f46e5',
        progressColor: '#818cf8',
        cursorColor: '#312e81',
        barWidth: 2,
        barRadius: 3,
        cursorWidth: 1,
        height: 80,
        barGap: 2,
      });

      wavesurfer.current.load(url);

      return () => {
        wavesurfer.current?.destroy();
      };
    }
  }, [url]);

  const togglePlayPause = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={togglePlayPause}
          className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <div className="flex items-center space-x-2">
          <Volume2 className="w-5 h-5 text-gray-600" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            defaultValue="1"
            className="w-24"
            onChange={(e) => wavesurfer.current?.setVolume(parseFloat(e.target.value))}
          />
        </div>
      </div>
      <div ref={waveformRef} />
    </div>
  );
}