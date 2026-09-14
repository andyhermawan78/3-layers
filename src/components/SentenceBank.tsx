import React from 'react';
import { SentenceStrip, LayerId } from '../types';
import { GripVertical, MousePointerClick, Check, Layers } from 'lucide-react';

interface SentenceBankProps {
  strips: SentenceStrip[];
  selectedStripId: string | null;
  onSelectStrip: (strip: SentenceStrip | null) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, strip: SentenceStrip) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onPlaceDirectly?: (strip: SentenceStrip, layerId: LayerId) => void;
}

export const SentenceBank: React.FC<SentenceBankProps> = ({
  strips,
  selectedStripId,
  onSelectStrip,
  onDragStart,
  onDragEnd,
  onPlaceDirectly
}) => {
  const getStripClasses = (isSelected: boolean) => {
    const base = 'bg-white text-slate-800 border border-slate-200 hover:border-slate-300 hover:bg-slate-50/70';

    if (isSelected) {
      return `${base} ring-2 ring-indigo-600 ring-offset-1 border-indigo-400 bg-indigo-50/40 shadow-md font-medium`;
    }
    return `${base} shadow-xs hover:shadow-sm`;
  };

  return (
    <div
      id="bank-container"
      className="bg-slate-50/90 rounded-2xl p-4 sm:p-5 border-2 border-dashed border-slate-300 min-h-[420px] flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <span>📝</span> Sentence Bank
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Drag a strip or tap to select & place in a layer.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200 text-slate-700">
            {strips.length} remaining
          </span>
        </div>

        {/* Selected strip alert for touch / click users */}
        {selectedStripId && (
          <div className="mb-3 px-3.5 py-2.5 bg-indigo-50 border border-indigo-200 rounded-xl text-xs font-medium text-indigo-900 flex items-center justify-between animate-fade-in">
            <span className="flex items-center gap-2">
              <MousePointerClick className="w-4 h-4 text-indigo-600 animate-bounce" />
              <span>Sentence selected! Choose a layer below or tap on the right.</span>
            </span>
            <button
              onClick={() => onSelectStrip(null)}
              className="text-[11px] underline text-indigo-700 hover:text-indigo-950 font-bold cursor-pointer ml-2 whitespace-nowrap"
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
                className={`strip group relative p-3.5 sm:p-4 rounded-xl cursor-grab active:cursor-grabbing select-none transition-all duration-150 ${getStripClasses(
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
                    <span className="shrink-0 p-1 bg-indigo-600 text-white rounded-full shadow-2xs">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                {/* Direct quick placement shortcut buttons when strip is selected */}
                {isSelected && onPlaceDirectly && (
                  <div
                    className="mt-3 pt-2.5 border-t border-indigo-100 flex flex-wrap items-center gap-1.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-[11px] font-semibold text-slate-500 mr-1 flex items-center gap-1">
                      <Layers className="w-3 h-3 text-indigo-500" /> Send to:
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlaceDirectly(strip, 1);
                      }}
                      className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition-colors cursor-pointer"
                    >
                      Layer 1 (Topic)
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlaceDirectly(strip, 2);
                      }}
                      className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 transition-colors cursor-pointer"
                    >
                      Layer 2 (Data)
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlaceDirectly(strip, 3);
                      }}
                      className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-900 border border-sky-300 transition-colors cursor-pointer"
                    >
                      Layer 3 (Compare)
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {strips.length === 0 && (
            <div className="text-center py-10 px-4 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/50">
              <span className="text-3xl">🎉</span>
              <h4 className="font-semibold text-emerald-800 mt-2 text-base">
                All sentences placed!
              </h4>
              <p className="text-xs text-emerald-600 mt-1 max-w-xs mx-auto">
                All sentence strips for this topic have been successfully assigned.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-slate-500 flex items-center justify-between">
        <span>💡 Tap or drag strip into its matching layer</span>
        <span className="font-medium text-slate-600">L1 • L2 • L3</span>
      </div>
    </div>
  );
};
