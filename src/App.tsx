import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { TOPICS, LAYERS_CONFIG } from './data/topics';
import { SentenceStrip, LayerId, Topic } from './types';
import { TopBar } from './components/TopBar';
import { SentenceBank } from './components/SentenceBank';
import { CakeLayers } from './components/CakeLayers';
import { CakeVisualizer } from './components/CakeVisualizer';
import { CompletionModal } from './components/CompletionModal';
import { MainPage } from './components/MainPage';
import { PromptContextModal } from './components/PromptContextModal';
import { sounds } from './utils/audio';
import { BookOpen, Info, ArrowLeft, BarChart3 } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'main' | 'game'>('main');
  const [activeTopic, setActiveTopic] = useState<Topic>(TOPICS[0]);
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ielts_cake_completed_topics');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [previewModalTopic, setPreviewModalTopic] = useState<Topic | null>(null);

  // Game state
  const [bankStrips, setBankStrips] = useState<SentenceStrip[]>([]);
  const [placedStrips, setPlacedStrips] = useState<SentenceStrip[]>([]);
  const [score, setScore] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isGameActive, setIsGameActive] = useState<boolean>(true);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Drag and selection states
  const [draggedStrip, setDraggedStrip] = useState<SentenceStrip | null>(null);
  const [selectedStrip, setSelectedStrip] = useState<SentenceStrip | null>(null);
  const [dragOverLayer, setDragOverLayer] = useState<LayerId | null>(null);
  const [animatingLayer, setAnimatingLayer] = useState<{
    layerId: LayerId;
    status: 'correct' | 'wrong';
  } | null>(null);

  // Status message state
  const [statusMessage, setStatusMessage] = useState<string>('Drag a strip into a layer to begin!');
  const [statusType, setStatusType] = useState<'neutral' | 'success' | 'error'>('neutral');

  // Timer interval ref
  const timerRef = useRef<number | null>(null);

  // Reset/Initialize Game for a specific topic
  const loadTopicGame = useCallback((topic: Topic) => {
    setActiveTopic(topic);
    // Shuffle strips for replay value
    const shuffled = [...topic.strips].sort(() => Math.random() - 0.5);
    setBankStrips(shuffled);
    setPlacedStrips([]);
    setScore(0);
    setMistakes(0);
    setSeconds(0);
    setIsGameActive(true);
    setIsCompleted(false);
    setDraggedStrip(null);
    setSelectedStrip(null);
    setDragOverLayer(null);
    setAnimatingLayer(null);
    setStatusMessage('Drag a sentence strip into its correct layer to begin!');
    setStatusType('neutral');
    setCurrentView('game');
  }, []);

  const handleSelectTopic = (topic: Topic) => {
    loadTopicGame(topic);
  };

  const handlePlayAgain = () => {
    loadTopicGame(activeTopic);
  };

  const handleNextTopic = () => {
    const currentIndex = TOPICS.findIndex((t) => t.id === activeTopic.id);
    const nextIndex = (currentIndex + 1) % TOPICS.length;
    loadTopicGame(TOPICS[nextIndex]);
  };

  const handleBackToMenu = () => {
    setCurrentView('main');
    setIsGameActive(false);
  };

  // Timer effect
  useEffect(() => {
    if (currentView === 'game' && isGameActive && !isCompleted) {
      timerRef.current = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentView, isGameActive, isCompleted]);

  // Trigger celebration confetti
  const launchCelebration = useCallback(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 300);
    } catch {
      // Ignore if canvas confetti not supported in environment
    }
  }, []);

  // Core Drop/Placement handler
  const processPlacement = useCallback(
    (strip: SentenceStrip, targetLayerId: LayerId) => {
      // Check if strip is already placed
      if (placedStrips.some((p) => p.id === strip.id)) {
        setStatusMessage('This strip is already placed!');
        setStatusType('error');
        return;
      }

      if (strip.layer === targetLayerId) {
        // Correct placement
        sounds.playSuccess();
        const nextScore = score + 1;
        setScore(nextScore);
        const nextPlaced = [...placedStrips, strip];
        setPlacedStrips(nextPlaced);
        setBankStrips((prev) => prev.filter((s) => s.id !== strip.id));
        setSelectedStrip(null);
        setDraggedStrip(null);

        // Visual flash on layer
        setAnimatingLayer({ layerId: targetLayerId, status: 'correct' });
        setTimeout(() => setAnimatingLayer(null), 600);

        setStatusMessage(strip.explanation ? `✅ Correct! ${strip.explanation}` : '✅ Correct! Great job!');
        setStatusType('success');

        // Check if finished
        if (nextScore === activeTopic.strips.length) {
          setIsGameActive(false);
          sounds.playFanfare();
          setStatusMessage('🎉 You built the cake! All layers correctly balanced!');

          // Record completion
          setCompletedTopicIds((prev) => {
            if (prev.includes(activeTopic.id)) return prev;
            const updated = [...prev, activeTopic.id];
            try {
              localStorage.setItem('ielts_cake_completed_topics', JSON.stringify(updated));
            } catch {
              // local storage fallback
            }
            return updated;
          });

          setTimeout(() => {
            setIsCompleted(true);
            launchCelebration();
          }, 600);
        }
      } else {
        // Wrong placement
        sounds.playError();
        setMistakes((prev) => prev + 1);

        // Visual shake on layer
        setAnimatingLayer({ layerId: targetLayerId, status: 'wrong' });
        setTimeout(() => setAnimatingLayer(null), 500);

        // Educational hint based on target layer
        let hint = '';
        if (targetLayerId === 1) {
          hint = "Layer 1 must be a broad Topic Sentence without raw statistics.";
        } else if (targetLayerId === 2) {
          hint = 'Layer 2 requires specific data figures, percentages, or dates.';
        } else if (targetLayerId === 3) {
          hint = 'Layer 3 synthesizes comparative trends (e.g. "in contrast", "doubled", "while").';
        }

        setStatusMessage(`❌ Not quite! ${hint}`);
        setStatusType('error');
      }
    },
    [placedStrips, score, activeTopic, launchCelebration]
  );

  // Drag Event Handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, strip: SentenceStrip) => {
    setDraggedStrip(strip);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', strip.id);
  };

  const handleDragEnd = () => {
    setDraggedStrip(null);
    setDragOverLayer(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, layerId: LayerId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverLayer !== layerId) {
      setDragOverLayer(layerId);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    const related = e.relatedTarget as HTMLElement | null;
    if (!related || !e.currentTarget.contains(related)) {
      setDragOverLayer(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, layerId: LayerId) => {
    e.preventDefault();
    setDragOverLayer(null);

    const stripToPlace = draggedStrip || selectedStrip;
    if (stripToPlace) {
      processPlacement(stripToPlace, layerId);
    }
  };

  // Click/Touch placement
  const handleLayerClick = (layerId: LayerId) => {
    if (selectedStrip) {
      processPlacement(selectedStrip, layerId);
    }
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
  };

  // Count placed and expected per layer for visualizer and layers
  const layerCounts: Record<LayerId, number> = {
    1: placedStrips.filter((s) => s.layer === 1).length,
    2: placedStrips.filter((s) => s.layer === 2).length,
    3: placedStrips.filter((s) => s.layer === 3).length
  };

  const expectedPerLayer: Record<LayerId, number> = {
    1: activeTopic.strips.filter((s) => s.layer === 1).length,
    2: activeTopic.strips.filter((s) => s.layer === 2).length,
    3: activeTopic.strips.filter((s) => s.layer === 3).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-[#eef2ff] to-[#f5f3ff] p-3 sm:p-6 text-slate-800">
      {currentView === 'main' ? (
        <main className="container max-w-6xl mx-auto bg-white/95 rounded-3xl shadow-xl border border-slate-200/80 transition-all">
          <MainPage
            topics={TOPICS}
            completedTopicIds={completedTopicIds}
            onSelectTopic={handleSelectTopic}
            onOpenTopicPrompt={(topic) => setPreviewModalTopic(topic)}
          />
        </main>
      ) : (
        <main className="container max-w-6xl mx-auto bg-white rounded-3xl p-4 sm:p-8 shadow-2xl transition-all">
          {/* Top Bar Navigation & Stats */}
          <TopBar
            score={score}
            mistakes={mistakes}
            total={activeTopic.strips.length}
            timeSeconds={seconds}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            onReset={handlePlayAgain}
            onBackToMenu={handleBackToMenu}
            onOpenPrompt={() => setPreviewModalTopic(activeTopic)}
          />

          {/* Active Topic Header Banner */}
          <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="text-3xl p-2 bg-white rounded-2xl border border-indigo-100 shrink-0">
                {activeTopic.icon}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-600 text-white">
                    {activeTopic.chartType}
                  </span>
                  <span className="text-[11px] font-semibold capitalize px-2 py-0.5 rounded-full bg-white text-slate-700 border border-indigo-200">
                    {activeTopic.difficulty} Level
                  </span>
                  <span className="text-[11px] font-medium text-slate-500">
                    Target: {activeTopic.bandTarget}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {activeTopic.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 line-clamp-1">
                  {activeTopic.subtitle}
                </p>
              </div>
            </div>

            <button
              onClick={() => setPreviewModalTopic(activeTopic)}
              className="self-start md:self-center inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-indigo-200 text-indigo-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              <BarChart3 className="w-4 h-4 text-indigo-600" />
              <span>View Prompt & Data</span>
            </button>
          </div>

          {/* Cake Stack Mini Progress Bar */}
          <div className="mb-6">
            <CakeVisualizer
              layerCounts={layerCounts}
              expectedPerLayer={expectedPerLayer}
              totalStrips={activeTopic.strips.length}
              isCompleted={score === activeTopic.strips.length}
            />
          </div>

          {/* Main 2-Column Layout */}
          <div className="main-layout grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
            {/* Left Column: Colorless Sentence Bank */}
            <SentenceBank
              strips={bankStrips}
              selectedStripId={selectedStrip?.id || null}
              onSelectStrip={setSelectedStrip}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />

            {/* Right Column: Cake Layers */}
            <CakeLayers
              layers={LAYERS_CONFIG}
              placedStrips={placedStrips}
              expectedPerLayer={expectedPerLayer}
              dragOverLayer={dragOverLayer}
              animatingLayer={animatingLayer}
              selectedStrip={selectedStrip}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onLayerClick={handleLayerClick}
            />
          </div>

          {/* Status Message Banner */}
          <div
            id="status"
            className={`status text-center p-3.5 sm:p-4 rounded-2xl mt-6 font-semibold text-xs sm:text-sm transition-all duration-300 shadow-xs ${
              statusType === 'success'
                ? 'bg-emerald-600 text-white animate-pulse-green'
                : statusType === 'error'
                ? 'bg-rose-600 text-white animate-shake'
                : 'bg-slate-100 text-slate-700'
            }`}
            role="status"
            aria-live="polite"
          >
            {statusMessage}
          </div>

          {/* Academic IELTS Writing Context Footer */}
          <footer className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Info className="w-4 h-4 text-slate-400" />
              <span>IELTS Academic Writing Task 1: 3-Layer Body Paragraph Strategy</span>
            </div>
            <span>Layer 1: Topic Sentences • Layer 2: Specific Figures • Layer 3: Comparisons</span>
          </footer>
        </main>
      )}

      {/* Completion Celebration Modal */}
      <CompletionModal
        isOpen={isCompleted}
        score={score}
        mistakes={mistakes}
        timeSeconds={seconds}
        placedStrips={placedStrips}
        topicTitle={activeTopic.title}
        onPlayAgain={handlePlayAgain}
        onNextTopic={handleNextTopic}
        onBackToMenu={handleBackToMenu}
      />

      {/* IELTS Chart Prompt & Data Context Modal */}
      {previewModalTopic && (
        <PromptContextModal
          topic={previewModalTopic}
          isOpen={true}
          onClose={() => setPreviewModalTopic(null)}
        />
      )}
    </div>
  );
}
