
import React from 'react';
import { BusinessModelCanvas } from '../types';

export const BmcGrid: React.FC<{ bmc: BusinessModelCanvas }> = ({ bmc }) => {
  const Card = ({ title, content, icon }: { title: string; content: string; icon: string }) => (
    <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-2 mb-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
        <span>{icon}</span>
        <span>{title}</span>
      </div>
      <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">{content}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
      {/* Top Row */}
      <div className="md:col-span-1 h-full">
        <Card title="Key Partners" icon="🤝" content={bmc.keyPartnerships} />
      </div>
      <div className="md:col-span-1 flex flex-col gap-3">
        <Card title="Key Activities" icon="⚙️" content={bmc.keyActivities} />
        <Card title="Key Resources" icon="🏗️" content={bmc.keyResources} />
      </div>
      <div className="md:col-span-1 h-full">
        <Card title="Value Propositions" icon="💎" content={bmc.valuePropositions} />
      </div>
      <div className="md:col-span-1 flex flex-col gap-3">
        <Card title="Relationships" icon="❤️" content={bmc.customerRelationships} />
        <Card title="Channels" icon="🚀" content={bmc.channels} />
      </div>
      <div className="md:col-span-1 h-full">
        <Card title="Customer Segments" icon="👥" content={bmc.customerSegments} />
      </div>

      {/* Bottom Row */}
      <div className="md:col-span-2">
        <Card title="Cost Structure" icon="💰" content={bmc.costStructure} />
      </div>
      <div className="md:col-span-3">
        <Card title="Revenue Streams" icon="📈" content={bmc.revenueStreams} />
      </div>
    </div>
  );
};
