import React from 'react';
import { LayerDefinition, LayerId, SentenceStrip } from '../types';
import { HelpCircle, CheckCircle, Sparkles } from 'lucide-react';

interface CakeLayersProps {
  layers: LayerDefinition[];
  placedStrips: SentenceStrip[];
  expectedPerLayer: Record<LayerId, number>;
  dragOverLayer: LayerId | null;
  animatingLayer: { layerId: LayerId; status: 'correct' | 'wrong' } | null;
  selectedStrip: SentenceStrip | null;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, layerId: LayerId) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, layerId: LayerId) => void;
  onLayerClick: (layerId: LayerId) => void;
}

export const CakeLayers: React.FC<CakeLayersProps> = ({
  layers,
  placedStrips,
  expectedPerLayer,
  dragOverLayer,
  animatingLayer,
  selectedStrip,
  onDragOver,
  onDragLeave,
  onDrop,
  onLayerClick
}) => {
  return (
    <div id="cake-layers-container" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span>🎂</span> Cake Layers (Drop Zones)
        </h2>
        {selectedStrip && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 animate-pulse">
            Select a layer below to place
          </span>
        )}
      </div>

      {layers.map((layer) => {
        const placedInThisLayer = placedStrips.filter((s) => s.layer === layer.id);
        const targetCount = expectedPerLayer[layer.id] || 2;
        const isDragOver = dragOverLayer === layer.id;
        const animationState = animatingLayer?.layerId === layer.id ? animatingLayer.status : null;
        const isLayerFull = placedInThisLayer.length >= targetCount;

        // Custom subtle layer border and background styling
        let borderAndBgClass = 'border-slate-300 bg-white/70 hover:bg-white';
        if (layer.id === 1) {
          borderAndBgClass = 'border-amber-300/80 bg-amber-50/40 hover:bg-amber-50/60';
        } else if (layer.id === 2) {
          borderAndBgClass = 'border-emerald-300/80 bg-emerald-50/40 hover:bg-emerald-50/60';
        } else if (layer.id === 3) {
          borderAndBgClass = 'border-sky-300/80 bg-sky-50/40 hover:bg-sky-50/60';
        }

        const isWrong = animationState === 'wrong';
        const isCorrect = animationState === 'correct';

        return (
          <div
            key={layer.id}
            id={`layer${layer.id}`}
            data-layer={layer.id}
            onClick={() => onLayerClick(layer.id)}
            onDragOver={(e) => onDragOver(e, layer.id)}
            onDragLeave={onDragLeave}
            onDrop={(e) => onDrop(e, layer.id)}
            className={`layer relative rounded-2xl p-4 sm:p-5 transition-all duration-200 border-2 border-dashed ${
              selectedStrip
                ? 'cursor-pointer hover:border-solid hover:ring-2 hover:ring-indigo-400 hover:shadow-md'
                : ''
            } ${borderAndBgClass} ${
              isDragOver ? 'drag-over scale-[1.01] ring-4 ring-indigo-400/50 bg-indigo-50/50 border-solid border-indigo-500' : ''
            } ${isCorrect ? 'animate-pulse-green border-solid !border-emerald-600 ring-2 ring-emerald-400' : ''} ${
              isWrong ? 'animate-shake !border-rose-500 !border-solid ring-2 ring-rose-300' : ''
            }`}
          >
            {/* Header / Title */}
            <div className="flex items-center justify-between mb-1.5 pointer-events-none">
              <div className="layer-title font-bold text-base sm:text-lg text-slate-800 flex items-center gap-2">
                <span className="emoji text-xl">{layer.emoji}</span>
                <span>{layer.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white/90 text-slate-700 border border-slate-200 shadow-2xs">
                  {placedInThisLayer.length} / {targetCount} Stored
                </span>
                {isLayerFull && (
                  <span className="text-emerald-600" title="Layer complete!">
                    <CheckCircle className="w-4 h-4" />
                  </span>
                )}
              </div>
            </div>

            {/* Hint & Cake Meta */}
            <div className="flex flex-wrap items-center justify-between gap-1 mb-2.5 pointer-events-none">
              <div className="layer-hint text-xs sm:text-[13px] text-slate-600 italic flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 inline" />
                <span>{layer.hint}</span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
                Cake Tier: {layer.cakePart}
              </span>
            </div>

            {/* Drop Zone */}
            <div
              id={`drop${layer.id}`}
              data-layer={layer.id}
              onDragOver={(e) => onDragOver(e, layer.id)}
              onDrop={(e) => onDrop(e, layer.id)}
              className="drop-zone min-h-[60px] rounded-xl bg-white/80 border border-slate-200/80 p-2.5 flex flex-col gap-2.5 transition-colors"
            >
              {placedInThisLayer.length === 0 ? (
                <div className="py-4 text-center text-slate-400 italic text-xs sm:text-sm select-none pointer-events-none">
                  {selectedStrip ? (
                    <span className="text-indigo-600 font-semibold not-italic animate-pulse">
                      👉 Click here or drop to place selected sentence
                    </span>
                  ) : (
                    '⬇ Drop the correct strip here'
                  )}
                </div>
              ) : (
                placedInThisLayer.map((strip) => (
                  <div
                    key={strip.id}
                    id={`placed-strip-${strip.id}`}
                    className="placed-strip p-3 sm:p-3.5 rounded-xl text-xs sm:text-[14px] leading-relaxed bg-white border-l-[5px] border-l-emerald-600 text-slate-800 shadow-xs transition-all pointer-events-auto"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="flex-1 font-normal text-slate-800">{strip.text}</p>
                      <span
                        className="shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 max-w-[120px] truncate"
                        title={strip.paragraph}
                      >
                        {strip.paragraph.replace('Paragraph ', 'P')}
                      </span>
                    </div>
                  </div>
                ))
              )}

              {/* Ready feedback when layer target reached */}
              {isLayerFull && (
                <div className="flex items-center justify-end gap-1 text-[11px] text-emerald-700 font-medium pt-0.5 pr-1 pointer-events-none">
                  <Sparkles className="w-3 h-3 text-emerald-500" />
                  <span>Layer complete</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
