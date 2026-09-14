import { Topic, LayerDefinition } from '../types';

export const LAYERS_CONFIG: LayerDefinition[] = [
  {
    id: 1,
    name: 'Layer 1: Topic Sentence',
    emoji: '🔵',
    hint: 'General statement — NO numbers',
    description: 'Establishes the main idea of the paragraph without bogging down in raw statistics.',
    cakePart: 'Base Sponge Layer',
    borderColor: 'border-blue-400',
    bgColor: 'bg-blue-50/70',
    accentColor: '#2196f3'
  },
  {
    id: 2,
    name: 'Layer 2: Specific Data',
    emoji: '🟢',
    hint: 'Contains exact numbers',
    description: 'Supplies numerical precision and evidence directly from the chart/graph.',
    cakePart: 'Flavor Filling Layer',
    borderColor: 'border-emerald-400',
    bgColor: 'bg-emerald-50/70',
    accentColor: '#4caf50'
  },
  {
    id: 3,
    name: 'Layer 3: Comparison / Trend',
    emoji: '🟠',
    hint: 'Uses "in contrast", "while", "rising from... to..."',
    description: 'Synthesizes contrasts, anomalies, or trajectories to elevate the academic score.',
    cakePart: 'Icing & Cherry Layer',
    borderColor: 'border-amber-400',
    bgColor: 'bg-amber-50/70',
    accentColor: '#ff9800'
  }
];

