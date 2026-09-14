import React from 'react';
import { SentenceStrip } from '../types';
import { GripVertical, MousePointerClick, Check } from 'lucide-react';

interface SentenceBankProps {
  strips: SentenceStrip[];
  selectedStripId: string | null;
  onSelectStrip: (strip: SentenceStrip | null) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, strip: SentenceStrip) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const SentenceBank: React.FC<SentenceBankProps> = ({
  strips,
  selectedStripId,
  onSelectStrip,
  onDragStart,
  onDragEnd
}) => {
  const getStripClasses = (isSelected: boolean) => {
    const base = 'bg-white text-slate-800 border border-slate-200 hover:border-slate-300 hover:bg-slate-50/60';

    if (isSelected) {
      return `${base} ring-2 ring-slate-800 ring-offset-2 border-slate-400 bg-slate-50 scale-[1.01] shadow-md font-medium`;
    }
    return `${base} shadow-xs hover:shadow-md`;
  };

  return (
    <div
      id="bank-container"
      className="bg-slate-50/80 rounded-2xl p-5 border-2 border-dashed border-slate-300 min-h-[420px] flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <span>📝</span> Sentence Bank
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Drag a strip or tap to select, then place in a layer.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200/80 text-slate-700">
            {strips.length} remaining
          </span>
        </div>

        {/* Selected strip alert for touch / click users */}
        {selectedStripId && (
          <div className="mb-3 px-3 py-2 bg-slate-200/90 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 flex items-center justify-between animate-fade-in">
            <span className="flex items-center gap-1.5">
              <MousePointerClick className="w-4 h-4 text-slate-700 animate-pulse" />
              Sentence selected! Now tap your target layer on the right.
            </span>
            <button
              onClick={() => onSelectStrip(null)}
              className="text-[11px] underline text-slate-700 hover:text-slate-950 font-semibold cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Sentence list */}
        <div id="bank" className="space-y-3">
          {strips.map((strip) => {
            const isSelected = selectedStripId === strip.id;
            return (
              <div
                key={strip.id}
                id={`strip-${strip.id}`}
                data-id={strip.id}
                data-layer={strip.layer}
                draggable
                onDragStart={(e) => onDragStart(e, strip)}
                onDragEnd={onDragEnd}
                onClick={() => {
                  if (isSelected) {
                    onSelectStrip(null);
                  } else {
                    onSelectStrip(strip);
                  }
                }}
                className={`strip group relative p-3.5 sm:p-4 rounded-xl cursor-grab active:cursor-grabbing select-none transition-all duration-200 ${getStripClasses(
                  isSelected
                )}`}
              >
                <div className="flex items-start gap-2.5">
                  <span className="text-slate-400 group-hover:text-slate-600 mt-0.5 shrink-0 transition-colors">
                    <GripVertical className="w-4 h-4" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm sm:text-[14.5px] leading-relaxed font-normal text-slate-800">
                      {strip.text}
                    </p>
                  </div>
                  {isSelected && (
                    <span className="shrink-0 p-1 bg-slate-800 text-white rounded-full">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {strips.length === 0 && (
            <div className="text-center py-12 px-4 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/50">
              <span className="text-3xl">🎉</span>
              <h4 className="font-semibold text-emerald-800 mt-2 text-base">
                All sentences placed!
              </h4>
              <p className="text-xs text-emerald-600 mt-1 max-w-xs mx-auto">
                All 6 sentence strips have been assigned to their proper cake layers.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-slate-500 flex items-center justify-between">
        <span>💡 Tip: Check for numbers vs general statements</span>
        <span>Drag or Tap</span>
      </div>
    </div>
  );
};
