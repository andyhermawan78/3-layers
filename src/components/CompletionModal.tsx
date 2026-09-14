import React, { useState } from 'react';
import {
  RotateCcw,
  BookOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  LayoutGrid,
  X
} from 'lucide-react';
import { SentenceStrip } from '../types';

interface CompletionModalProps {
  isOpen: boolean;
  score: number;
  mistakes: number;
  timeSeconds: number;
  placedStrips: SentenceStrip[];
  topicTitle: string;
  onPlayAgain: () => void;
  onNextTopic?: () => void;
  onBackToMenu: () => void;
  onClose?: () => void;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  score,
  mistakes,
  timeSeconds,
  placedStrips,
  topicTitle,
  onPlayAgain,
  onNextTopic,
  onBackToMenu,
  onClose
}) => {
  const [showFullEssay, setShowFullEssay] = useState(false);

  if (!isOpen) return null;

  const formatTime = (totalSec: number) => {
    const mins = String(Math.floor(totalSec / 60)).padStart(2, '0');
    const secs = String(totalSec % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Group placed strips by their unique paragraph names
  const uniqueParagraphs = Array.from(new Set(placedStrips.map((s) => s.paragraph)));

  return (
    <div
      id="modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) {
          onClose();
        }
      }}
    >
      <div
        id="modal-card"
        className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl border border-slate-100 transform transition-all animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
      >
        {/* Close X button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Cake celebration graphic */}
        <div className="w-20 h-20 mx-auto mb-3 bg-amber-50 rounded-full flex items-center justify-center border-2 border-amber-200 shadow-inner">
          <span className="text-5xl select-none" role="img" aria-label="birthday cake">
            🎂
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-1">
          Master Baker!
        </h2>
        <p className="text-xs sm:text-sm font-medium text-indigo-600 mb-2">
          {topicTitle}
        </p>
        <p className="text-slate-600 text-xs sm:text-sm mb-5 leading-relaxed">
          You assembled the complete 3-Layer Cake! All topic sentences, exact data points, and comparison trends are in harmony.
        </p>

        {/* Stats card */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-5 grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Correct
            </span>
            <strong id="finalScore" className="text-xl font-bold text-emerald-600 mt-1">
              {score}
            </strong>
          </div>

          <div className="flex flex-col items-center border-x border-slate-200">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-rose-500" /> Mistakes
            </span>
            <strong id="finalMistakes" className="text-xl font-bold text-rose-600 mt-1">
              {mistakes}
            </strong>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-sky-500" /> Time
            </span>
            <strong id="finalTime" className="text-xl font-bold text-sky-600 font-mono mt-1">
              {formatTime(timeSeconds)}
            </strong>
          </div>
        </div>

        {/* Toggle full essay review */}
        <div className="mb-5 text-left">
          <button
            onClick={() => setShowFullEssay(!showFullEssay)}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100/70 text-indigo-700 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {showFullEssay ? 'Hide Constructed Paragraphs' : 'Read Assembled IELTS Body Paragraphs'}
            </span>
            <span>{showFullEssay ? '▲' : '▼'}</span>
          </button>

          {showFullEssay && (
            <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm leading-relaxed space-y-4 max-h-56 overflow-y-auto">
              {uniqueParagraphs.map((pName, idx) => {
                const pStrips = placedStrips
                  .filter((s) => s.paragraph === pName)
                  .sort((a, b) => a.layer - b.layer);

                return (
                  <div key={pName} className={idx > 0 ? 'pt-3 border-t border-slate-200' : ''}>
                    <span className="font-bold text-indigo-900 block mb-1.5 text-xs uppercase tracking-wider">
                      {pName}
                    </span>
                    <div className="space-y-1">
                      {pStrips.map((strip) => (
                        <p key={strip.id} className="text-slate-700 text-xs sm:text-sm">
                          <span className="inline-block mr-1 font-semibold text-slate-500 text-[11px]">
                            [L{strip.layer}]
                          </span>
                          {strip.text}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
          {onNextTopic && (
            <button
              onClick={onNextTopic}
              className="w-full sm:flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Next Topic</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            id="btn-play-again"
            onClick={onPlayAgain}
            className="w-full sm:flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay</span>
          </button>

          <button
            onClick={onBackToMenu}
            className="w-full sm:flex-1 px-4 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
          >
            <LayoutGrid className="w-4 h-4" />
            <span>All Topics</span>
          </button>
        </div>
      </div>
    </div>
  );
};
