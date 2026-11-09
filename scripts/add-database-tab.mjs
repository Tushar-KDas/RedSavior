import fs from 'fs';

const filePath = 'src/app/dashboard/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Imports
if (!content.includes('Database,')) {
  content = content.replace(
    /Eye,\s*\}\s*from\s*["']lucide-react["'];/,
    `Eye,\n  Database,\n  Server,\n  Copy,\n  ExternalLink,\n} from "lucide-react";`
  );
}

// 2. State & Functions
const stateHookTarget = `const [requestStatusFilter, setRequestStatusFilter] = useState<string>("ALL");`;
const dbStateAndFuncs = `const [requestStatusFilter, setRequestStatusFilter] = useState<string>("ALL");

  // Supabase Database Connection State
  const [supabaseStatus, setSupabaseStatus] = useState<{
    connected: boolean;
    mode: string;
    message: string;
    url?: string;
  } | null>(null);
  const [supabaseUrlInput, setSupabaseUrlInput] = useState("");
  const [supabaseAnonKeyInput, setSupabaseAnonKeyInput] = useState("");
  const [supabaseServiceKeyInput, setSupabaseServiceKeyInput] = useState("");
  const [isTestingDb, setIsTestingDb] = useState(false);
  const [dbMessage, setDbMessage] = useState<string | null>(null);
  const [dbSuccess, setDbSuccess] = useState<boolean | null>(null);
  const [copiedSqlType, setCopiedSqlType] = useState<string | null>(null);

  const fetchDbStatus = async () => {
    try {
      const res = await fetch("/api/supabase/status");
      const data = await res.json();
      setSupabaseStatus(data);
      if (data.url && !data.url.includes("mock")) {
        setSupabaseUrlInput(data.url);
      }
    } catch {
      setSupabaseStatus({
        connected: false,
        mode: "mock",
        message: "Offline Local Store active",
      });
    }
  };

  useEffect(() => {
    fetchDbStatus();
  }, []);

  const handleSaveSupabaseConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTestingDb(true);
    setDbMessage(null);

    try {
      const res = await fetch("/api/supabase/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: supabaseUrlInput,
          anonKey: supabaseAnonKeyInput,
          serviceKey: supabaseServiceKeyInput,
        }),
      });
      const data = await res.json();
      setDbSuccess(data.success);
      setDbMessage(data.message);
      if (data.success) {
        fetchDbStatus();
      }
    } catch (err: any) {
      setDbSuccess(false);
      setDbMessage(err.message || "Failed to update configuration");
    } finally {
      setIsTestingDb(false);
    }
  };

  const handleCopySql = async (type: "schema" | "geo") => {
    try {
      const res = await fetch(\`/api/supabase/sql?type=\${type}\`);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopiedSqlType(type);
      setTimeout(() => setCopiedSqlType(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };`;

if (!content.includes('supabaseStatus')) {
  content = content.replace(stateHookTarget, dbStateAndFuncs);
}

// 3. Sidebar Nav Button
const auditButtonTarget = `<span>Audit Logs</span>\n            </button>`;
const auditButtonTargetCRLF = `<span>Audit Logs</span>\r\n            </button>`;
const dbNavButton = `<span>Audit Logs</span>
            </button>

            <button
              onClick={() => setActiveTab("database")}
              className={\`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition \${
                activeTab === "database"
                  ? "bg-[#E50914] text-white"
                  : "text-gray-400 hover:text-white hover:bg-slate-800/60"
              }\`}
            >
              <Database className="w-4 h-4" />
              <div className="flex items-center justify-between w-full">
                <span>Database (Supabase)</span>
                <span
                  className={\`w-2 h-2 rounded-full \${
                    supabaseStatus?.connected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                  }\`}
                />
              </div>
            </button>`;

if (!content.includes('setActiveTab("database")')) {
  if (content.includes(auditButtonTarget)) {
    content = content.replace(auditButtonTarget, dbNavButton);
  } else if (content.includes(auditButtonTargetCRLF)) {
    content = content.replace(auditButtonTargetCRLF, dbNavButton);
  }
}

// 4. Tab Content
const bottomImpactBannerTarget = `{/* =========================================================================\n              BOTTOM BAR: NATIONWIDE IMPACT FOOTPRINT`;
const bottomImpactBannerTargetCRLF = `{/* =========================================================================\r\n              BOTTOM BAR: NATIONWIDE IMPACT FOOTPRINT`;

