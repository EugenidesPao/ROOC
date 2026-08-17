"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, RotateCcw, Plus, Minus, Save, ArrowLeft } from "lucide-react";

interface SkillItem {
  id: string;
  name: string;
  maxLv: number;
  currentLv: number;
  icon: string;
}

const INITIAL_SKILLS: Record<string, SkillItem[]> = {
  acolyte: [
    { id: "holy_light", name: "Holy Light", maxLv: 5, currentLv: 0, icon: "✨" },
    { id: "demon_bane", name: "Demon Bane", maxLv: 10, currentLv: 0, icon: "🛡️" },
    { id: "heal", name: "Heal", maxLv: 10, currentLv: 10, icon: "💖" },
    { id: "teleport", name: "Teleport", maxLv: 1, currentLv: 0, icon: "🌀" },
    { id: "blessing", name: "Blessing", maxLv: 10, currentLv: 10, icon: "❇️" },
    { id: "angelus", name: "Angelus", maxLv: 10, currentLv: 10, icon: "🔔" },
    { id: "inc_agi", name: "Increase Agility", maxLv: 5, currentLv: 5, icon: "🏃" },
    { id: "kyrie", name: "Kyrie Eleison", maxLv: 10, currentLv: 5, icon: "🛡️" },
  ],
  priest: [
    { id: "magnificat", name: "Magnificat", maxLv: 5, currentLv: 0, icon: "🕊️" },
    { id: "resurrection", name: "Resurrection", maxLv: 4, currentLv: 4, icon: "😇" },
    { id: "sanctuary", name: "Sanctuary", maxLv: 10, currentLv: 0, icon: "🏰" },
    { id: "impositio", name: "Impositio Manus", maxLv: 5, currentLv: 5, icon: "🖐️" },
    { id: "turn_undead", name: "Turn Undead", maxLv: 10, currentLv: 5, icon: "💀" },
    { id: "sp_rec", name: "SP Recovery", maxLv: 10, currentLv: 6, icon: "🧘" },
    { id: "magnus", name: "Magnus Exorcismus", maxLv: 10, currentLv: 10, icon: "📜" },
    { id: "gloria", name: "Gloria", maxLv: 5, currentLv: 5, icon: "✌️" },
  ],
  high_priest: [
    { id: "meditatio", name: "Meditatio", maxLv: 10, currentLv: 10, icon: "🧘‍♀️" },
    { id: "lex_divina", name: "Lex Divina", maxLv: 5, currentLv: 1, icon: "🤐" },
    { id: "lex_aeterna", name: "Lex Aeterna", maxLv: 5, currentLv: 5, icon: "💥" },
    { id: "lauda_agnus", name: "Lauda Agnus", maxLv: 1, currentLv: 1, icon: "🔮" },
    { id: "bonded_fate", name: "Bonded Fate", maxLv: 10, currentLv: 10, icon: "🤍" },
    { id: "leap_faith", name: "Leap of Faith", maxLv: 1, currentLv: 1, icon: "👼" },
    { id: "epiclesis", name: "Epiclesis", maxLv: 3, currentLv: 2, icon: "🌳" },
    { id: "holy_ward", name: "Holy Ward", maxLv: 10, currentLv: 10, icon: "⛪" },
  ],
};

const ACTIVE_BUILD_KEY = "ro_origin_active_build_id";
const STORAGE_KEY = "ro_origin_builds";

