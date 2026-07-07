import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
    Home, MessageSquare, Wrench, Calculator, 
    BookOpen, Camera, LogOut, CheckSquare 
} from "lucide-react";
import { auth } from "../lib/firebase";

export default function Layout({ children }: { children: ReactNode }) {
    const location = useLocation();

    const navItems = [
        { path: "/", icon: Home, label: "Dashboard" },
        { path: "/chat", icon: MessageSquare, label: "AI Assistant" },
        { path: "/diagnose", icon: Wrench, label: "Fault Diagnosis" },
        { path: "/calculators", icon: Calculator, label: "Calculators" },
        { path: "/learning", icon: BookOpen, label: "Learning" },
        { path: "/viva", icon: CheckSquare, label: "Viva" },
        { path: "/analyze", icon: Camera, label: "Analyze" },
    ];

    return (
        <div className="flex h-screen bg-[#0a0a0c] text-slate-200 font-sans overflow-hidden flex-col md:flex-row">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-[#111114] border-r border-slate-800 p-4 gap-2 z-10">
                <div className="mb-4 px-4 flex items-center gap-3 pt-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/20">
                        <Wrench className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">AutoMind <span className="text-blue-500">AI</span></span>
                </div>
                
                <div className="mb-2 px-4 mt-4">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Main Console</p>
                </div>

                <nav className="flex-1 space-y-2 overflow-y-auto pb-4 scrollbar-hide">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = location.pathname === item.path;
                        return (
                            <Link 
                                key={item.path} 
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                                    active 
                                    ? "bg-blue-600/10 text-blue-400 font-medium border border-blue-500/20" 
                                    : "hover:bg-slate-800 text-slate-400"
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium text-sm">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="mt-auto pt-4 border-t border-slate-800">
                    <button 
                        onClick={() => auth.signOut()}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-slate-800 text-slate-400 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium text-sm">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                <nav className="md:hidden flex items-center justify-between px-6 py-4 bg-[#111114] border-b border-slate-800 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/20">
                            <Wrench className="w-4 h-4" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-white">AutoMind <span className="text-blue-500">AI</span></span>
                    </div>
                </nav>
                <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
                    <div className="max-w-6xl mx-auto w-full flex flex-col gap-8 h-full">
                        {children}
                    </div>
                </div>
            </main>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#111114] border-t border-slate-800 flex justify-around px-2 py-3 z-50 overflow-x-auto safe-area-bottom pb-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = location.pathname === item.path;
                    return (
                        <Link 
                            key={item.path} 
                            to={item.path}
                            className={`flex flex-col items-center p-2 min-w-[64px] ${
                                active ? "text-blue-400" : "text-slate-500"
                            }`}
                        >
                            <div className={`p-1 rounded-full ${active ? "bg-blue-600/20" : ""}`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-medium mt-1">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>
        </div>
    );
}