const databaseTabContent = `{/* =========================================================================
              TAB: DATABASE & SUPABASE CONNECTION
              ========================================================================= */}
          {activeTab === "database" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                <div>
                  <div className="flex items-center gap-2 text-[#E50914] text-xs font-bold uppercase tracking-wider mb-1">
                    <Database className="w-4 h-4 text-[#E50914]" />
                    <span>Database Architecture & Cloud Integration</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                    Supabase PostgreSQL Connection Manager
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Manage direct PostgreSQL connection, run schema migrations, and sync nationwide blood network data.
                  </p>
                </div>

                <button
                  onClick={fetchDbStatus}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition self-start sm:self-auto"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh Status</span>
                </button>
              </div>

              {/* Status Banner */}
              <div
                className={\`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 \${
                  supabaseStatus?.connected
                    ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                    : "bg-amber-50 border-amber-200 text-amber-900"
                }\`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={\`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 \${
                      supabaseStatus?.connected
                        ? "bg-emerald-600 text-white"
                        : "bg-amber-500 text-white"
                    }\`}
                  >
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-sm sm:text-base flex items-center gap-2">
                      <span>
                        {supabaseStatus?.connected
                          ? "✓ Live Supabase Cloud Database Connected"
                          : "⚠️ Local In-Memory / Offline Store Active"}
                      </span>
                      <span
                        className={\`text-[10px] font-black uppercase px-2 py-0.5 rounded-full \${
                          supabaseStatus?.connected
                            ? "bg-emerald-200 text-emerald-800"
                            : "bg-amber-200 text-amber-800"
                        }\`}
                      >
                        {supabaseStatus?.mode || "MOCK"}
                      </span>
                    </div>
                    <p className="text-xs mt-1 opacity-90">
                      {supabaseStatus?.message ||
                        "Running in local store mode. To link your live Supabase cloud project, fill out the connection form below."}
                    </p>
                  </div>
                </div>

                {supabaseStatus?.url && (
                  <div className="text-xs font-mono font-bold bg-white/60 px-3 py-1.5 rounded-lg border border-black/5">
                    {supabaseStatus.url}
                  </div>
                )}
              </div>

              {/* Alert message if just updated */}
              {dbMessage && (
                <div
                  className={\`p-4 rounded-xl text-xs font-bold border \${
                    dbSuccess
                      ? "bg-emerald-100 border-emerald-300 text-emerald-900"
                      : "bg-red-100 border-red-300 text-red-900"
                  }\`}
                >
                  {dbMessage}
                </div>
              )}

              {/* Connection Form */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form Column (7 cols) */}
                <form
                  onSubmit={handleSaveSupabaseConfig}
                  className="lg:col-span-7 space-y-4 bg-gray-50/70 p-6 rounded-2xl border border-gray-200"
                >
                  <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    <Settings className="w-4 h-4 text-[#E50914]" />
                    <span>Connect Live Cloud Project</span>
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Supabase Project URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      required
                      value={supabaseUrlInput}
                      onChange={(e) => setSupabaseUrlInput(e.target.value)}
                      placeholder="https://xyzproject.supabase.co"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                    />
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      Found in Supabase Dashboard → Project Settings → API → Project URL
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Supabase Anon / Public Key <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={supabaseAnonKeyInput}
                      onChange={(e) => setSupabaseAnonKeyInput(e.target.value)}
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                    />
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      Found in Supabase Dashboard → Project Settings → API → Project API keys → anon / public
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Supabase Service Role Key (Optional / Admin Only)
                    </label>
                    <textarea
                      rows={2}
                      value={supabaseServiceKeyInput}
                      onChange={(e) => setSupabaseServiceKeyInput(e.target.value)}
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (service_role)"
                      className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                    />
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      Required only for administrative bypass and automated database migrations.
                    </span>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={isTestingDb}
                      className="px-6 py-2.5 bg-[#E50914] text-white rounded-xl text-xs font-black hover:bg-[#B80012] shadow-md shadow-red-600/20 transition disabled:opacity-50 flex items-center gap-2"
                    >
                      {isTestingDb && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                      <span>{isTestingDb ? "Connecting & Verifying..." : "Save & Connect Database"}</span>
                    </button>

                    <a
                      href="https://supabase.com/dashboard"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-100 transition"
                    >
                      <span>Open Supabase Dashboard</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </form>

                {/* SQL Scripts & Instructions Column (5 cols) */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                      <Sparkles className="w-4 h-4" />
                      <span>One-Click SQL Migrations</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      Run these two scripts in your Supabase SQL Editor to initialize all 22 tables, RLS security rules, and seed all 64 districts of Bangladesh.
                    </p>

                    <div className="space-y-2 pt-1">
                      <button
                        onClick={() => handleCopySql("schema")}
                        className="w-full py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center justify-between border border-white/10 transition"
                      >
                        <span className="flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-red-400" />
                          <span>1. Initial Schema SQL (22 Tables)</span>
                        </span>
                        {copiedSqlType === "schema" ? (
                          <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                            <Check className="w-3 h-3" /> Copied!
                          </span>
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-gray-400" />
                        )}
                      </button>

                      <button
                        onClick={() => handleCopySql("geo")}
                        className="w-full py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center justify-between border border-white/10 transition"
                      >
                        <span className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                          <span>2. Bangladesh Geo Seed (64 Districts)</span>
                        </span>
                        {copiedSqlType === "geo" ? (
                          <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                            <Check className="w-3 h-3" /> Copied!
                          </span>
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-gray-400" />
                        )}
                      </button>
                    </div>

                    <a
                      href="https://supabase.com/dashboard/project/_/sql"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition mt-2 inline-block text-center"
                    >
                      <span>Open Supabase SQL Editor</span>
                      <ExternalLink className="w-3.5 h-3.5 inline ml-1" />
                    </a>
                  </div>

                  {/* Quick Guide */}
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs space-y-2">
                    <div className="font-bold text-gray-900">সহজ নির্দেশিকা (Easy 3-Step Guide):</div>
                    <ol className="list-decimal list-inside space-y-1 text-gray-600 text-[11px] leading-relaxed">
                      <li><strong>Supabase.com</strong> এ প্রজেক্ট তৈরি করুন (সিঙ্গাপুর বা মুম্বাই অঞ্চল সেরা)।</li>
                      <li><strong>Project Settings → API</strong> থেকে Project URL ও anon key কপি করে ফর্মে পেস্ট করুন।</li>
                      <li>উপরে দেওয়া SQL স্ক্রিপ্ট দুটি <strong>SQL Editor</strong> এ পেস্ট করে Run করুন।</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}

          ` + bottomImpactBannerTarget;

if (!content.includes('activeTab === "database"')) {
  if (content.includes(bottomImpactBannerTarget)) {
    content = content.replace(bottomImpactBannerTarget, databaseTabContent);
  } else if (content.includes(bottomImpactBannerTargetCRLF)) {
    content = content.replace(bottomImpactBannerTargetCRLF, databaseTabContent);
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully added Database tab to dashboard!');
