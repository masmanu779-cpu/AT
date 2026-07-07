import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";

import AuthScreen from "./pages/Auth";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Calculators from "./pages/Calculators";
import ImageAnalyzer from "./pages/ImageAnalyzer";
import Diagnosis from "./pages/Diagnosis";
import Learning from "./pages/Learning";
import Viva from "./pages/Viva";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/diagnose" element={<Diagnosis />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/viva" element={<Viva />} />
          <Route path="/analyze" element={<ImageAnalyzer />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
