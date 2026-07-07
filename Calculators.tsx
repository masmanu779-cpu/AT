import { useState } from "react";
import { motion } from "motion/react";

export default function Calculators() {
    const [calcType, setCalcType] = useState("torque");
    
    // Torque
    const [force, setForce] = useState("");
    const [distance, setDistance] = useState("");
    
    // Compression Ratio
    const [sweptVolume, setSweptVolume] = useState("");
    const [clearanceVolume, setClearanceVolume] = useState("");

    const calculateTorque = () => {
        const f = parseFloat(force);
        const d = parseFloat(distance);
        if (!isNaN(f) && !isNaN(d)) return (f * d).toFixed(2) + " N·m";
        return "-";
    };

    const calculateCR = () => {
        const sv = parseFloat(sweptVolume);
        const cv = parseFloat(clearanceVolume);
        if (!isNaN(sv) && !isNaN(cv) && cv !== 0) return ((sv + cv) / cv).toFixed(2) + ":1";
        return "-";
    };

    return (
        <div className="space-y-6 flex flex-col h-full">
            <header className="shrink-0 bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-3xl border border-slate-800">
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="text-purple-500 font-mono text-sm">02</span>
                    Engineering Calculator Hub
                </h1>
            </header>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {['torque', 'compression'].map((type) => (
                    <button
                        key={type}
                        onClick={() => setCalcType(type)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors border ${
                            calcType === type 
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/20" 
                            : "bg-[#111114] text-slate-500 border-slate-800 hover:bg-slate-900"
                        }`}
                    >
                        {type === 'torque' ? "Torque & Power" : "Compression Ratio"}
                    </button>
                ))}
            </div>

            <motion.div 
                key={calcType}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#111114] p-6 md:p-8 rounded-3xl border border-slate-800 flex-1"
            >
                {calcType === 'torque' && (
                    <div className="space-y-8 max-w-md">
                        <div>
                            <h2 className="text-lg font-bold text-white">Torque Calculation</h2>
                            <p className="text-xs text-slate-500 font-mono mt-2">τ = F × r (Force × Distance)</p>
                        </div>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Force (Newtons)</label>
                                <input 
                                    type="number" 
                                    value={force}
                                    onChange={e => setForce(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0c] border border-slate-800 focus:border-purple-500 outline-none text-white text-sm"
                                    placeholder="e.g. 500"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Distance (Meters)</label>
                                <input 
                                    type="number" 
                                    value={distance}
                                    onChange={e => setDistance(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0c] border border-slate-800 focus:border-purple-500 outline-none text-white text-sm"
                                    placeholder="e.g. 0.5"
                                />
                            </div>
                        </div>
                        <div className="pt-6 border-t border-slate-800">
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Resulting Torque</div>
                            <div className="text-4xl font-bold text-purple-400">{calculateTorque()}</div>
                        </div>
                    </div>
                )}

                {calcType === 'compression' && (
                    <div className="space-y-8 max-w-md">
                        <div>
                            <h2 className="text-lg font-bold text-white">Compression Ratio</h2>
                            <p className="text-xs text-slate-500 font-mono mt-2">CR = (Vs + Vc) / Vc</p>
                        </div>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Swept Volume (cc)</label>
                                <input 
                                    type="number" 
                                    value={sweptVolume}
                                    onChange={e => setSweptVolume(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0c] border border-slate-800 focus:border-purple-500 outline-none text-white text-sm"
                                    placeholder="e.g. 500"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Clearance Volume (cc)</label>
                                <input 
                                    type="number" 
                                    value={clearanceVolume}
                                    onChange={e => setClearanceVolume(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0c] border border-slate-800 focus:border-purple-500 outline-none text-white text-sm"
                                    placeholder="e.g. 50"
                                />
                            </div>
                        </div>
                        <div className="pt-6 border-t border-slate-800">
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Compression Ratio</div>
                            <div className="text-4xl font-bold text-purple-400">{calculateCR()}</div>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