export default function SkillPage() {
  const [activeTab, setActiveTab] = useState<string>("high_priest");
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [remainingPoints, setRemainingPoints] = useState<number>(10);
  const [activeBuildName, setActiveBuildName] = useState<string>("Build สกิล");

  useEffect(() => {
    // ดึงชื่อ Build ที่เปิดอยู่ออกมาแสดงที่ Header
    const savedActiveId = localStorage.getItem(ACTIVE_BUILD_KEY);
    const savedBuilds = localStorage.getItem(STORAGE_KEY);
    if (savedBuilds && savedActiveId) {
      try {
        const parsed = JSON.parse(savedBuilds);
        const currentBuild = parsed.find((b: { id: string; name: string }) => b.id === savedActiveId);
        if (currentBuild) {
          setActiveBuildName(currentBuild.name);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const getTabPoints = (tabKey: string) => {
    return (skills[tabKey] || []).reduce((sum, item) => sum + item.currentLv, 0);
  };

  const handleLevelChange = (tabKey: string, skillId: string, delta: number) => {
    const targetSkill = skills[tabKey]?.find((s) => s.id === skillId);
    if (!targetSkill) return;

    const newLv = targetSkill.currentLv + delta;
    if (newLv < 0 || newLv > targetSkill.maxLv) return;
    if (delta > 0 && remainingPoints <= 0) return;

    setSkills((prev) => ({
      ...prev,
      [tabKey]: prev[tabKey].map((s) => (s.id === skillId ? { ...s, currentLv: newLv } : s)),
    }));
    setRemainingPoints((prev) => prev - delta);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header Bar */}
      <header className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-100 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2 text-amber-400 font-bold text-lg">
            <Sparkles className="w-5 h-5" />
            <span>RO Origin Build Hub</span>
          </div>
          <span className="text-slate-600">/</span>
          <span className="text-slate-300 font-medium">{activeBuildName}</span>
        </div>
        <Link href="/">
          <button className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl transition">
            <Save className="w-4 h-4" /> บันทึก Build สกิล
          </button>
        </Link>
      </header>

      {/* Main Layout */}
      <div className="flex-1 p-6 flex flex-col gap-6 max-w-[1400px] w-full mx-auto">
        {/* Class Tabs */}
        <div className="flex items-center justify-center gap-3 bg-slate-900/60 p-2 rounded-2xl border border-slate-800">
          {[
            { key: "acolyte", label: "1st Job Change" },
            { key: "priest", label: "2nd Job Change" },
            { key: "high_priest", label: "High Class" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 ${
                activeTab === tab.key
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/50"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
              }`}
            >
              {tab.label}
              <span className="text-xs bg-slate-950 px-2.5 py-0.5 rounded-full border border-slate-800">
                {getTabPoints(tab.key)}/40
              </span>
            </button>
          ))}
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-12 gap-6 flex-1">
          {/* Left Summary Sidebar */}
          <div className="col-span-12 lg:col-span-3 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between items-center text-center">
            <div className="w-full flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-amber-500/10 border-2 border-amber-500 flex items-center justify-center text-4xl mb-4">
                ✝️
              </div>
              <h2 className="text-xl font-bold text-slate-100 mb-1">
                {activeTab === "acolyte" && "Acolyte"}
                {activeTab === "priest" && "Priest"}
                {activeTab === "high_priest" && "High Priest"}
              </h2>
              <p className="text-xs text-slate-400 mb-6">Support & Holy Magic Specialist</p>

              <div className="w-32 h-32 rounded-full border-4 border-amber-500/30 flex flex-col items-center justify-center bg-slate-950 mb-6">
                <span className="text-xs text-slate-400">Skill Points</span>
                <span className="text-2xl font-black text-amber-400">
                  {getTabPoints(activeTab)}/40
                </span>
              </div>

              <div className="w-full bg-slate-950 rounded-xl p-4 border border-slate-800 mb-4">
                <span className="text-xs text-slate-400 block mb-1">Skill Point ที่เหลือ</span>
                <span className="text-xl font-bold text-emerald-400">{remainingPoints} Points</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSkills(INITIAL_SKILLS);
                setRemainingPoints(10);
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 transition text-sm flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> รีเซ็ต Skill Points
            </button>
          </div>

          {/* Right Skill Grid */}
          <div className="col-span-12 lg:col-span-9 bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {(skills[activeTab] || []).map((skill) => {
                const isMax = skill.currentLv === skill.maxLv;
                return (
                  <div
                    key={skill.id}
                    className={`relative flex flex-col items-center p-4 rounded-xl border transition ${
                      isMax
                        ? "bg-amber-950/20 border-amber-500"
                        : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div
                      className={`absolute -top-3 px-3 py-0.5 rounded-full text-xs font-bold ${
                        isMax ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {skill.currentLv}/{skill.maxLv}
                    </div>

                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mt-2 mb-3 bg-slate-900 border border-slate-800">
                      {skill.icon}
                    </div>

                    <span className="text-xs font-semibold text-slate-200 text-center mb-3 h-8 flex items-center">
                      {skill.name}
                    </span>

                    <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-lg border border-slate-800">
                      <button
                        onClick={() => handleLevelChange(activeTab, skill.id, -1)}
                        disabled={skill.currentLv === 0}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-amber-400 px-2">
                        {skill.currentLv}
                      </span>
                      <button
                        onClick={() => handleLevelChange(activeTab, skill.id, 1)}
                        disabled={skill.currentLv === skill.maxLv || remainingPoints === 0}
                        className="p-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold disabled:opacity-30"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}