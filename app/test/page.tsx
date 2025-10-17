"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Home() {
  const [summary, setSummary] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSummary() {
      const { data, error } = await supabase
        .from("flow_participants_summary")
        .select("*");
      if (error) console.error("❌ Error:", error);
      else setSummary(data);
      setLoading(false);
    }
    loadSummary();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1120] to-[#111827] text-white p-12">
      <h1 className="text-3xl font-bold mb-8 text-primary">Flowbar — 행사 요약</h1>

      {loading ? (
        <p className="opacity-70">⏳ 데이터를 불러오는 중...</p>
      ) : summary.length === 0 ? (
        <p className="opacity-70">📭 아직 참가자 데이터가 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {summary.map((item, i) => (
            <div
              key={i}
              className="p-6 border border-primary/30 rounded-xl bg-white/5 shadow-sm hover:bg-white/10 transition-all"
            >
              <h2 className="text-xl font-semibold text-primary mb-3">
                행사 ID: {item.event_id}
              </h2>
              <p>총 참가자 수: {item.total}</p>
              <p>소속 기관 수: {item.org_count}</p>
              <p>직함 다양성: {item.role_variety}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
