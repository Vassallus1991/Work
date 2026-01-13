
export interface PainPoint {
  pain: string;
  intensity: string;
  description: string;
}

export interface ExistingSolution {
  segment: string;
  currentSolution: string;
  whyInsufficient: string;
}

export interface MarketSize {
  tam: string;
  sam: string;
  som: string;
  explanation: string;
}

export interface BusinessModelCanvas {
  customerSegments: string;
  valuePropositions: string;
  channels: string;
  customerRelationships: string;
  revenueStreams: string;
  keyActivities: string;
  keyResources: string;
  keyPartnerships: string;
  costStructure: string;
}

export interface ProfitEngine {
  solutionName: string;
  coreOffer: string;
  monetizationModel: string;
  profitPotential: number; // 1-100
  unfairAdvantage: string;
  difficulty: 'Bassa' | 'Media' | 'Alta';
  bmc: BusinessModelCanvas; // BMC specifico per questa soluzione
}

export interface BIReport {
  painAnalysis: PainPoint[];
  existingSolutions: ExistingSolution[];
  redOcean: string;
  blueOcean: string;
  marketSize: MarketSize;
  profitEngines: ProfitEngine[];
}
