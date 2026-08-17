"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  Plus,
  Sword,
  Footprints,
  Activity,
  Wand2,
  Crosshair,
  Clover,
  Minus,
  X,
  Edit2,
  Trash2,
  RotateCcw,
  FlaskConical,
  Cross,
  Music,
} from "lucide-react";

interface Stats {
  str: number;
  agi: number;
  vit: number;
  int: number;
  dex: number;
  luk: number;
}

interface SkillNode {
  id: string;
  name: string;
  maxLevel: number;
}

interface JobCategory {
  jobName: string;
  maxPoints: number;
  skills: SkillNode[];
}

interface ClassSkillTree {
  className: string;
  icon: React.ReactNode;
  firstJob: JobCategory;
  secondJob: JobCategory;
  highClass: JobCategory;
}

interface Build {
  id: string;
  name: string;
  jobClass: string;
  baseLevel: number;
  jobLevel: number;
  stats: Stats;
  skills: Record<string, number>;
}

// -------------------------------------------------------------
// ฐานข้อมูลสกิล: High Priest, Biochemist, และ Minstrel
// -------------------------------------------------------------
const classSkillTrees: Record<string, ClassSkillTree> = {
  Minstrel: {
    className: "Minstrel",
    icon: <Music className="w-8 h-8 text-pink-400" />,
    firstJob: {
      jobName: "Archer",
      maxPoints: 40,
      skills: [
        { id: "double_strafe", name: "Double Strafe", maxLevel: 10 },
        { id: "owls_eye", name: "Owl's Eye", maxLevel: 10 },
        { id: "vultures_eye", name: "Vulture's Eye", maxLevel: 10 },
        { id: "fetter_arrow", name: "Fetter Arrow", maxLevel: 10 },
        { id: "arrow_shower", name: "Arrow Shower", maxLevel: 10 },
        { id: "steady_focus", name: "Steady Focus", maxLevel: 10 },
      ],
    },
    secondJob: {
      jobName: "Bard",
      maxPoints: 40,
      skills: [
        { id: "amp", name: "Amp", maxLevel: 5 },
        { id: "instrument_controller", name: "Instrument Controller", maxLevel: 5 },
        { id: "blow_whistle", name: "Blow Whistle", maxLevel: 10 },
        { id: "song_of_lutie", name: "Song of Lutie", maxLevel: 10 },
        { id: "encore", name: "Encore", maxLevel: 5 },
        { id: "fantasy_music", name: "Fantasy Music", maxLevel: 5 },
        { id: "unchained_serenade", name: "Unchained Serenade", maxLevel: 5 },
        { id: "magic_strings", name: "Magic Strings", maxLevel: 5 },
        { id: "cold_joke", name: "Cold Joke", maxLevel: 5 },
        { id: "melody_strike", name: "Melody Strike", maxLevel: 10 },
        { id: "impressive_riff", name: "Impressive Riff", maxLevel: 5 },
        { id: "lullaby", name: "Lullaby", maxLevel: 5 },
      ],
    },
    highClass: {
      jobName: "Minstrel",
      maxPoints: 40,
      skills: [
        { id: "death_valley", name: "Death Valley", maxLevel: 1 },
        { id: "music_mastery", name: "Music Mastery", maxLevel: 10 },
        { id: "dont_hold_me_back", name: "Don't Hold Me Back", maxLevel: 5 },
        { id: "battle_theme", name: "Battle Theme", maxLevel: 5 },
        { id: "final_rhapsody", name: "Final Rhapsody", maxLevel: 5 },
        { id: "puppet_masters_trick", name: "Puppet Master's Trick", maxLevel: 5 },
        { id: "arrow_vulcan", name: "Arrow Vulcan", maxLevel: 10 },
        { id: "lokis_lament", name: "Loki's Lament", maxLevel: 1 },
        { id: "undead_god_siegfried", name: "Undead God Siegfried", maxLevel: 3 },
        { id: "eternal_chaos", name: "Eternal Chaos", maxLevel: 3 },
        { id: "puppet_dance", name: "Puppet Dance", maxLevel: 5 },
        { id: "sincere_sound", name: "Sincere Sound", maxLevel: 5 },
        { id: "curtain_call", name: "Curtain Call", maxLevel: 1 },
        { id: "joyful_notes", name: "Joyful Notes", maxLevel: 1 },
        { id: "nibelungans_ring", name: "Nibelungan's Ring", maxLevel: 3 },
      ],
    },
  },

  Biochemist: {
    className: "Biochemist",
    icon: <FlaskConical className="w-8 h-8 text-blue-400" />,
    firstJob: {
      jobName: "Merchant",
      maxPoints: 40,
      skills: [
        { id: "pushcart", name: "Pushcart", maxLevel: 10 },
        { id: "mammonite", name: "Mammonite", maxLevel: 10 },
        { id: "enlarge_weight", name: "Enlarge Weight Limit", maxLevel: 10 },
        { id: "crazy_uproar", name: "Crazy Uproar", maxLevel: 10 },
        { id: "cart_revolution", name: "Cart Revolution", maxLevel: 1 },
        { id: "slamming_smash", name: "Slamming Smash", maxLevel: 5 },
        { id: "discount", name: "Discount", maxLevel: 10 },
        { id: "cart_clash", name: "Cart Clash", maxLevel: 10 },
        { id: "change_cart", name: "Change Cart", maxLevel: 10 },
        { id: "overcharge", name: "Overcharge", maxLevel: 10 },
      ],
    },
    secondJob: {
      jobName: "Alchemist",
      maxPoints: 40,
      skills: [
        { id: "potion_making", name: "ปรุงยา", maxLevel: 10 },
        { id: "acid_terror", name: "Acid Terror", maxLevel: 10 },
        { id: "hammer_axe_mastery", name: "Hammer Axe Mastery", maxLevel: 10 },
        { id: "demonstration", name: "Demonstration", maxLevel: 5 },
        { id: "chem_armor_prot", name: "Chemistry Armor Protection", maxLevel: 5 },
        { id: "learning_potion", name: "Learning Potion", maxLevel: 5 },
        { id: "bottle_grenade_enh", name: "Bottle Grenade Enhancement", maxLevel: 5 },
        { id: "marine_sphere", name: "Marine Sphere Summon", maxLevel: 10 },
        { id: "chem_weapon_prot", name: "Chemistry Weapon Protection", maxLevel: 5 },
      ],
    },
    highClass: {
      jobName: "Biochemist",
      maxPoints: 40,
      skills: [
        { id: "acid_demonstration", name: "Acid Demonstration", maxLevel: 10 },
        { id: "bio_cannibalize", name: "Bio Cannibalize", maxLevel: 5 },
        { id: "all_chem_weapon_prot", name: "All Chemistry Weapon Protection", maxLevel: 5 },
        { id: "unstable_research", name: "Unstable Research", maxLevel: 5 },
        { id: "hells_plant", name: "Hell's Plant", maxLevel: 5 },
        { id: "survival_food", name: "Survival Food", maxLevel: 5 },
        { id: "cart_burst", name: "Cart Burst", maxLevel: 5 },
        { id: "corrosion_research", name: "Corrosion Research", maxLevel: 5 },
        { id: "adv_axe_mace_mastery", name: "Advanced Axe/Mace Mastery", maxLevel: 5 },
        { id: "howling_mandragora", name: "Howling of Mandragora", maxLevel: 5 },
        { id: "lab_accident", name: "Lab Accident", maxLevel: 1 },
      ],
    },
  },

  "High Priest": {
    className: "High Priest",
    icon: <Cross className="w-8 h-8 text-amber-400" />,
    firstJob: {
      jobName: "Acolyte",
      maxPoints: 40,
      skills: [
        { id: "heal", name: "Heal", maxLevel: 10 },
        { id: "blessing", name: "Blessing", maxLevel: 10 },
        { id: "increase_agi", name: "Increase AGI", maxLevel: 10 },
        { id: "cure", name: "Cure", maxLevel: 1 },
        { id: "ruwach", name: "Ruwach", maxLevel: 1 },
        { id: "pneuma", name: "Pneuma", maxLevel: 1 },
        { id: "teleport", name: "Teleportation", maxLevel: 2 },
        { id: "warp", name: "Warp Portal", maxLevel: 4 },
        { id: "holy_light", name: "Holy Light", maxLevel: 1 },
        { id: "signum_crucis", name: "Signum Crucis", maxLevel: 10 },
      ],
    },
    secondJob: {
      jobName: "Priest",
      maxPoints: 40,
      skills: [
        { id: "kyrie", name: "Kyrie Eleison", maxLevel: 10 },
        { id: "magnificat", name: "Magnificat", maxLevel: 5 },
        { id: "gloria", name: "Gloria", maxLevel: 5 },
        { id: "sanctuary", name: "Sanctuary", maxLevel: 10 },
        { id: "resurrection", name: "Resurrection", maxLevel: 4 },
        { id: "impositio", name: "Impositio Manus", maxLevel: 5 },
        { id: "suffragium", name: "Suffragium", maxLevel: 3 },
        { id: "turn_undead", name: "Turn Undead", maxLevel: 10 },
        { id: "lex_divina", name: "Lex Divina", maxLevel: 5 },
        { id: "lex_aeterna", name: "Lex Aeterna", maxLevel: 1 },
      ],
    },
    highClass: {
      jobName: "High Priest",
      maxPoints: 40,
      skills: [
        { id: "assumptio", name: "Assumptio", maxLevel: 5 },
        { id: "basilica", name: "Basilica", maxLevel: 5 },
        { id: "meditatio", name: "Meditatio", maxLevel: 10 },
        { id: "mana_recharge", name: "Mana Recharge", maxLevel: 5 },
        { id: "judex", name: "Judex", maxLevel: 10 },
        { id: "safety_wall", name: "Safety Wall", maxLevel: 10 },
      ],
    },
  },
};

