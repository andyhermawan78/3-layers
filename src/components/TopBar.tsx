import React from 'react';
import {
  RotateCcw,
  Volume2,
  VolumeX,
  CheckCircle,
  AlertTriangle,
  Clock,
  ArrowLeft,
  BarChart3
} from 'lucide-react';

interface TopBarProps {
  score: number;
  mistakes: number;
  total: number;
  timeSeconds: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onReset: () => void;
  onBackToMenu?: () => void;
  onOpenPrompt?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  score,
  mistakes,
  total,
  timeSeconds,
  soundEnabled,
  onToggleSound,
  onReset,
  onBackToMenu,
  onOpenPrompt
}) => {
  const formatTime = (totalSec: number) => {
    const mins = String(Math.floor(totalSec / 60)).padStart(2, '0');
    const secs = String(totalSec % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <header
      id="game-top-bar"
      className="flex flex-wrap items-center justify-between gap-3 bg-slate-800 text-white px-4 sm:px-6 py-3 rounded-2xl shadow-md mb-6"
    >
      <div className="flex flex-wrap items-center gap-3 sm:gap-5">
        {/* Back to main menu button */}
        {onBackToMenu && (
          <button
            onClick={onBackToMenu}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-700/80 hover:bg-slate-700 text-slate-200 hover:text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer mr-1"
            title="Return to Main Menu"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">All Topics</span>
          </button>
        )}

        {/* Correct score */}
        <div id="stat-score" className="flex items-center gap-1.5 text-xs sm:text-sm font-medium">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-300">Correct:</span>
          <strong id="score" className="text-amber-300 font-bold text-base sm:text-lg">
            {score}
          </strong>
          <span className="text-slate-400">/ {total}</span>
        </div>

        {/* Mistakes count */}
        <div id="stat-mistakes" className="flex items-center gap-1.5 text-xs sm:text-sm font-medium">
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          <span className="text-slate-300">Mistakes:</span>
          <strong id="mistakes" className="text-rose-400 font-bold text-base sm:text-lg">
            {mistakes}
          </strong>
        </div>

        {/* Timer */}
        <div id="stat-timer" className="flex items-center gap-1.5 text-xs sm:text-sm font-medium">
          <Clock className="w-4 h-4 text-sky-400" />
          <span className="text-slate-300">Time:</span>
          <strong id="timer" className="text-sky-300 font-mono font-bold text-base sm:text-lg">
            {formatTime(timeSeconds)}
          </strong>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Open chart prompt modal */}
        {onOpenPrompt && (
          <button
            onClick={onOpenPrompt}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            title="View IELTS Chart Data & Prompt"
          >
            <BarChart3 className="w-4 h-4" />
            <span className="hidden md:inline">Prompt & Data</span>
          </button>
        )}

        {/* Audio Mute / Unmute */}
        <button
          id="btn-sound-toggle"
          onClick={onToggleSound}
          className="p-2 rounded-xl bg-slate-700/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          aria-label={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {/* Reset Button */}
        <button
          id="btn-reset"
          onClick={onReset}
          className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-semibold px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl transition-all shadow-xs cursor-pointer text-xs sm:text-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>
    </header>
  );
};
