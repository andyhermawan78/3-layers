import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { LayerId } from '../types';

interface CakeVisualizerProps {
  layerCounts: Record<LayerId, number>;
  expectedPerLayer?: Record<LayerId, number>;
  totalStrips: number;
  isCompleted: boolean;
}

export const CakeVisualizer: React.FC<CakeVisualizerProps> = ({
  layerCounts,
  expectedPerLayer,
  totalStrips,
  isCompleted
}) => {
  const layer3Count = layerCounts[3] || 0;
  const layer2Count = layerCounts[2] || 0;
  const layer1Count = layerCounts[1] || 0;

  const target3 = expectedPerLayer?.[3] ?? Math.max(1, Math.round(totalStrips / 3));
  const target2 = expectedPerLayer?.[2] ?? Math.max(1, Math.round(totalStrips / 3));
  const target1 = expectedPerLayer?.[1] ?? Math.max(1, Math.round(totalStrips / 3));

  const totalPlaced = layer1Count + layer2Count + layer3Count;

  return (
    <div className="bg-gradient-to-b from-indigo-50/70 to-purple-50/50 border border-indigo-100 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center relative overflow-hidden shadow-xs">
      <div className="flex items-center justify-between w-full mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎂</span>
          <h4 className="font-semibold text-slate-800 text-sm tracking-wide uppercase">
            Cake Construction Status
          </h4>
        </div>
        <div className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-100/80 text-indigo-700 flex items-center gap-1.5">
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-semibold text-emerald-700">Cake Baked!</span>
            </>
          ) : (
            <>
              <span>{totalPlaced} / {totalStrips} Layers</span>
            </>
          )}
        </div>
      </div>

      {/* Visual 3D styled Cake Tier Stack */}
      <div className="relative flex flex-col items-center justify-end w-full max-w-[290px] h-[130px] pt-2">
        {/* Cake Topper / Cherry / Sparkles */}
        <div className="h-6 flex items-center justify-center transition-all duration-500">
          {isCompleted ? (
            <div className="flex items-center gap-1 text-amber-500 animate-bounce">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-lg">🍒</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
          ) : layer3Count > 0 ? (
            <div className="text-xs text-amber-600 font-medium bg-amber-100/90 px-2 py-0.5 rounded-full border border-amber-200">
              {layer3Count >= target3 ? '🍒 Ready for Topping' : 'Glazing in progress...'}
            </div>
          ) : null}
        </div>

        {/* Tier 3: Top Layer (Comparison / Trend) */}
        <div
          className={`w-38 sm:w-40 h-8 rounded-t-xl flex items-center justify-between px-3 border transition-all duration-500 text-xs font-semibold ${
            layer3Count >= target3
              ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-md scale-100'
              : layer3Count > 0
              ? 'bg-amber-200/90 text-amber-900 border-amber-300 border-dashed'
              : 'bg-slate-100 text-slate-400 border-slate-200 border-dashed opacity-50'
          }`}
        >
          <span className="truncate">Top: Comparison</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/60">
            {layer3Count}/{target3}
          </span>
        </div>

        {/* Tier 2: Middle Layer (Specific Data) */}
        <div
          className={`w-48 sm:w-52 h-9 rounded-t-lg flex items-center justify-between px-3.5 border transition-all duration-500 text-xs font-semibold ${
            layer2Count >= target2
              ? 'bg-emerald-400 text-emerald-950 border-emerald-500 shadow-md scale-100'
              : layer2Count > 0
              ? 'bg-emerald-200/90 text-emerald-900 border-emerald-300 border-dashed'
              : 'bg-slate-100 text-slate-400 border-slate-200 border-dashed opacity-50'
          }`}
        >
          <span className="truncate">Middle: Data & Stats</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/60">
            {layer2Count}/{target2}
          </span>
        </div>

        {/* Tier 1: Base Layer (Topic Sentence) */}
        <div
          className={`w-60 sm:w-64 h-10 rounded-t-md flex items-center justify-between px-4 border transition-all duration-500 text-xs font-semibold ${
            layer1Count >= target1
              ? 'bg-blue-400 text-blue-950 border-blue-500 shadow-md scale-100'
              : layer1Count > 0
              ? 'bg-blue-200/90 text-blue-900 border-blue-300 border-dashed'
              : 'bg-slate-100 text-slate-400 border-slate-200 border-dashed opacity-50'
          }`}
        >
          <span className="truncate">Base: Topic Sentence</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/60">
            {layer1Count}/{target1}
          </span>
        </div>

        {/* Cake Stand / Plate */}
        <div className="w-72 h-2.5 bg-slate-300 rounded-full shadow-inner mt-0.5"></div>
      </div>
    </div>
  );
};
