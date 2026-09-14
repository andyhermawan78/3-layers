export type LayerId = 1 | 2 | 3;

export type StripColor = 'blue' | 'green' | 'orange' | 'neutral';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface SentenceStrip {
  id: string;
  text: string;
  layer: LayerId; // 1: Topic Sentence, 2: Specific Data, 3: Comparison/Trend
  color: StripColor;
  paragraph: string;
  roleLabel: string;
  explanation?: string;
  isDistractor?: boolean;
}

export interface PlacedSentence {
  id: string;
  strip: SentenceStrip;
  placedAt: number;
}

export interface LayerDefinition {
  id: LayerId;
  name: string;
  emoji: string;
  hint: string;
  description: string;
  cakePart: string;
  borderColor: string;
  bgColor: string;
  accentColor: string;
}

export interface ChartDatum {
  label: string;
  value: string;
  subtext?: string;
}

export interface Topic {
  id: string;
  title: string;
  subtitle: string;
  chartType: 'Bar Chart' | 'Line Graph' | 'Table' | 'Pie Chart' | 'Mixed Chart';
  difficulty: DifficultyLevel;
  bandTarget: string;
  icon: string;
  colorAccent: string;
  prompt: string;
  chartDataSummary: ChartDatum[];
  paragraphNames: string[];
  strips: SentenceStrip[];
}