const initialBuilds: Build[] = [
  {
    id: "1",
    name: "Minstrel - Support/Buff",
    jobClass: "Minstrel",
    baseLevel: 90,
    jobLevel: 40,
    stats: { str: 1, agi: 1, vit: 50, int: 99, dex: 70, luk: 1 },
    skills: { double_strafe: 10, owls_eye: 10, vultures_eye: 10, steady_focus: 10, blow_whistle: 10, magic_strings: 5, death_valley: 1, music_mastery: 10, dont_hold_me_back: 5, battle_theme: 5, puppet_masters_trick: 5, puppet_dance: 5, sincere_sound: 5, curtain_call: 1, joyful_notes: 1 },
  },
  {
    id: "2",
    name: "Biochemist - Acid/Plant",
    jobClass: "Biochemist",
    baseLevel: 90,
    jobLevel: 40,
    stats: { str: 1, agi: 1, vit: 50, int: 99, dex: 70, luk: 1 },
    skills: { acid_demonstration: 10, hells_plant: 5 },
  },
  {
    id: "3",
    name: "พระ PVE (Full Support)",
    jobClass: "High Priest",
    baseLevel: 90,
    jobLevel: 40,
    stats: { str: 1, agi: 1, vit: 80, int: 99, dex: 40, luk: 1 },
    skills: { heal: 10, blessing: 10, kyrie: 10, assumptio: 5 },
  },
];

