import React, { useState } from 'react';
import { Topic, DifficultyLevel } from '../types';
import {
  Sparkles,
  Layers,
  ChevronRight,
  BookOpen,
  Award,
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  HelpCircle,
  Play
} from 'lucide-react';

interface MainPageProps {
  topics: Topic[];
  completedTopicIds: string[];
  onSelectTopic: (topic: Topic) => void;
  onOpenTopicPrompt: (topic: Topic) => void;
}

export const MainPage: React.FC<MainPageProps> = ({
  topics,
  completedTopicIds,
  onSelectTopic,
  onOpenTopicPrompt
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [showMethodGuide, setShowMethodGuide] = useState(false);

  const filteredTopics = topics.filter((t) => {
    if (selectedDifficulty === 'all') return true;
    return t.difficulty === selectedDifficulty;
  });

  const getDifficultyBadge = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case 'beginner':
        return {
          label: 'Beginner',
          classes: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500'
        };
      case 'intermediate':
        return {
          label: 'Intermediate',
          classes: 'bg-sky-50 text-sky-700 border-sky-200',
          dot: 'bg-sky-500'
        };
      case 'advanced':
        return {
          label: 'Advanced',
          classes: 'bg-purple-50 text-purple-700 border-purple-200',
          dot: 'bg-purple-500'
        };
    }
  };

  const completedCount = completedTopicIds.length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Hero section */}
      <section className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold mb-4 shadow-xs">
          <span className="text-base">🎂</span>
          <span>IELTS Academic Writing Task 1 Methodology</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Build a Cake:{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-600 bg-clip-text text-transparent">
            Body Paragraph Master
          </span>
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
          High-scoring IELTS body paragraphs are built in three deliberate layers. Classify colorless sentence strips
          into topic overviews, precise data, and comparative trends to construct perfect model paragraphs.
        </p>

        {/* 3-Layer Quick Visual pill strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-left mb-6">
          <div className="flex items-start gap-3 p-2 rounded-xl bg-blue-50/50">
            <span className="text-2xl mt-0.5">🔵</span>
            <div>
              <span className="font-bold text-xs uppercase tracking-wider text-blue-900 block">
                Layer 1: Base Tier
              </span>
              <p className="text-xs text-slate-700 font-medium">Topic Sentence</p>
              <p className="text-[11px] text-slate-500">General statement, NO raw numbers</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2 rounded-xl bg-emerald-50/50">
            <span className="text-2xl mt-0.5">🟢</span>
            <div>
              <span className="font-bold text-xs uppercase tracking-wider text-emerald-900 block">
                Layer 2: Filling Tier
              </span>
              <p className="text-xs text-slate-700 font-medium">Specific Figures</p>
              <p className="text-[11px] text-slate-500">Exact data, percentages, and dates</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2 rounded-xl bg-amber-50/50">
            <span className="text-2xl mt-0.5">🟠</span>
            <div>
              <span className="font-bold text-xs uppercase tracking-wider text-amber-900 block">
                Layer 3: Top Tier
              </span>
              <p className="text-xs text-slate-700 font-medium">Comparison / Trend</p>
              <p className="text-[11px] text-slate-500">&ldquo;In contrast&rdquo;, &ldquo;while&rdquo;, trajectories</p>
            </div>
          </div>
        </div>

        {/* Action / Guide Toggle */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setShowMethodGuide(!showMethodGuide)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs"
          >
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>{showMethodGuide ? 'Hide Scoring Guide' : 'How Examiners Score This (Guide)'}</span>
          </button>

          {completedCount > 0 && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{completedCount} of {topics.length} Baked</span>
            </div>
          )}
        </div>
      </section>

      {/* Expandable Examiner Guide */}
      {showMethodGuide && (
        <section className="mb-10 p-6 rounded-3xl bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/50 border border-indigo-100 shadow-sm animate-fade-in">
          <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            Why the &ldquo;Cake Method&rdquo; Secures Band 7.5 to 9.0
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80">
              <span className="font-bold text-indigo-900 block mb-1 text-xs uppercase tracking-wider">
                1. Coherence & Cohesion
              </span>
              Examiners dock marks if paragraphs are random lists of numbers. Layer 1 anchors the reader with a clear group theme before presenting detailed evidence.
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80">
              <span className="font-bold text-indigo-900 block mb-1 text-xs uppercase tracking-wider">
                2. Task Achievement
              </span>
              Band 7+ requires highlighting key features and presenting clear overview statements backed with accurate data points (Layer 2).
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80">
              <span className="font-bold text-indigo-900 block mb-1 text-xs uppercase tracking-wider">
                3. Lexical & Complex Grammatical Range
              </span>
              Layer 3 demonstrates high-level complex sentence structures, comparative clauses, and synthesis markers (&ldquo;whereas&rdquo;, &ldquo;nearly double the rate&rdquo;).
            </div>
          </div>
        </section>
      )}

      {/* Level Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Practice Modules</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Select a topic to start classifying sentences and assembling your paragraph cake.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/70 overflow-x-auto">
          <button
            onClick={() => setSelectedDifficulty('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              selectedDifficulty === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Levels ({topics.length})
          </button>
          <button
            onClick={() => setSelectedDifficulty('beginner')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              selectedDifficulty === 'beginner'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Beginner
          </button>
          <button
            onClick={() => setSelectedDifficulty('intermediate')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              selectedDifficulty === 'intermediate'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Intermediate
          </button>
          <button
            onClick={() => setSelectedDifficulty('advanced')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              selectedDifficulty === 'advanced'
                ? 'bg-white text-purple-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Advanced
          </button>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTopics.map((topic) => {
          const isCompleted = completedTopicIds.includes(topic.id);
          const diffBadge = getDifficultyBadge(topic.difficulty);

          return (
            <div
              key={topic.id}
              className={`group relative bg-white rounded-3xl p-5 sm:p-6 border transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md ${
                isCompleted
                  ? 'border-emerald-200 hover:border-emerald-300'
                  : 'border-slate-200 hover:border-indigo-300'
              }`}
            >
              {/* Card top badges */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${diffBadge.classes}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${diffBadge.dot}`}></span>
                      {diffBadge.label}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {topic.chartType}
                    </span>
                  </div>

                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Baked
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-slate-500">
                      {topic.bandTarget}
                    </span>
                  )}
                </div>

                {/* Topic icon & title */}
                <div className="flex items-start gap-3 mb-2.5">
                  <span className="text-3xl p-2 rounded-2xl bg-slate-50 border border-slate-100 shrink-0">
                    {topic.icon}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-indigo-600 transition-colors">
                      {topic.title}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                  {topic.subtitle}
                </p>

                {/* Meta details */}
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-5 pt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    {topic.strips.length} Sentences
                  </span>
                  <span>•</span>
                  <span>{topic.paragraphNames.length} Paragraphs</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => onOpenTopicPrompt(topic)}
                  className="px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                  title="Preview Chart Prompt and Data"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Prompt</span>
                </button>

                <button
                  onClick={() => onSelectTopic(topic)}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 shadow-xs ${
                    isCompleted
                      ? 'bg-slate-800 hover:bg-slate-900 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isCompleted ? 'Rebake Cake' : 'Start Baking'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
