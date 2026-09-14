import React from 'react';
import { Topic } from '../types';
import { X, BarChart3, HelpCircle, Target, CheckCircle2 } from 'lucide-react';

interface PromptContextModalProps {
  topic: Topic;
  isOpen: boolean;
  onClose: () => void;
}

export const PromptContextModal: React.FC<PromptContextModalProps> = ({
  topic,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-xl w-full shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{topic.icon}</span>
            <div>
              <h3 className="font-bold text-slate-800 text-base sm:text-lg">{topic.title}</h3>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-medium text-indigo-600">{topic.chartType}</span>
                <span>•</span>
                <span className="capitalize font-medium">{topic.difficulty} Level</span>
                <span>•</span>
                <span>Target {topic.bandTarget}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prompt description */}
        <div className="my-4 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-1 flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
            Official IELTS Task 1 Prompt
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
            &ldquo;{topic.prompt}&rdquo;
          </p>
        </div>

        {/* Data summary table */}
        <div className="mb-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Key Chart Figures & Highlights
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {topic.chartDataSummary.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="text-xs font-medium text-slate-600">{item.label}</span>
                  <span className="text-xs font-bold text-indigo-700">{item.value}</span>
                </div>
                {item.subtext && (
                  <span className="text-[11px] text-slate-400 mt-1">{item.subtext}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Why the 3-Layer Cake Works */}
        <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-amber-950 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-amber-900">
            <Target className="w-4 h-4 text-amber-600" />
            <span>Examiner Scoring Tip</span>
          </div>
          <p className="leading-relaxed text-[12px] text-slate-700">
            IELTS examiners award Band 7+ when body paragraphs follow a clear organizational hierarchy:
            an overview claim (Layer 1), supported by verified data (Layer 2), elevated with comparison markers and trends (Layer 3).
          </p>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer"
          >
            Got It, Back to Practice
          </button>
        </div>
      </div>
    </div>
  );
};