const statConfig: Record<
  keyof Stats,
  { label: string; icon: React.ReactNode; color: string }
> = {
  str: { label: "STR", icon: <Sword className="w-5 h-5" />, color: "text-red-400" },
  agi: { label: "AGI", icon: <Footprints className="w-5 h-5" />, color: "text-blue-400" },
  vit: { label: "VIT", icon: <Activity className="w-5 h-5" />, color: "text-emerald-400" },
  int: { label: "INT", icon: <Wand2 className="w-5 h-5" />, color: "text-purple-400" },
  dex: { label: "DEX", icon: <Crosshair className="w-5 h-5" />, color: "text-amber-400" },
  luk: { label: "LUK", icon: <Clover className="w-5 h-5" />, color: "text-teal-400" },
};

const jobOptions = ["Minstrel", "Biochemist", "High Priest"];

const STORAGE_KEY = "ro_origin_builds_v4";
const ACTIVE_BUILD_KEY = "ro_origin_active_build_id_v4";

export default function Dashboard() {
  const [builds, setBuilds] = useState<Build[]>(initialBuilds);
  const [activeBuildId, setActiveBuildId] = useState<string>(initialBuilds[0].id);
  const [activeTab, setActiveTab] = useState<"skills" | "stats">("skills");
  const [skillJobTab, setSkillJobTab] = useState<"firstJob" | "secondJob" | "highClass">("highClass");
  const [isLoaded, setIsLoaded] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBuildId, setEditingBuildId] = useState<string | null>(null);
  const [formName, setFormName] = useState("");
  const [formJobClass, setFormJobClass] = useState(jobOptions[0]);

  useEffect(() => {
    const savedBuilds = localStorage.getItem(STORAGE_KEY);
    const savedActiveId = localStorage.getItem(ACTIVE_BUILD_KEY);

    if (savedBuilds) {
      try {
        const parsed = JSON.parse(savedBuilds);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBuilds(parsed);
          if (savedActiveId && parsed.some((b: Build) => b.id === savedActiveId)) {
            setActiveBuildId(savedActiveId);
          } else {
            setActiveBuildId(parsed[0].id);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(builds));
    }
  }, [builds, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(ACTIVE_BUILD_KEY, activeBuildId);
    }
  }, [activeBuildId, isLoaded]);

  const activeBuild = builds.find((b) => b.id === activeBuildId) || builds[0];

  const currentTree = classSkillTrees[activeBuild.jobClass] || classSkillTrees["Minstrel"];
  const currentCategory = currentTree[skillJobTab];

  const getTabAllocatedPoints = (tabKey: "firstJob" | "secondJob" | "highClass") => {
    const category = currentTree[tabKey];
    return category.skills.reduce((sum, s) => sum + (activeBuild.skills?.[s.id] || 0), 0);
  };

  const handleStatChange = (statKey: keyof Stats, value: number) => {
    const newValue = Math.max(1, Math.min(99, value || 1));
    setBuilds((prev) =>
      prev.map((b) =>
        b.id === activeBuildId
          ? { ...b, stats: { ...b.stats, [statKey]: newValue } }
          : b
      )
    );
  };

  const handleSkillChange = (skillId: string, delta: number, maxLevel: number) => {
    const currentLevel = activeBuild.skills?.[skillId] || 0;
    const newLevel = Math.max(0, Math.min(maxLevel, currentLevel + delta));

    setBuilds((prev) =>
      prev.map((b) =>
        b.id === activeBuildId
          ? {
              ...b,
              skills: { ...b.skills, [skillId]: newLevel },
            }
          : b
      )
    );
  };

  const handleResetSkillTab = () => {
    const targetSkills = currentCategory.skills;
    setBuilds((prev) =>
      prev.map((b) => {
        if (b.id !== activeBuildId) return b;
        const updatedSkills = { ...b.skills };
        targetSkills.forEach((s) => {
          updatedSkills[s.id] = 0;
        });
        return { ...b, skills: updatedSkills };
      })
    );
  };

  const handleOpenCreateModal = () => {
    setEditingBuildId(null);
    setFormName("");
    setFormJobClass(jobOptions[0]);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (build: Build) => {
    setEditingBuildId(build.id);
    setFormName(build.name);
    setFormJobClass(build.jobClass);
    setIsModalOpen(true);
  };

  const handleSaveBuild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingBuildId) {
      setBuilds((prev) =>
        prev.map((b) =>
          b.id === editingBuildId
            ? { ...b, name: formName.trim(), jobClass: formJobClass }
            : b
        )
      );
    } else {
      const newBuild: Build = {
        id: Date.now().toString(),
        name: formName.trim(),
        jobClass: formJobClass,
        baseLevel: 90,
        jobLevel: 40,
        stats: { str: 1, agi: 1, vit: 1, int: 1, dex: 1, luk: 1 },
        skills: {},
      };
      setBuilds((prev) => [...prev, newBuild]);
      setActiveBuildId(newBuild.id);
    }
    setIsModalOpen(false);
  };

  const handleDeleteBuild = (id: string) => {
    if (builds.length <= 1) return alert("ต้องมีอย่างน้อย 1 Build ครับ");
    const nextBuilds = builds.filter((b) => b.id !== id);
    setBuilds(nextBuilds);
    if (activeBuildId === id) setActiveBuildId(nextBuilds[0].id);
  };

  if (!isLoaded || !activeBuild) {
    return <div className="h-screen bg-slate-950 text-slate-100 flex items-center justify-center">Loading...</div>;
  }

  const allocatedPoints = getTabAllocatedPoints(skillJobTab);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-80 border-r border-slate-800 bg-slate-900/50 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-6 text-amber-400 font-bold text-lg">
            <Sparkles className="w-5 h-5" />
            <span>RO Origin Build Hub</span>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Saved Builds</p>
            {builds.map((build) => (
              <div
                key={build.id}
                className={`group relative flex items-center rounded-xl border transition ${
                  activeBuildId === build.id
                    ? "bg-amber-500/10 border-amber-500/50 text-amber-300"
                    : "bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <button onClick={() => setActiveBuildId(build.id)} className="w-full text-left p-3 pr-16">
                  <div className="font-semibold truncate">{build.name}</div>
                  <div className="text-xs text-slate-400">{build.jobClass} • Lv.{build.baseLevel}</div>
                </button>
                <div className="absolute right-2 flex items-center gap-1 opacity-90 group-hover:opacity-100">
                  <button onClick={() => handleOpenEditModal(build)} className="p-1.5 hover:bg-slate-700/80 text-slate-400 hover:text-amber-400 rounded-lg">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  {builds.length > 1 && (
                    <button onClick={() => handleDeleteBuild(build.id)} className="p-1.5 hover:bg-slate-700/80 text-slate-400 hover:text-red-400 rounded-lg">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleOpenCreateModal} className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition">
          <Plus className="w-4 h-4" /> สร้าง Build ใหม่
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">{activeBuild.jobClass}</span>
              <h1 className="text-2xl font-bold mt-1">{activeBuild.name}</h1>
            </div>

            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab("skills")}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition ${activeTab === "skills" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-slate-100"}`}
              >
                Skill Tree
              </button>
              <button
                onClick={() => setActiveTab("stats")}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition ${activeTab === "stats" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-slate-100"}`}
              >
                Status
              </button>
            </div>
          </div>

          {/* TAB 1: SKILL TREE */}
          {activeTab === "skills" && (
            <div className="space-y-4">
              <div className="flex gap-2 border-b border-slate-800 pb-3">
                <button
                  onClick={() => setSkillJobTab("firstJob")}
                  className={`px-5 py-2 rounded-xl font-bold text-sm transition ${skillJobTab === "firstJob" ? "bg-blue-600 text-white shadow-lg" : "bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800"}`}
                >
                  1st Job ({currentTree.firstJob.jobName})
                </button>
                <button
                  onClick={() => setSkillJobTab("secondJob")}
                  className={`px-5 py-2 rounded-xl font-bold text-sm transition ${skillJobTab === "secondJob" ? "bg-blue-600 text-white shadow-lg" : "bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800"}`}
                >
                  2nd Job ({currentTree.secondJob.jobName})
                </button>
                <button
                  onClick={() => setSkillJobTab("highClass")}
                  className={`px-5 py-2 rounded-xl font-bold text-sm transition ${skillJobTab === "highClass" ? "bg-blue-600 text-white shadow-lg" : "bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800"}`}
                >
                  High Class ({currentTree.highClass.jobName})
                </button>
              </div>

              {/* Skill Tree Panel */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
                <div className="md:col-span-1 bg-slate-950 border border-slate-800 p-5 rounded-xl flex flex-col justify-between items-center text-center">
                  <div>
                    <div className="p-3 bg-blue-500/10 rounded-full mb-3 inline-block">
                      {currentTree.icon}
                    </div>
                    <h3 className="font-bold text-lg text-slate-200">{currentCategory.jobName}</h3>
                    <p className="text-xs text-slate-400 mt-1">Skill Points ที่จัดสรรแล้ว</p>
                    
                    <div className="my-4 w-24 h-24 rounded-full border-4 border-blue-500 flex items-center justify-center mx-auto bg-blue-500/5">
                      <span className="text-xl font-extrabold text-blue-400">{allocatedPoints}/{currentCategory.maxPoints}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleResetSkillTab}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-800 hover:bg-red-500/20 hover:text-red-400 border border-slate-700 hover:border-red-500/50 rounded-xl text-xs font-bold transition"
                  >
                    <RotateCcw className="w-4 h-4" /> Reset สกิลหน้านี้
                  </button>
                </div>

                {/* Skill List Grid */}
                <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                  {currentCategory.skills.map((skill) => {
                    const currentLvl = activeBuild.skills?.[skill.id] || 0;

                    return (
                      <div
                        key={skill.id}
                        className={`p-3 rounded-xl border flex flex-col justify-between transition ${
                          currentLvl > 0 ? "bg-slate-900 border-amber-500/50 shadow-md" : "bg-slate-950/60 border-slate-850 opacity-70"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-xs text-slate-200 leading-tight">{skill.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-mono font-bold ${currentLvl === skill.maxLevel ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-amber-400"}`}>
                            {currentLvl}/{skill.maxLevel}
                          </span>
                        </div>

                        <div className="flex items-center justify-end gap-1 mt-2">
                          <button
                            onClick={() => handleSkillChange(skill.id, -1, skill.maxLevel)}
                            className="w-7 h-7 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center text-slate-300 font-bold"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleSkillChange(skill.id, 1, skill.maxLevel)}
                            className="w-7 h-7 bg-amber-500 hover:bg-amber-600 rounded-lg flex items-center justify-center text-slate-950 font-bold"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STATS */}
          {activeTab === "stats" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(Object.keys(statConfig) as Array<keyof Stats>).map((statKey) => {
                const config = statConfig[statKey];
                const val = activeBuild.stats[statKey];

                return (
                  <div key={statKey} className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 bg-slate-800/80 rounded-lg ${config.color}`}>{config.icon}</div>
                      <span className="font-bold text-slate-300 tracking-wider">{config.label}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={() => handleStatChange(statKey, val - 1)} className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 font-bold">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <input
                        type="number"
                        value={val}
                        onChange={(e) => handleStatChange(statKey, parseInt(e.target.value) || 1)}
                        className="w-16 text-center font-mono font-bold text-xl text-amber-400 bg-slate-950 border border-slate-800 rounded-lg py-1 focus:outline-none"
                        min={1}
                        max={99}
                      />
                      <button onClick={() => handleStatChange(statKey, val + 1)} className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 font-bold">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-amber-400">{editingBuildId ? "แก้ไข Build" : "สร้าง Build ใหม่"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-100 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBuild} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">ชื่อ Build</label>
                <input
                  type="text"
                  placeholder="เช่น Minstrel - Support"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">อาชีพ (Class)</label>
                <select
                  value={formJobClass}
                  onChange={(e) => setFormJobClass(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-amber-500"
                >
                  {jobOptions.map((job) => (
                    <option key={job} value={job}>{job}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold">
                  ยกเลิก
                </button>
                <button type="submit" className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl">
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}