export const TOPICS: Topic[] = [
  // 1. Topic 1 (Beginner)
  {
    id: 'executive-grades',
    title: 'Gender Distribution in Executive Grades',
    subtitle: 'Proportion of male and female civil servants across five employment tiers.',
    chartType: 'Bar Chart',
    difficulty: 'beginner',
    bandTarget: 'Band 6.5 - 7.0',
    icon: '👔',
    colorAccent: 'indigo',
    prompt:
      'The bar chart illustrates the percentage of male and female employees across five distinct civil service executive grades (A, B, C, D, and E), where Grade A is the most senior and Grade E is the entry-level tier.',
    chartDataSummary: [
      { label: 'Grade E (Lowest)', value: '72% Women vs 28% Men', subtext: 'Entry-level clerical' },
      { label: 'Grade D', value: '55% Women vs 45% Men', subtext: 'Junior executive' },
      { label: 'Grade C', value: '55% Men vs 45% Women', subtext: 'Mid executive' },
      { label: 'Grade B', value: '65% Men vs 35% Women', subtext: 'Senior managerial' },
      { label: 'Grade A (Highest)', value: '92% Men vs 8% Women', subtext: 'Director-General level' }
    ],
    paragraphNames: ['Paragraph 1: Lower Grades (Women Dominate)', 'Paragraph 2: Upper Grades (Men Dominate)'],
    strips: [
      // Paragraph 1 (Women)
      {
        id: 'eg-1',
        text: 'Women held the majority in the two lowest executive grades, E and D.',
        layer: 1,
        color: 'neutral',
        paragraph: 'Paragraph 1: Lower Grades (Women Dominate)',
        roleLabel: 'Topic Sentence',
        explanation: 'Provides an overarching topic sentence identifying female dominance without listing raw numbers.'
      },
      {
        id: 'eg-2',
        text: 'At Grade E, they accounted for 72% of workers, while at Grade D, they represented 55%.',
        layer: 2,
        color: 'neutral',
        paragraph: 'Paragraph 1: Lower Grades (Women Dominate)',
        roleLabel: 'Specific Data',
        explanation: 'Provides the precise percentages (72% and 55%) as documented in the chart.'
      },
      {
        id: 'eg-3',
        text: 'This is in stark contrast to the higher grades, where women were a clear minority.',
        layer: 3,
        color: 'neutral',
        paragraph: 'Paragraph 1: Lower Grades (Women Dominate)',
        roleLabel: 'Comparison / Trend',
        explanation: 'Uses comparative discourse marker "in stark contrast" linking lower vs higher positions.'
      },

      // Paragraph 2 (Men)
      {
        id: 'eg-4',
        text: 'In contrast, men made up the majority in the three highest executive grades, C, B, and A.',
        layer: 1,
        color: 'neutral',
        paragraph: 'Paragraph 2: Upper Grades (Men Dominate)',
        roleLabel: 'Topic Sentence',
        explanation: 'Sets up the counterpart topic sentence about male majority in top tiers without citing numbers.'
      },
      {
        id: 'eg-5',
        text: 'Their representation stood at 55%, 65%, and 92% at Grades C, B, and A respectively.',
        layer: 2,
        color: 'neutral',
        paragraph: 'Paragraph 2: Upper Grades (Men Dominate)',
        roleLabel: 'Specific Data',
        explanation: 'Supplies exact figures in ascending order with the formal modifier "respectively".'
      },
      {
        id: 'eg-6',
        text: 'This represents a clear upward trend, with the figure rising from 55% at Grade C to 92% at Grade A.',
        layer: 3,
        color: 'neutral',
        paragraph: 'Paragraph 2: Upper Grades (Men Dominate)',
        roleLabel: 'Comparison / Trend',
        explanation: 'Highlights the upward trajectory and the dramatic surge across senior ranks.'
      }
    ]
  },

  // 2. Topic 2 (Beginner)
  {
    id: 'household-expenditure',
    title: 'Household Expenditure: UK & France',
    subtitle: 'Proportions of domestic income allocated to living necessities versus lifestyle.',
    chartType: 'Pie Chart',
    difficulty: 'beginner',
    bandTarget: 'Band 7.0',
    icon: '🏠',
    colorAccent: 'blue',
    prompt:
      'The pie charts demonstrate the average percentage of income spent by families in the UK and France across essential necessities (housing and food) versus non-essential lifestyle categories (transport and entertainment).',
    chartDataSummary: [
      { label: 'UK Housing', value: '38%', subtext: 'Highest individual expenditure' },
      { label: 'France Housing', value: '31%', subtext: 'Second highest' },
      { label: 'UK Food & Groceries', value: '22%', subtext: 'Substantial slice' },
      { label: 'France Food & Groceries', value: '25%', subtext: 'Outspent UK families' },
      { label: 'UK Leisure & Transport', value: '40% Combined', subtext: 'Discretionary' },
      { label: 'France Leisure & Transport', value: '44% Combined', subtext: 'Discretionary' }
    ],
    paragraphNames: ['Paragraph 1: Essential Living Costs', 'Paragraph 2: Discretionary & Lifestyle Expenses'],
    strips: [
      {
        id: 'he-1',
        text: 'Essential living expenditures, specifically accommodation and groceries, absorbed the largest fraction of family budgets in both countries.',
        layer: 1,
        color: 'neutral',
        paragraph: 'Paragraph 1: Essential Living Costs',
        roleLabel: 'Topic Sentence',
        explanation: 'Topic sentence generalizing that living essentials claimed the lion’s share of spending.'
      },
      {
        id: 'he-2',
        text: 'British households committed 38% of their earnings to rent and mortgages, compared with 31% recorded for French equivalents.',
        layer: 2,
        color: 'neutral',
        paragraph: 'Paragraph 1: Essential Living Costs',
        roleLabel: 'Specific Data',
        explanation: 'Provides the exact statistical comparison of 38% vs 31% for accommodation.'
      },
      {
        id: 'he-3',
        text: 'Conversely, French citizens outspent British peers on dietary needs, allocating roughly a quarter of their funds compared to just over a fifth in the UK.',
        layer: 3,
        color: 'neutral',
        paragraph: 'Paragraph 1: Essential Living Costs',
        roleLabel: 'Comparison / Trend',
        explanation: 'Employs cohesive contrast word "Conversely" and relative comparison phrases ("roughly a quarter").'
      },
      {
        id: 'he-4',
        text: 'Turning to optional expenditures, entertainment and travel patterns showed remarkable similarity between the two nations.',
        layer: 1,
        color: 'neutral',
        paragraph: 'Paragraph 2: Discretionary & Lifestyle Expenses',
        roleLabel: 'Topic Sentence',
        explanation: 'Transitions to discretionary categories without introducing raw figures.'
      },
      {
        id: 'he-5',
        text: 'Combined lifestyle outlays accounted for 44% in France and 40% in the United Kingdom.',
        layer: 2,
        color: 'neutral',
        paragraph: 'Paragraph 2: Discretionary & Lifestyle Expenses',
        roleLabel: 'Specific Data',
        explanation: 'Cites the concrete figures of 44% and 40% directly from the data.'
      },
      {
        id: 'he-6',
        text: 'In both territories, recreational spending constituted the smallest single budget category, remaining substantially below property costs.',
        layer: 3,
        color: 'neutral',
        paragraph: 'Paragraph 2: Discretionary & Lifestyle Expenses',
        roleLabel: 'Comparison / Trend',
        explanation: 'Synthesizes an analytical comparison between recreational expenses and property costs.'
      }
    ]
  },

  // 3. Topic 3 (Intermediate)
  {
    id: 'renewable-energy',
    title: 'Global Renewable Energy Transitions (2010–2025)',
    subtitle: 'Evolution of Solar, Wind, and Hydroelectric output measured in Terawatt-hours (TWh).',
    chartType: 'Line Graph',
    difficulty: 'intermediate',
    bandTarget: 'Band 7.5',
    icon: '⚡',
    colorAccent: 'emerald',
    prompt:
      'The line graph compares electricity production generated by three clean energy sectors—Solar, Wind, and Hydroelectric—worldwide between 2010 and 2025, with projections up to 2030.',
    chartDataSummary: [
      { label: 'Hydro (2010 -> 2025)', value: '3,400 -> 4,100 TWh', subtext: 'Slow, steady rise' },
      { label: 'Wind (2010 -> 2025)', value: '340 -> 2,300 TWh', subtext: 'Consistent steep climb' },
      { label: 'Solar (2010 -> 2025)', value: '32 -> 1,950 TWh', subtext: 'Exponential explosion' }
    ],
    paragraphNames: [
      'Paragraph 1: Hydroelectric Dominance and Plateau',
      'Paragraph 2: The Exponential Surge in Solar Power',
      'Paragraph 3: Wind Energy Steady Ascent'
    ],
    strips: [
      // Hydro
      {
        id: 're-1',
        text: 'Hydroelectric generation remained the largest primary source of renewable electricity throughout the recorded duration.',
        layer: 1,
        color: 'neutral',
        paragraph: 'Paragraph 1: Hydroelectric Dominance and Plateau',
        roleLabel: 'Topic Sentence',
        explanation: 'Identifies Hydro as the overall volume leader without introducing exact numbers.'
      },
      {
        id: 're-2',
        text: 'Production initiated at 3,400 TWh in 2010 before advancing moderately to reach 4,100 TWh by 2025.',
        layer: 2,
        color: 'neutral',
        paragraph: 'Paragraph 1: Hydroelectric Dominance and Plateau',
        roleLabel: 'Specific Data',
        explanation: 'Gives starting and ending milestone values (3,400 TWh and 4,100 TWh).'
      },
      {
        id: 're-3',
        text: 'Despite maintaining the highest aggregate volume, its percentage growth was the most subdued among the three modalities.',
        layer: 3,
        color: 'neutral',
        paragraph: 'Paragraph 1: Hydroelectric Dominance and Plateau',
        roleLabel: 'Comparison / Trend',
        explanation: 'Contrasts its high absolute volume with its comparatively sluggish growth rate.'
      },

      // Solar
      {
        id: 're-4',
        text: 'In striking contrast, solar electricity experienced the most rapid and dramatic surge over the fifteen-year timeline.',
        layer: 1,
        color: 'neutral',
        paragraph: 'Paragraph 2: The Exponential Surge in Solar Power',
        roleLabel: 'Topic Sentence',
        explanation: 'Introduces Solar power’s unprecedented growth curve qualitatively.'
      },
      {
        id: 're-5',
        text: 'Starting from a nominal output of merely 32 TWh in 2010, generation soared to approximately 1,950 TWh in 2025.',
        layer: 2,
        color: 'neutral',
        paragraph: 'Paragraph 2: The Exponential Surge in Solar Power',
        roleLabel: 'Specific Data',
        explanation: 'Lists concrete numbers (32 TWh to 1,950 TWh) with precise timeline anchor points.'
      },
      {
        id: 're-6',
        text: 'This astronomical sixty-fold multiplication propelled solar past several traditional energy sources in overall output.',
        layer: 3,
        color: 'neutral',
        paragraph: 'Paragraph 2: The Exponential Surge in Solar Power',
        roleLabel: 'Comparison / Trend',
        explanation: 'Translates raw statistics into an analytical multiple ("sixty-fold multiplication").'
      },

      // Wind
      {
        id: 're-7',
        text: 'Wind energy exhibited a consistently robust upward trajectory across the entire timeframe.',
        layer: 1,
        color: 'neutral',
        paragraph: 'Paragraph 3: Wind Energy Steady Ascent',
        roleLabel: 'Topic Sentence',
        explanation: 'Sets up the steady upward trajectory of wind turbines without quoting data.'
      },
      {
        id: 're-8',
        text: 'Total wind power mounted from 340 TWh at the inception of the period to culminate at 2,300 TWh.',
        layer: 2,
        color: 'neutral',
        paragraph: 'Paragraph 3: Wind Energy Steady Ascent',
        roleLabel: 'Specific Data',
        explanation: 'Supplies initial and closing values (340 TWh and 2,300 TWh).'
      },
      {
        id: 're-9',
        text: 'Consequently, while wind began with tenfold the volume of solar, the margin separating the two technologies narrowed substantially by 2025.',
        layer: 3,
        color: 'neutral',
        paragraph: 'Paragraph 3: Wind Energy Steady Ascent',
        roleLabel: 'Comparison / Trend',
        explanation: 'Compares the closing gap between Wind and Solar over time using "narrowed substantially".'
      }
    ]
  },

  // 4. Topic 4 (Intermediate)
  {
    id: 'international-tourism',
    title: 'International Tourist Volumes & Receipts',
    subtitle: 'Comparative analysis of inbound holidaymakers and traveler expenditures.',
    chartType: 'Table',
    difficulty: 'intermediate',
    bandTarget: 'Band 7.5 - 8.0',
    icon: '✈️',
    colorAccent: 'amber',
    prompt:
      'The table details the volume of overseas arrivals (in millions) and subsequent financial receipts (in billions of USD) recorded across Europe, the Asia-Pacific region, and the Americas.',
    chartDataSummary: [
      { label: 'Europe Arrivals', value: '710 million', subtext: 'Highest visitor intake' },
      { label: 'Europe Spending', value: '$570 billion', subtext: '$802 per visitor' },
      { label: 'Americas Arrivals', value: '220 million', subtext: 'Third by volume' },
      { label: 'Americas Spending', value: '$340 billion', subtext: '$1,545 per visitor (Highest yield)' },
      { label: 'Asia-Pacific', value: '360 million / $430B', subtext: 'Balanced growth' }
    ],
    paragraphNames: [
      'Paragraph 1: European Tourist Supremacy',
      'Paragraph 2: The Americas: High Expenditure Yield',
      'Paragraph 3: The Asia-Pacific Regional Position'
    ],
    strips: [
      {
        id: 'it-1',
        text: 'Europe welcomed by far the largest aggregate number of international travelers among all documented geographic regions.',
        layer: 1,
        color: 'neutral',
        paragraph: 'Paragraph 1: European Tourist Supremacy',
        roleLabel: 'Topic Sentence',
        explanation: 'Overarching claim establishing European volume supremacy without numbers.'
      },
      {
        id: 'it-2',
        text: 'The continent logged 710 million visitors, yielding roughly 570 billion dollars in foreign currency receipts.',
        layer: 2,
        color: 'neutral',
        paragraph: 'Paragraph 1: European Tourist Supremacy',
        roleLabel: 'Specific Data',
        explanation: 'Provides exact numbers for both arrivals (710M) and receipts ($570B).'
      },
      {
        id: 'it-3',
        text: 'Although Europe captured half of global tourist footfall, its average per-capita spending remained considerably lower than that of the Americas.',
        layer: 3,
        color: 'neutral',
        paragraph: 'Paragraph 1: European Tourist Supremacy',
        roleLabel: 'Comparison / Trend',
        explanation: 'Synthesizes volume against per-capita spending yield across continents.'
      },
      {
        id: 'it-4',
        text: 'In sharp contrast, the Americas demonstrated a notably different economic profile, marked by premium spending density.',
        layer: 1,
        color: 'neutral',
        paragraph: 'Paragraph 2: The Americas: High Expenditure Yield',
        roleLabel: 'Topic Sentence',
        explanation: 'Identifies the distinguishing financial characteristic of the Americas without figures.'
      },
      {
        id: 'it-5',
        text: 'Despite attracting a modest 220 million vacationers, the Americas generated 340 billion dollars in tourism income.',
        layer: 2,
        color: 'neutral',
        paragraph: 'Paragraph 2: The Americas: High Expenditure Yield',
        roleLabel: 'Specific Data',
        explanation: 'Presents the empirical metrics (220M visitors and $340B revenue).'
      },
      {
        id: 'it-6',
        text: 'This translated to an average yield per tourist that was nearly double the rate achieved by European destinations.',
        layer: 3,
        color: 'neutral',
        paragraph: 'Paragraph 2: The Americas: High Expenditure Yield',
        roleLabel: 'Comparison / Trend',
        explanation: 'Highlights the relative multiplier ("nearly double the rate") comparing destinations.'
      },
      {
        id: 'it-7',
        text: 'The Asia-Pacific zone occupied an intermediate ranking across both arrivals and generated revenues.',
        layer: 1,
        color: 'neutral',
        paragraph: 'Paragraph 3: The Asia-Pacific Regional Position',
        roleLabel: 'Topic Sentence',
        explanation: 'Positions Asia-Pacific comfortably in the mid-tier without quantitative data.'
      },
      {
        id: 'it-8',
        text: 'Inbound voyagers numbered 360 million, translating directly into 430 billion dollars in hospitality transactions.',
        layer: 2,
        color: 'neutral',
        paragraph: 'Paragraph 3: The Asia-Pacific Regional Position',
        roleLabel: 'Specific Data',
        explanation: 'Provides the exact matching figures for Asia-Pacific.'
      },
      {
        id: 'it-9',
        text: 'Consequently, the region comfortably outpaced the Americas in headcount while falling well short of European totals.',
        layer: 3,
        color: 'neutral',
        paragraph: 'Paragraph 3: The Asia-Pacific Regional Position',
        roleLabel: 'Comparison / Trend',
        explanation: 'Brackets the region between the Americas and Europe using relational conjunctions.'
      }
    ]
  },

  // 5. Topic 5 (Advanced)
  {
    id: 'water-usage-continents',
    title: 'Continental Water Allocation by Sector',
    subtitle: 'Proportions of freshwater withdrawals devoted to agriculture, industry, and households.',
    chartType: 'Bar Chart',
    difficulty: 'advanced',
    bandTarget: 'Band 8.0 - 8.5',
    icon: '💧',
    colorAccent: 'sky',
    prompt:
      'The stacked bar chart delineates the proportion of annual freshwater utilization divided among agricultural, industrial, and domestic sectors across North America, Central Asia, and Africa.',
    chartDataSummary: [
      { label: 'Central Asia Agriculture', value: '88%', subtext: 'Overwhelmingly dominant' },
      { label: 'Africa Agriculture', value: '82%', subtext: 'Primary allocation' },
      { label: 'North America Industry', value: '48%', subtext: 'Industrial powerhouse' },
      { label: 'North America Agriculture', value: '39%', subtext: 'Second priority' },
      { label: 'Domestic Consumption', value: '7% (Asia) vs 13% (N. America)', subtext: 'Lowest category globally' }
    ],
    paragraphNames: [
      'Paragraph 1: Agrarian Domination in Developing Continents',
      'Paragraph 2: Industrial Concentration in North America',
      'Paragraph 3: Domestic Allocation Disparities'
    ],
    strips: [
      {
        id: 'wu-1',
        text: 'Freshwater consumption across both Central Asia and Africa was overwhelmingly directed toward agrarian activities.',
        layer: 1,
        color: 'neutral',
        paragraph: 'Paragraph 1: Agrarian Domination in Developing Continents',
        roleLabel: 'Topic Sentence',
        explanation: 'Expresses the agricultural orientation of Central Asia and Africa qualitatively.'
      },
      {
        id: 'wu-2',
        text: 'Agriculture commanded an astonishing 88% of water supplies in Central Asia and a comparable 82% across the African continent.',
        layer: 2,
        color: 'neutral',
        paragraph: 'Paragraph 1: Agrarian Domination in Developing Continents',
        roleLabel: 'Specific Data',
        explanation: 'Supplies specific measurements (88% and 82%) for the respective regions.'
      },
      {
        id: 'wu-3',
        text: 'By comparison, industrial demand in these zones remained remarkably negligible, hovering under 10% in both locales.',
        layer: 3,
        color: 'neutral',
        paragraph: 'Paragraph 1: Agrarian Domination in Developing Continents',
        roleLabel: 'Comparison / Trend',
        explanation: 'Synthesizes the contrast between massive irrigation need and negligible industrial uptake.'
      },
      {
        id: 'wu-4',
        text: 'A profoundly contrasting distribution emerged in North America, where industrial operations formed the primary drain on hydrologic resources.',
        layer: 1,
        color: 'neutral',
        paragraph: 'Paragraph 2: Industrial Concentration in North America',
        roleLabel: 'Topic Sentence',
        explanation: 'Focuses on North America’s distinctive industrial profile with advanced contrast phrasing.'
      },
      {
        id: 'wu-5',
        text: 'Commercial manufacturing and processing accounted for 48% of regional reserves, leaving farming with a subordinate 39% allocation.',
        layer: 2,
        color: 'neutral',
        paragraph: 'Paragraph 2: Industrial Concentration in North America',
        roleLabel: 'Specific Data',
        explanation: 'States the specific division: 48% industrial versus 39% agricultural.'
      },
      {
        id: 'wu-6',
        text: 'This rendered North America the only surveyed territory where agricultural usage was surpassed by manufacturing requirements.',
        layer: 3,
        color: 'neutral',
        paragraph: 'Paragraph 2: Industrial Concentration in North America',
        roleLabel: 'Comparison / Trend',
        explanation: 'Provides an evaluative Band 8.5 synthesis marking the region as a unique anomaly.'
      },
      {
        id: 'wu-7',
        text: 'Lastly, domestic tap consumption constituted the smallest proportional tier across every examined territory without exception.',
        layer: 1,
        color: 'neutral',
        paragraph: 'Paragraph 3: Domestic Allocation Disparities',
        roleLabel: 'Topic Sentence',
        explanation: 'Universal overview statement regarding household consumption.'
      },
      {
        id: 'wu-8',
        text: 'Household supplies accounted for merely 7% of total withdrawals in Central Asia and 9% in Africa, rising to 13% in North American residences.',
        layer: 2,
        color: 'neutral',
        paragraph: 'Paragraph 3: Domestic Allocation Disparities',
        roleLabel: 'Specific Data',
        explanation: 'Outlines the specific figures (7%, 9%, 13%) across the three jurisdictions.'
      },
      {
        id: 'wu-9',
        text: 'Even though North American domestic usage was the highest on the chart, it still lagged far behind both industrial and farming totals.',
        layer: 3,
        color: 'neutral',
        paragraph: 'Paragraph 3: Domestic Allocation Disparities',
        roleLabel: 'Comparison / Trend',
        explanation: 'Connects internal ranking within North America against the other continents.'
      }
    ]
  },

  // 6. Topic 6 (Advanced)
  {
    id: 'stem-humanities-enrolment',
    title: 'University Enrolment: STEM vs Humanities',
    subtitle: 'Shifts in tertiary education registrations across a twenty-year longitudinal study.',
    chartType: 'Mixed Chart',
    difficulty: 'advanced',
    bandTarget: 'Band 8.5 - 9.0',
    icon: '🎓',
    colorAccent: 'purple',
    prompt:
      'The mixed chart and table trace the structural divergence between undergraduate enrolments in Science, Technology, Engineering, and Mathematics (STEM) versus Humanities disciplines from 2000 to 2020.',
    chartDataSummary: [
      { label: 'STEM Enrolment (2000)', value: '1.2 million', subtext: 'Initial intake' },
      { label: 'STEM Enrolment (2020)', value: '2.8 million', subtext: '+133% expansion' },
      { label: 'Humanities (2000)', value: '1.9 million', subtext: 'Former majority' },
      { label: 'Humanities (2020)', value: '1.1 million', subtext: '-42% contraction' }
    ],
    paragraphNames: [
      'Paragraph 1: The Ascendancy of Technical Disciplines',
      'Paragraph 2: The Retraction of Liberal Arts and Humanities',
      'Paragraph 3: Structural Divergence and Crossover Point'
    ],
    strips: [
      {
        id: 'sh-1',
        text: 'Higher education registrations in scientific and technological disciplines experienced uninterrupted and substantial expansion throughout the study.',
        layer: 1,
        color: 'neutral',
        paragraph: 'Paragraph 1: The Ascendancy of Technical Disciplines',
        roleLabel: 'Topic Sentence',
        explanation: 'Clear academic topic sentence tracing the uninterrupted growth curve of STEM.'
      },
      {
        id: 'sh-2',
        text: 'Enrolments climbed from 1.2 million undergraduates at the turn of the millennium to culminate at 2.8 million by 2020.',
        layer: 2,
        color: 'neutral',
        paragraph: 'Paragraph 1: The Ascendancy of Technical Disciplines',
        roleLabel: 'Specific Data',
        explanation: 'Provides starting and finishing statistical markers (1.2M and 2.8M).'
      },
      {
        id: 'sh-3',
        text: 'This more than doubled the original candidate pool, solidifying STEM as the dominant academic category nationwide.',
        layer: 3,
        color: 'neutral',
        paragraph: 'Paragraph 1: The Ascendancy of Technical Disciplines',
        roleLabel: 'Comparison / Trend',
        explanation: 'Synthesizes the percentage multiple ("more than doubled") into analytical impact.'
      },
      {
        id: 'sh-4',
        text: 'A precisely converse scenario characterized liberal arts and humanities faculties during the identical twenty-year interval.',
        layer: 1,
        color: 'neutral',
        paragraph: 'Paragraph 2: The Retraction of Liberal Arts and Humanities',
        roleLabel: 'Topic Sentence',
        explanation: 'Sophisticated cohesive device introducing the mirror contraction in humanities.'
      },
      {
        id: 'sh-5',
        text: 'Having originally enrolled 1.9 million scholars in 2000, cohort volumes retreated steadily to terminate at 1.1 million.',
        layer: 2,
        color: 'neutral',
        paragraph: 'Paragraph 2: The Retraction of Liberal Arts and Humanities',
        roleLabel: 'Specific Data',
        explanation: 'Supplies exact commencement and cessation statistics (1.9M down to 1.1M).'
      },
      {
        id: 'sh-6',
        text: 'This marked a steep erosion of over 40%, leaving humanities departments with their leanest intake on record.',
        layer: 3,
        color: 'neutral',
        paragraph: 'Paragraph 2: The Retraction of Liberal Arts and Humanities',
        roleLabel: 'Comparison / Trend',
        explanation: 'Calculates the net decline percentage ("over 40%") with contextual evaluation.'
      },
      {
        id: 'sh-7',
        text: 'The comparative intersection between the two divergent trajectories revealed a decisive historical tipping point midway through the study.',
        layer: 1,
        color: 'neutral',
        paragraph: 'Paragraph 3: Structural Divergence and Crossover Point',
        roleLabel: 'Topic Sentence',
        explanation: 'High-level academic topic sentence identifying the intersection crossover point.'
      },
      {
        id: 'sh-8',
        text: 'Between 2008 and 2010, both faculties temporarily converged at approximately 1.5 million students apiece.',
        layer: 2,
        color: 'neutral',
        paragraph: 'Paragraph 3: Structural Divergence and Crossover Point',
        roleLabel: 'Specific Data',
        explanation: 'Pins down the specific timeframe and exact intersection point (1.5 million students).'
      },
      {
        id: 'sh-9',
        text: 'Whereas humanities had initially exceeded STEM by over 700,000 pupils, STEM concluded the observation period holding a formidable 1.7 million student advantage.',
        layer: 3,
        color: 'neutral',
        paragraph: 'Paragraph 3: Structural Divergence and Crossover Point',
        roleLabel: 'Comparison / Trend',
        explanation: 'Exemplary Band 9 comparative sentence balancing opposing margins across eras.'
      }
    ]
  }
];
