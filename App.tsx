
import React, { useState } from 'react';
import { generateBIReport } from './geminiService';
import { BIReport, ProfitEngine } from './types';
import { Accordion } from './components/Accordion';
import { BmcGrid } from './components/BmcGrid';

const App: React.FC = () => {
  const [target, setTarget] = useState('');
  const [zone, setZone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<BIReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeBmcIndex, setActiveBmcIndex] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!target || !zone) return;

    setIsLoading(true);
    setError(null);
    setActiveBmcIndex(0);
    try {
      const result = await generateBIReport(target, zone);
      setReport(result);
    } catch (err) {
      setError("Errore critico durante l'estrazione mineraria dei dati. Riprova.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case 'bassa': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'media': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'alta': return 'text-rose-600 bg-rose-50 border-rose-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-12 relative">
        <div className="mx-auto w-32 h-32 mb-6 relative group cursor-help">
          <div className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-opacity animate-pulse"></div>
          <div className="relative bg-white border-4 border-slate-900 rounded-full p-4 shadow-2xl transform group-hover:scale-110 transition-transform flex items-center justify-center overflow-visible">
             <div className="relative">
                <span className="text-7xl block transform -scale-x-100" role="img" aria-label="mole">🦔</span>
                <span className="absolute top-4 left-2 text-2xl" role="img" aria-label="sunglasses">🕶️</span>
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-4xl animate-bounce" role="img" aria-label="crown">👑</span>
             </div>
             <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-slate-900 p-2 rounded-full border-2 border-slate-900 shadow-lg group-hover:rotate-45 transition-transform">
                <span className="text-2xl leading-none" role="img" aria-label="gold-pick">⛏️</span>
             </div>
             <div className="absolute -bottom-1 -left-4 text-3xl transform -rotate-12">💰</div>
          </div>
          <div className="absolute -top-2 -right-12 bg-slate-900 text-yellow-400 text-[10px] font-black px-3 py-1.5 rounded-full shadow-xl border-2 border-yellow-500 animate-pulse whitespace-nowrap">
            I SEE MONEY! 🤑
          </div>
        </div>

        <div className="inline-block px-3 py-1 bg-slate-900 text-yellow-500 rounded-md text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-yellow-500/30 font-mono">
          FORGE BUSINESS SYSTEMS
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-2 tracking-tighter uppercase italic">
          Revenue<span className="text-yellow-500">Digger</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">
          Identifica vene d'oro inesplorate e trasformale in imperi scalabili.
        </p>
      </header>

      <div className="glass sticky top-4 z-20 p-6 rounded-2xl shadow-2xl border-2 border-slate-900 mb-12 amber-glow">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <div className="flex-2 flex-grow-[2]">
            <label className="block text-[10px] font-black text-slate-500 uppercase mb-1.5 ml-1">Nicchia Obiettivo</label>
            <input
              type="text"
              placeholder="es. Consulenti Finanziari Indipendenti"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:border-yellow-500 outline-none transition-all font-bold"
              required
            />
          </div>
          <div className="flex-1 flex-grow">
            <label className="block text-[10px] font-black text-slate-500 uppercase mb-1.5 ml-1">Territorio di Scavo</label>
            <input
              type="text"
              placeholder="es. Svizzera Italiana"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:border-yellow-500 outline-none transition-all font-bold"
              required
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto px-8 py-3 bg-slate-900 text-yellow-500 font-black rounded-lg transition-all hover:bg-black hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 h-[54px] shadow-lg uppercase tracking-wider"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                  MINING...
                </div>
              ) : (
                <>SCAVA ORA ⛏️</>
              )}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="bg-rose-600 text-white p-4 rounded-lg mb-8 flex items-center gap-3 font-bold uppercase text-xs">
          <span>⚠️</span> {error}
        </div>
      )}

      {report && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-8">
          
          {/* STEP 1: PAIN ANALYSIS */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 bg-rose-600 text-white flex items-center justify-center rounded-lg font-black shadow-lg">01</span>
              <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-900">Analisi delle Inefficienze (Pains)</h2>
            </div>
            <Accordion title="Mappa dei Dolori Localizzati" icon="🔥" defaultOpen>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {report.painAnalysis.map((p, i) => (
                  <div key={i} className="flex gap-4 items-start p-5 bg-white border-2 border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all border-l-8 border-l-rose-500 group">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 text-yellow-500 flex-shrink-0 flex items-center justify-center font-black text-xs">{i+1}</div>
                    <div>
                      <h4 className="font-black text-slate-800 flex items-center gap-2">
                        {p.pain}
                        <span className="text-[9px] font-black text-rose-500 uppercase px-1 bg-rose-50 rounded">Intensità: {p.intensity}</span>
                      </h4>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed">{p.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Accordion>
          </section>

          {/* STEP 2: MARKET MAPPING */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 bg-slate-900 text-yellow-500 flex items-center justify-center rounded-lg font-black shadow-lg">02</span>
              <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-900">Valutazione della Vena (Market Sizing)</h2>
            </div>
            <Accordion title="Dimensioni del Mercato & Strategia Oceano" icon="📊" defaultOpen>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                 {[
                   { l: 'TAM', v: report.marketSize.tam, d: 'Potenziale Totale' },
                   { l: 'SAM', v: report.marketSize.sam, d: 'Mercato Accessibile' },
                   { l: 'SOM', v: report.marketSize.som, d: 'Obiettivo Realistico' }
                 ].map((m, i) => (
                   <div key={i} className="bg-slate-900 p-6 rounded-2xl text-white border-b-4 border-yellow-500 transform hover:-translate-y-1 transition-transform">
                     <p className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-1">{m.l}</p>
                     <p className="text-2xl font-black">{m.v}</p>
                     <p className="text-[10px] text-slate-400 uppercase font-bold">{m.d}</p>
                   </div>
                 ))}
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl relative overflow-hidden">
                    <span className="absolute -right-2 -bottom-2 text-4xl opacity-10">🦈</span>
                    <h4 className="text-[10px] font-black text-rose-600 uppercase mb-1">Red Ocean (Concorrenza)</h4>
                    <p className="text-slate-700 text-sm leading-relaxed font-medium">{report.redOcean}</p>
                  </div>
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl relative overflow-hidden">
                    <span className="absolute -right-2 -bottom-2 text-4xl opacity-10">🏝️</span>
                    <h4 className="text-[10px] font-black text-emerald-600 uppercase mb-1">Blue Ocean (Opportunità)</h4>
                    <p className="text-slate-700 text-sm leading-relaxed font-medium">{report.blueOcean}</p>
                  </div>
               </div>
            </Accordion>
          </section>

          {/* STEP 3: PROFIT ENGINES */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 bg-yellow-500 text-slate-900 flex items-center justify-center rounded-lg font-black shadow-lg">03</span>
              <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-900">Motori di Estrazione (Profit Engines)</h2>
            </div>
            <Accordion title="Soluzioni ad Alto Rendimento" icon="💰" defaultOpen>
              <div className="grid grid-cols-1 gap-6">
                {report.profitEngines.sort((a, b) => b.profitPotential - a.profitPotential).map((engine, i) => (
                  <div key={i} className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden hover:border-yellow-500 transition-all flex flex-col md:flex-row shadow-sm hover:shadow-xl group">
                    <div className="bg-slate-50 p-6 md:w-1/3 border-b md:border-b-0 md:border-r-2 border-slate-200 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                           <span className="text-[10px] font-black px-2 py-1 bg-slate-900 text-yellow-500 rounded uppercase">Engine {i+1}</span>
                           <span className={`text-[9px] font-bold px-2 py-1 border rounded uppercase ${getDifficultyColor(engine.difficulty)}`}>{engine.difficulty}</span>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 leading-tight mb-2 group-hover:text-yellow-600 transition-colors">{engine.solutionName}</h3>
                      </div>
                      <div className="mt-4">
                         <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Potenziale Profitto</p>
                         <div className="flex items-center gap-3">
                           <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden p-0.5">
                             <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full" style={{width: `${engine.profitPotential}%`}}></div>
                           </div>
                           <span className="text-xl font-black text-emerald-600">{engine.profitPotential}%</span>
                         </div>
                         <button 
                            onClick={() => setActiveBmcIndex(i)}
                            className="w-full mt-4 py-2 bg-slate-900 text-yellow-500 text-[10px] font-black uppercase rounded-lg hover:bg-black transition-all"
                         >
                            Vedi Master Plan ↓
                         </button>
                      </div>
                    </div>
                    <div className="p-6 flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
                      <div>
                         <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">Offerta Core</h4>
                         <p className="text-slate-800 text-sm font-bold leading-relaxed">{engine.coreOffer}</p>
                      </div>
                      <div>
                         <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">Monetizzazione</h4>
                         <p className="text-slate-800 text-sm font-bold leading-relaxed">{engine.monetizationModel}</p>
                      </div>
                      <div className="md:col-span-2 p-4 bg-amber-50 rounded-xl border border-amber-100">
                         <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Unfair Advantage</h4>
                         <p className="text-slate-900 text-sm italic font-bold">"{engine.unfairAdvantage}"</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Accordion>
          </section>

          {/* STEP 4: MASTER PLANS (CAROUSEL) */}
          <section id="master-plan">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-lg font-black shadow-lg">04</span>
              <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-900">The Master Plans (B.M.C.)</h2>
            </div>
            
            <Accordion title="Piani d'Azione Operativi" icon="🔳" defaultOpen>
              {/* Tab Switcher / Carousel Controller */}
              <div className="flex overflow-x-auto gap-2 mb-8 pb-2 no-scrollbar">
                {report.profitEngines.map((engine, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveBmcIndex(i)}
                    className={`flex-shrink-0 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all border-2 ${
                      activeBmcIndex === i 
                      ? 'bg-slate-900 text-yellow-500 border-slate-900 shadow-lg' 
                      : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    PLAN {i + 1}: {engine.solutionName}
                  </button>
                ))}
              </div>

              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="mb-6 p-5 bg-indigo-50 border-l-8 border-l-indigo-500 rounded-r-2xl shadow-sm">
                  <h3 className="font-black text-indigo-900 uppercase text-lg mb-1 italic">
                    {report.profitEngines[activeBmcIndex].solutionName}
                  </h3>
                  <p className="text-indigo-700 text-xs font-medium leading-relaxed">
                    Architettura operativa specifica per estrarre profitto tramite l'offerta: <span className="font-bold underline">{report.profitEngines[activeBmcIndex].coreOffer}</span>
                  </p>
                </div>
                
                <BmcGrid bmc={report.profitEngines[activeBmcIndex].bmc} />
              </div>
            </Accordion>
          </section>

          <footer className="py-16 text-center">
             <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-24 bg-slate-300"></div>
                <div className="text-3xl">✨💎✨</div>
                <div className="h-px w-24 bg-slate-300"></div>
             </div>
             <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.5em]">Extraction Completed Successfully</p>
             <button 
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                className="mt-8 px-10 py-4 bg-slate-900 text-yellow-500 rounded-xl font-black text-sm uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl hover:scale-105 active:scale-95"
             >
               Nuovo Scavo ⛏️
             </button>
             <p className="text-slate-300 text-[9px] font-bold mt-12 italic uppercase tracking-widest">© Revenue Digger - Forge Business Systems</p>
          </footer>
        </div>
      )}
    </div>
  );
};

export default App;
