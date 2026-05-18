import React, { useState } from "react";

// ─── THEME ────────────────────────────────────────────────────────────────────
const C = {
  navy: "#0D1B3E", navyLight: "#1a2a50",
  blue: "#3B82F6", blueDark: "#2563EB", blueLight: "#93C5FD",
  bg: "#F0F4FF", white: "#FFFFFF",
  gray: "#64748B", grayLight: "#CBD5E1", grayXLight: "#E8EEF8",
  success: "#059669", successBg: "#ECFDF5",
  warning: "#D97706", warningBg: "#FFFBEB",
  error: "#DC2626", errorBg: "#FEF2F2",
  inputBg: "#F8FAFF",
};

const font = "'DM Sans', sans-serif";
const fontDisplay = "'Syne', sans-serif";

// ─── DEMO DATA ────────────────────────────────────────────────────────────────
const USERS = [
  { id: 1, email: "matt@zebratack.be", password: "futsal123", role: "capitaine", name: "Matt R.", initials: "MR", team: "Zebratack Charleroi", division: "P2 BFA", stats: { joues: 8, victoires: 5, nuls: 2, defaites: 1 } },
  { id: 2, email: "gerant@jumet.be", password: "salle123", role: "gerant", name: "Marc D.", initials: "MD", salle: "Salle Omnisports Jumet", terrains: 2 },
];

const SALLES = [
  { id: 1, nom: "Salle Omnisports Jumet", adresse: "Rue du Sport 12, Jumet", distance: "1.2 km", terrains: 2, prix: 60, note: 4.8, tags: ["Vestiaires", "Parking", "Douches"], dispoSoir: true },
  { id: 2, nom: "Centre Sportif Gilly", adresse: "Avenue Centrale 8, Gilly", distance: "3.5 km", terrains: 1, prix: 55, note: 4.5, tags: ["Vestiaires"], dispoSoir: true },
  { id: 3, nom: "Hall Sportif Châtelet", adresse: "Rue de Châtelet 45", distance: "6.1 km", terrains: 3, prix: 50, note: 4.3, tags: ["Parking", "Cafétéria"], dispoSoir: true },
  { id: 4, nom: "Complexe Farciennes", adresse: "Chemin du Stade 3, Farciennes", distance: "8.4 km", terrains: 2, prix: 45, note: 4.1, tags: ["Vestiaires", "Parking"], dispoSoir: false },
];

const DEFIS = [
  { id: 1, equipe: "FC Marchienne", initiales: "FM", division: "P2 BFA", salle: "Salle Jumet", heure: "Ce soir 20h00", urgent: true, couleur: C.errorBg, textColor: C.error },
  { id: 2, equipe: "US Gilly Futsal", initiales: "UG", division: "P2 BFA", salle: "Centre Gilly", heure: "Jeudi 21h00", urgent: false, couleur: C.successBg, textColor: C.success },
  { id: 3, equipe: "Racing Châtelet", initiales: "RC", division: "P3 BFA", salle: "Salle Châtelet", heure: "Vendredi 19h00", urgent: false, couleur: C.warningBg, textColor: C.warning },
  { id: 4, equipe: "FC Farciennes", initiales: "FC", division: "P2 BFA", salle: "Hall Farciennes", heure: "Samedi 18h00", urgent: false, couleur: "#F5F3FF", textColor: "#7C3AED" },
];

const JOUEURS = [
  { num: 1, initiales: "MR", nom: "Matt R.", poste: "Gardien", buts: 0, capitaine: true, couleur: "#EEF2FF", textColor: C.blue },
  { num: 7, initiales: "KD", nom: "Kevin D.", poste: "Ailier droit", buts: 12, couleur: C.successBg, textColor: C.success },
  { num: 10, initiales: "SA", nom: "Sofiane A.", poste: "Pivot", buts: 9, couleur: C.errorBg, textColor: C.error },
  { num: 5, initiales: "JL", nom: "Jonathan L.", poste: "Défenseur", buts: 3, couleur: C.warningBg, textColor: C.warning },
  { num: 9, initiales: "TB", nom: "Thomas B.", poste: "Ailier gauche", buts: 7, couleur: "#F5F3FF", textColor: "#7C3AED" },
];

const RESERVATIONS_GERANT = [
  { heure: "17h00", terrain: "T1", equipe: "FC Marchienne", statut: "Confirmé", montant: 60, statutColor: C.success, statutBg: C.successBg },
  { heure: "18h00", terrain: "T2", equipe: "US Gilly Futsal", statut: "Confirmé", montant: 60, statutColor: C.success, statutBg: C.successBg },
  { heure: "19h00", terrain: "T1", equipe: "Zebratack Charleroi", statut: "Confirmé", montant: 60, statutColor: C.success, statutBg: C.successBg },
  { heure: "21h00", terrain: "T2", equipe: "Racing Châtelet", statut: "En attente", montant: 60, statutColor: C.warning, statutBg: C.warningBg },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const S = {
  app: { fontFamily: font, background: C.bg, minHeight: "100vh" },
  phoneWrap: {
    display: "flex", alignItems: "flex-start", justifyContent: "center",
    minHeight: "100vh", padding: "24px 16px", background: `linear-gradient(135deg, ${C.navy} 0%, #0a1628 100%)`,
  },
  phone: {
    width: 375, background: C.bg,
    borderRadius: 44, border: `6px solid rgba(255,255,255,0.12)`,
    overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
    display: "flex", flexDirection: "column",
  },
  statusBar: {
    background: C.navy, padding: "10px 24px 6px",
    display: "flex", justifyContent: "space-between", alignItems: "center",
    color: C.white, fontSize: 11, fontWeight: 600,
  },
  topBar: (withBack = false) => ({
    background: C.navy, padding: "12px 20px 16px",
    display: "flex", alignItems: "center", gap: 12,
    justifyContent: withBack ? "flex-start" : "space-between",
  }),
  topTitle: { fontSize: 17, fontWeight: 700, color: C.white, fontFamily: fontDisplay },
  scrollBody: { flex: 1, overflowY: "auto", padding: "14px 16px 80px" },
  card: {
    background: C.white, borderRadius: 16,
    border: `0.5px solid ${C.grayLight}`, padding: 16, marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 13, fontWeight: 700, color: C.navy,
    marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "space-between",
  },
  inputGroup: { marginBottom: 14 },
  label: { fontSize: 12, fontWeight: 600, color: C.gray, marginBottom: 6, display: "block" },
  inputWrap: (err) => ({
    display: "flex", alignItems: "center", gap: 10,
    background: C.inputBg, border: `1px solid ${err ? C.error : C.grayLight}`,
    borderRadius: 12, padding: "11px 14px",
  }),
  input: { flex: 1, border: "none", background: "transparent", fontSize: 14, color: C.navy, outline: "none", fontFamily: font },
  btnPrimary: (disabled) => ({
    width: "100%", background: disabled ? "#4B6FA8" : C.navy,
    border: "none", borderRadius: 14, padding: "14px 0",
    fontSize: 15, fontWeight: 700, color: C.white, cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: font, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
  }),
  btnOutline: {
    background: "transparent", border: `1px solid ${C.grayLight}`,
    borderRadius: 12, padding: "10px 0", fontSize: 13, fontWeight: 600,
    color: C.gray, cursor: "pointer", fontFamily: font,
    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
  },
  navBar: {
    background: C.white, borderTop: `0.5px solid ${C.grayLight}`,
    display: "flex", justifyContent: "space-around", padding: "10px 0 16px",
    position: "sticky", bottom: 0,
  },
  navItem: (active) => ({
    display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
    cursor: "pointer", border: "none", background: "transparent", fontFamily: font,
    color: active ? C.navy : C.gray, fontWeight: active ? 700 : 400,
  }),
  backBtn: {
    background: "rgba(255,255,255,0.12)", border: "none", borderRadius: 8,
    width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", fontSize: 18, color: C.white,
  },
  tag: (color = C.blue, bg = "#EEF2FF") => ({
    background: bg, color, fontSize: 10, fontWeight: 600,
    borderRadius: 6, padding: "3px 8px", display: "inline-block",
  }),
  badge: (color, bg) => ({
    background: bg, color, fontSize: 10, fontWeight: 700,
    borderRadius: 6, padding: "3px 8px",
  }),
};

// ─── STATUS BAR ───────────────────────────────────────────────────────────────
const StatusBar = () => (
  <div style={S.statusBar}>
    <span>9:41</span>
    <span style={{ fontSize: 13 }}>●●● 🔋</span>
  </div>
);

// ─── NAV BAR ──────────────────────────────────────────────────────────────────
const NavBar = ({ active, onNav, role }) => {
  const capItems = [
    { id: "dashboard", icon: "🏠", label: "Accueil" },
    { id: "salles", icon: "📍", label: "Salles" },
    { id: "defis", icon: "⚔️", label: "Défis" },
    { id: "equipe", icon: "👥", label: "Équipe" },
    { id: "profil", icon: "👤", label: "Profil" },
  ];
  const gerantItems = [
    { id: "gerant-home", icon: "🏠", label: "Accueil" },
    { id: "gerant-creneaux", icon: "📅", label: "Créneaux" },
    { id: "gerant-salle", icon: "🏟", label: "Ma salle" },
    { id: "gerant-tarifs", icon: "💰", label: "Tarifs" },
    { id: "gerant-stats", icon: "📊", label: "Stats" },
  ];
  const items = role === "gerant" ? gerantItems : capItems;
  return (
    <div style={S.navBar}>
      {items.map(item => (
        <button key={item.id} style={S.navItem(active === item.id)} onClick={() => onNav(item.id)}>
          <span style={{ fontSize: 20 }}>{item.icon}</span>
          <span style={{ fontSize: 10 }}>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

// ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
const LoginScreen = ({ onLogin }) => {
  const [tab, setTab] = useState("connexion");
  const [role, setRole] = useState("capitaine");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [errors, setErrors] = useState({});
  const [connForm, setConnForm] = useState({ email: "", password: "" });
  const [inscForm, setInscForm] = useState({ nom: "", email: "", password: "" });

  const validate = (form, isInsc) => {
    const e = {};
    if (!form.email || !form.email.includes("@")) e.email = "Email invalide";
    if (!form.password || form.password.length < 6) e.password = "6 caractères minimum";
    if (isInsc && !form.nom) e.nom = "Nom requis";
    return e;
  };

  const handleLogin = () => {
    const errs = validate(connForm, false);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setLoading(true); setAlert(null);
    setTimeout(() => {
      const user = USERS.find(u => u.email === connForm.email && u.password === connForm.password);
      setLoading(false);
      if (user) { setAlert({ type: "success", msg: "Connexion réussie !" }); setTimeout(() => onLogin(user), 600); }
      else setAlert({ type: "error", msg: "Email ou mot de passe incorrect." });
    }, 1000);
  };

  const handleSignup = () => {
    const errs = validate(inscForm, true);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setLoading(true); setAlert(null);
    setTimeout(() => {
      setLoading(false);
      const fakeUser = { id: 99, email: inscForm.email, role, name: inscForm.nom, initials: inscForm.nom.slice(0,2).toUpperCase(), team: "Mon Équipe", salle: "Ma Salle", division: "P3 BFA", stats: { joues: 0, victoires: 0, nuls: 0, defaites: 0 } };
      setAlert({ type: "success", msg: "Compte créé avec succès !" });
      setTimeout(() => onLogin(fakeUser), 600);
    }, 1000);
  };

  return (
    <div style={{ background: C.bg, padding: "28px 24px 36px" }}>
      {/* Logo */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 28 }}>
        <div style={{ width: 68, height: 68, background: C.navy, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, marginBottom: 12 }}>⚽</div>
        <div style={{ fontFamily: fontDisplay, fontSize: 26, fontWeight: 800, color: C.navy, letterSpacing: -1 }}>FutsalBook</div>
        <div style={{ fontSize: 12, color: C.blue, fontWeight: 700, marginTop: 4, letterSpacing: 2 }}>RÉSERVE · JOUE · DÉFIE</div>
      </div>

      {/* Card */}
      <div style={{ background: C.white, borderRadius: 20, border: `0.5px solid ${C.grayLight}`, padding: "22px 20px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", background: C.grayXLight, borderRadius: 12, padding: 3, marginBottom: 22 }}>
          {["connexion","inscription"].map(t => (
            <button key={t} onClick={() => { setTab(t); setAlert(null); setErrors({}); }}
              style={{ flex: 1, padding: "9px 0", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: font, background: tab === t ? C.navy : "transparent", color: tab === t ? C.white : C.gray, transition: "all 0.2s" }}>
              {t === "connexion" ? "Connexion" : "Inscription"}
            </button>
          ))}
        </div>

        {/* Alert */}
        {alert && (
          <div style={{ background: alert.type === "error" ? C.errorBg : C.successBg, border: `1px solid ${alert.type === "error" ? "#FECACA" : "#A7F3D0"}`, borderRadius: 10, padding: "10px 12px", fontSize: 12, fontWeight: 600, color: alert.type === "error" ? C.error : C.success, marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
            {alert.type === "error" ? "✕" : "✓"} {alert.msg}
          </div>
        )}

        {tab === "connexion" ? (
          <>
            {[{ key: "email", label: "Adresse email", type: "email", ph: "ton@email.com", icon: "✉️" }, { key: "password", label: "Mot de passe", type: showPwd ? "text" : "password", ph: "••••••••", icon: "🔒" }].map(f => (
              <div key={f.key} style={S.inputGroup}>
                <span style={S.label}>{f.label}</span>
                <div style={S.inputWrap(!!errors[f.key])}>
                  <span>{f.icon}</span>
                  <input style={S.input} type={f.type} placeholder={f.ph} value={connForm[f.key]} onChange={e => setConnForm({ ...connForm, [f.key]: e.target.value })} onKeyDown={e => e.key === "Enter" && handleLogin()} />
                  {f.key === "password" && <span style={{ cursor: "pointer", fontSize: 16 }} onClick={() => setShowPwd(!showPwd)}>{showPwd ? "🙈" : "👁️"}</span>}
                </div>
                {errors[f.key] && <div style={{ fontSize: 11, color: C.error, marginTop: 5 }}>⚠ {errors[f.key]}</div>}
              </div>
            ))}
            <div style={{ fontSize: 12, color: C.blue, textAlign: "right", marginBottom: 16, fontWeight: 600, cursor: "pointer" }}>Mot de passe oublié ?</div>
            <button style={{ ...S.btnPrimary(loading), marginBottom: 18 }} onClick={handleLogin} disabled={loading}>
              {loading ? "⏳ Connexion..." : "Se connecter →"}
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ flex: 1, height: 0.5, background: C.grayLight }}></div>
              <span style={{ fontSize: 12, color: C.gray }}>ou</span>
              <div style={{ flex: 1, height: 0.5, background: C.grayLight }}></div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {["🔵 Google", "🔷 Facebook"].map(s => (
                <button key={s} style={{ flex: 1, background: C.inputBg, border: `1px solid ${C.grayLight}`, borderRadius: 12, padding: "11px 0", fontSize: 13, fontWeight: 600, color: C.navy, cursor: "pointer", fontFamily: font }}>{s}</button>
              ))}
            </div>
            <div style={{ fontSize: 11, color: C.gray, textAlign: "center", marginTop: 14, lineHeight: 1.6 }}>
              Démo : <strong>matt@zebratack.be</strong> / <strong>futsal123</strong><br />
              Gérant : <strong>gerant@jumet.be</strong> / <strong>salle123</strong>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.gray, marginBottom: 10 }}>Je suis...</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {[{ id: "capitaine", icon: "🛡️", label: "Capitaine" }, { id: "gerant", icon: "🏟️", label: "Gérant de salle" }].map(r => (
                <button key={r.id} onClick={() => setRole(r.id)} style={{ flex: 1, background: role === r.id ? "#EEF2FF" : C.inputBg, border: `${role === r.id ? 2 : 1}px solid ${role === r.id ? C.navy : C.grayLight}`, borderRadius: 12, padding: "12px 6px", fontSize: 12, fontWeight: 700, color: role === r.id ? C.navy : C.gray, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, fontFamily: font }}>
                  <span style={{ fontSize: 22 }}>{r.icon}</span>{r.label}
                </button>
              ))}
            </div>
            {[{ key: "nom", label: "Prénom & nom", type: "text", ph: "Ton nom complet", icon: "👤" }, { key: "email", label: "Adresse email", type: "email", ph: "ton@email.com", icon: "✉️" }, { key: "password", label: "Mot de passe", type: showPwd ? "text" : "password", ph: "6 caractères minimum", icon: "🔒" }].map(f => (
              <div key={f.key} style={S.inputGroup}>
                <span style={S.label}>{f.label}</span>
                <div style={S.inputWrap(!!errors[f.key])}>
                  <span>{f.icon}</span>
                  <input style={S.input} type={f.type} placeholder={f.ph} value={inscForm[f.key]} onChange={e => setInscForm({ ...inscForm, [f.key]: e.target.value })} />
                  {f.key === "password" && <span style={{ cursor: "pointer" }} onClick={() => setShowPwd(!showPwd)}>{showPwd ? "🙈" : "👁️"}</span>}
                </div>
                {errors[f.key] && <div style={{ fontSize: 11, color: C.error, marginTop: 5 }}>⚠ {errors[f.key]}</div>}
              </div>
            ))}
            <button style={{ ...S.btnPrimary(loading), marginBottom: 12 }} onClick={handleSignup} disabled={loading}>
              {loading ? "⏳ Création..." : "Créer mon compte →"}
            </button>
            <div style={{ fontSize: 11, color: C.gray, textAlign: "center", lineHeight: 1.6 }}>En t'inscrivant, tu acceptes nos <span style={{ color: C.blue }}>conditions d'utilisation</span>.</div>
          </>
        )}
      </div>
    </div>
  );
};

// ─── DASHBOARD CAPITAINE ──────────────────────────────────────────────────────
const DashboardCapitaine = ({ user, onNav }) => (
  <>
    <div style={{ background: C.navy, padding: "14px 20px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 12, color: C.blueLight }}>Bonjour 👋</div>
          <div style={{ fontFamily: fontDisplay, fontSize: 20, fontWeight: 800, color: C.white, marginTop: 2 }}>{user.name}</div>
          <div style={{ fontSize: 12, color: C.blueLight, marginTop: 2 }}>{user.team} · {user.division}</div>
        </div>
        <div style={{ width: 44, height: 44, background: C.blue, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, color: C.white }}>{user.initials}</div>
      </div>
      <div style={{ display: "flex", background: "rgba(255,255,255,0.08)", borderRadius: 14, overflow: "hidden" }}>
        {[["Joués", user.stats.joues], ["Victoires", user.stats.victoires], ["Nuls", user.stats.nuls], ["Défaites", user.stats.defaites]].map(([lbl, val], i, arr) => (
          <div key={lbl} style={{ flex: 1, padding: "10px 0", textAlign: "center", borderRight: i < arr.length - 1 ? "0.5px solid rgba(255,255,255,0.1)" : "none" }}>
            <div style={{ fontFamily: fontDisplay, fontSize: 22, fontWeight: 800, color: C.white }}>{val}</div>
            <div style={{ fontSize: 10, color: C.blueLight, marginTop: 2 }}>{lbl}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={S.scrollBody}>
      {/* Prochain match */}
      <div style={{ background: C.navy, borderRadius: 16, padding: 14, marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 28 }}>⚽</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: C.blueLight }}>Prochain match</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.white, marginTop: 2 }}>{user.team} vs FC Lux</div>
          <div style={{ fontSize: 11, color: C.blueLight, marginTop: 2 }}>Mardi 20h · Salle Omnisports Jumet</div>
        </div>
        <div style={{ background: C.blue, borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: C.white }}>Dans 2j</div>
      </div>

      {/* Actions rapides */}
      <div style={S.sectionTitle}>Actions rapides</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
        {[["📅", "Réserver un terrain", "reservation"], ["⚔️", "Lancer un défi", "defis"], ["👥", "Mon équipe", "equipe"], ["📍", "Trouver une salle", "salles"]].map(([icon, label, nav]) => (
          <button key={label} onClick={() => onNav(nav)} style={{ background: C.white, border: `0.5px solid ${C.grayLight}`, borderRadius: 14, padding: "14px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 12, fontWeight: 700, color: C.navy, fontFamily: font }}>
            <span style={{ fontSize: 22 }}>{icon}</span>{label}
          </button>
        ))}
      </div>

      {/* Défis reçus */}
      <div style={S.sectionTitle}>
        Défis reçus
        <span style={{ background: C.blue, color: C.white, borderRadius: 10, padding: "1px 8px", fontSize: 11, fontWeight: 700 }}>2</span>
      </div>
      <div style={S.card}>
        {[{ init: "FM", name: "FC Marchienne", meta: "P2 BFA · Mardi 20h · Salle Jumet" }, { init: "UG", name: "US Gilly Futsal", meta: "P2 BFA · Jeudi 21h · Salle Gilly" }].map((d, i) => (
          <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i === 0 ? `0.5px solid ${C.bg}` : "none" }}>
            <div style={{ width: 36, height: 36, background: C.bg, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: C.blue }}>{d.init}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>{d.name}</div>
              <div style={{ fontSize: 11, color: C.gray, marginTop: 2 }}>{d.meta}</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button style={{ background: C.navy, border: "none", borderRadius: 8, padding: "6px 10px", fontSize: 13, fontWeight: 700, color: C.white, cursor: "pointer" }}>✓</button>
              <button style={{ background: C.inputBg, border: `0.5px solid ${C.grayLight}`, borderRadius: 8, padding: "6px 10px", fontSize: 13, fontWeight: 700, color: C.gray, cursor: "pointer" }}>✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

// ─── SALLES SCREEN ────────────────────────────────────────────────────────────
const SallesScreen = ({ onNav, onSelectSalle }) => {
  const [filter, setFilter] = useState("Toutes");
  const filters = ["Toutes", "Dispo ce soir", "- de 5km", "- de 60€/h"];
  return (
    <>
      <div style={S.topBar()}>
        <div style={S.topTitle}>Trouver une salle</div>
        <span style={{ fontSize: 12, color: C.blueLight, fontWeight: 600 }}>🗺 Carte</span>
      </div>
      <div style={{ background: C.navy, padding: "0 16px 14px" }}>
        <div style={{ background: C.white, borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "center", gap: 8 }}>
          <span>🔍</span>
          <span style={{ fontSize: 13, color: C.gray }}>Ville, salle, quartier...</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, padding: "10px 16px 4px", overflowX: "auto" }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ background: filter === f ? C.navy : C.white, border: `0.5px solid ${filter === f ? C.navy : C.grayLight}`, borderRadius: 20, padding: "6px 14px", fontSize: 11, fontWeight: 700, color: filter === f ? C.white : C.gray, cursor: "pointer", whiteSpace: "nowrap", fontFamily: font }}>{f}</button>
        ))}
      </div>
      <div style={S.scrollBody}>
        <div style={{ ...S.sectionTitle, marginBottom: 10 }}>{SALLES.length} salles partenaires</div>
        {SALLES.map(salle => (
          <div key={salle.id} style={{ ...S.card, cursor: "pointer" }} onClick={() => { onSelectSalle(salle); onNav("reservation"); }}>
            <div style={{ background: C.navy, borderRadius: 10, height: 64, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, position: "relative" }}>
              <span style={{ fontSize: 28 }}>🏟️</span>
              {salle.dispoSoir && <span style={{ position: "absolute", top: 8, right: 8, ...S.badge(C.success, C.successBg) }}>Dispo ce soir</span>}
              {!salle.dispoSoir && <span style={{ position: "absolute", top: 8, right: 8, ...S.badge(C.error, C.errorBg) }}>Complet ce soir</span>}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>{salle.nom}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.blue }}>{salle.prix}€<span style={{ fontSize: 11, color: C.gray, fontWeight: 400 }}>/h</span></div>
            </div>
            <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
              {[`📍 ${salle.distance}`, `🚪 ${salle.terrains} terrains`, `⭐ ${salle.note}`].map(m => (
                <span key={m} style={{ fontSize: 11, color: C.gray }}>{m}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
              {salle.tags.map(t => <span key={t} style={S.tag()}>{t}</span>)}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ flex: 1, ...S.btnOutline, fontSize: 12 }}>Détails</button>
              <button onClick={(e) => { e.stopPropagation(); onSelectSalle(salle); onNav("reservation"); }} style={{ flex: 2, background: C.navy, border: "none", borderRadius: 10, padding: "10px 0", fontSize: 12, fontWeight: 700, color: C.white, cursor: "pointer", fontFamily: font }}>📅 Réserver</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

// ─── RESERVATION SCREEN ───────────────────────────────────────────────────────
const ReservationScreen = ({ salle, onNav, onConfirm }) => {
  const [selectedDay, setSelectedDay] = useState(20);
  const [selectedSlot, setSelectedSlot] = useState("20h00");
  const [defiOuvert, setDefiOuvert] = useState(true);
  const salleSel = salle || SALLES[0];
  const slots = [{ h: "17h00", dispo: false }, { h: "18h00", dispo: false }, { h: "19h00", dispo: true }, { h: "20h00", dispo: true }, { h: "21h00", dispo: true }, { h: "22h00", dispo: false }];
  const days = [15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  const hasSlot = [16,17,18,20,22,23,25,28,31];

  return (
    <>
      <div style={S.topBar(true)}>
        <button style={S.backBtn} onClick={() => onNav("salles")}>←</button>
        <div style={S.topTitle}>Réserver un terrain</div>
      </div>
      <div style={S.scrollBody}>
        {/* Salle sélectionnée */}
        <div style={S.sectionTitle}>Salle sélectionnée</div>
        <div style={{ ...S.card, display: "flex", alignItems: "center", gap: 12, border: `2px solid ${C.navy}` }}>
          <div style={{ width: 44, height: 44, background: "#EEF2FF", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🏟️</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>{salleSel.nom}</div>
            <div style={{ fontSize: 11, color: C.gray, marginTop: 2 }}>📍 {salleSel.distance} · ⭐ {salleSel.note}</div>
          </div>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.blue }}>{salleSel.prix}€/h</div>
        </div>

        {/* Calendrier */}
        <div style={S.sectionTitle}>Choisir une date</div>
        <div style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <button style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: C.navy }}>‹</button>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>Mai 2026</span>
            <button style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: C.navy }}>›</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", textAlign: "center", marginBottom: 6 }}>
            {["L","M","M","J","V","S","D"].map((d,i) => <span key={i} style={{ fontSize: 10, color: C.gray, padding: "2px 0" }}>{d}</span>)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, textAlign: "center" }}>
            {[...Array(3)].map((_,i) => <div key={`e${i}`}></div>)}
            {[...Array(14)].map((_,i) => <div key={`p${i}`} style={{ padding: "6px 2px", fontSize: 12, color: C.grayLight }}>{i+1}</div>)}
            {days.map(d => (
              <div key={d} onClick={() => d > 15 && setSelectedDay(d)}
                style={{ padding: "6px 2px", fontSize: 12, borderRadius: 8, cursor: d > 15 ? "pointer" : "default",
                  background: selectedDay === d ? C.navy : "transparent",
                  color: selectedDay === d ? C.white : d === 15 ? C.blue : C.navy,
                  fontWeight: selectedDay === d || d === 15 ? 700 : 400,
                  position: "relative" }}>
                {d}
                {hasSlot.includes(d) && selectedDay !== d && <div style={{ width: 4, height: 4, background: C.blue, borderRadius: "50%", position: "absolute", bottom: 1, left: "50%", transform: "translateX(-50%)" }}></div>}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 10, color: C.gray, marginTop: 8, display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 5, height: 5, background: C.blue, borderRadius: "50%" }}></div>Créneaux disponibles
          </div>
        </div>

        {/* Créneaux */}
        <div style={S.sectionTitle}>Choisir un créneau</div>
        <div style={{ ...S.card, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {slots.map(s => (
            <button key={s.h} disabled={!s.dispo} onClick={() => setSelectedSlot(s.h)}
              style={{ background: !s.dispo ? "#F1F5F9" : selectedSlot === s.h ? C.navy : C.inputBg, border: `1px solid ${!s.dispo ? "#E2E8F0" : selectedSlot === s.h ? C.navy : C.grayLight}`, borderRadius: 8, padding: "9px 4px", fontSize: 12, fontWeight: 700, color: !s.dispo ? C.grayLight : selectedSlot === s.h ? C.white : C.navy, cursor: s.dispo ? "pointer" : "not-allowed", fontFamily: font, textDecoration: !s.dispo ? "line-through" : "none" }}>
              {s.h}
            </button>
          ))}
        </div>

        {/* Toggle défi */}
        <div style={{ ...S.card, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => setDefiOuvert(!defiOuvert)}>
          <span style={{ fontSize: 22 }}>⚔️</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>Publier comme défi ouvert</div>
            <div style={{ fontSize: 11, color: C.gray, marginTop: 2 }}>D'autres équipes pourront te défier</div>
          </div>
          <div style={{ width: 38, height: 22, background: defiOuvert ? C.blue : C.grayLight, borderRadius: 11, position: "relative", transition: "background 0.2s" }}>
            <div style={{ width: 16, height: 16, background: C.white, borderRadius: "50%", position: "absolute", top: 3, left: defiOuvert ? 18 : 3, transition: "left 0.2s" }}></div>
          </div>
        </div>

        {/* Récap */}
        <div style={S.sectionTitle}>Récapitulatif</div>
        <div style={S.card}>
          {[["🏟️ Salle", salleSel.nom], ["📅 Date", `Mardi ${selectedDay} mai 2026`], ["⏰ Créneau", `${selectedSlot} – ${String(parseInt(selectedSlot)+1).padStart(2,"0")}h00`], ["⏱ Durée", "1 heure"]].map(([lbl, val]) => (
            <div key={lbl} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `0.5px solid ${C.bg}`, fontSize: 13 }}>
              <span style={{ color: C.gray }}>{lbl}</span>
              <span style={{ fontWeight: 700, color: C.navy }}>{val}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", fontSize: 15 }}>
            <span style={{ color: C.gray, fontWeight: 600 }}>Total</span>
            <span style={{ fontWeight: 800, color: C.blue }}>{salleSel.prix},00 €</span>
          </div>
          <button style={S.btnPrimary(false)} onClick={() => onNav("confirmation")}>Confirmer & payer 💳</button>
        </div>
      </div>
    </>
  );
};

// ─── CONFIRMATION SCREEN ──────────────────────────────────────────────────────
const ConfirmationScreen = ({ salle, onNav }) => {
  const salleSel = salle || SALLES[0];
  return (
    <>
      <div style={{ background: C.navy, padding: "12px 20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={S.topTitle}>Confirmation</div>
      </div>
      <div style={{ ...S.scrollBody, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 72, height: 72, background: C.navy, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, marginBottom: 14 }}>✅</div>
        <div style={{ fontFamily: fontDisplay, fontSize: 20, fontWeight: 800, color: C.navy, marginBottom: 4 }}>Réservation confirmée !</div>
        <div style={{ fontSize: 13, color: C.gray, textAlign: "center", marginBottom: 22, lineHeight: 1.6 }}>Un email de confirmation t'a été envoyé.</div>

        <div style={{ ...S.card, width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 12, borderBottom: `0.5px solid ${C.bg}`, marginBottom: 12 }}>
            <div style={{ width: 40, height: 40, background: "#EEF2FF", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🏟️</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>{salleSel.nom}</div>
              <div style={{ fontSize: 11, color: C.gray, marginTop: 2 }}>Réf. #FB-20526-4821</div>
            </div>
          </div>
          {[["📅 Date", "Mardi 20 mai 2026"], ["⏰ Créneau", "20h00 – 21h00"], ["👥 Équipe", "Zebratack Charleroi"], ["💳 Paiement", "Visa •••• 4821"]].map(([lbl, val]) => (
            <div key={lbl} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `0.5px solid ${C.bg}`, fontSize: 13 }}>
              <span style={{ color: C.gray }}>{lbl}</span>
              <span style={{ fontWeight: 700, color: C.navy }}>{val}</span>
            </div>
          ))}
          <div style={{ background: C.navy, borderRadius: 10, padding: "12px 16px", display: "flex", justifyContent: "space-between", margin: "10px 0 4px" }}>
            <span style={{ fontSize: 13, color: C.blueLight }}>Total payé</span>
            <span style={{ fontFamily: fontDisplay, fontSize: 18, fontWeight: 800, color: C.white }}>{salleSel.prix},00 €</span>
          </div>
        </div>

        <div style={{ ...S.card, width: "100%", background: "#EEF2FF", border: `1px solid ${C.blueLight}`, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>⚔️</span>
          <div style={{ fontSize: 12, color: C.navy, lineHeight: 1.5 }}>
            <strong>Défi ouvert publié !</strong> Les équipes P2 BFA de la région peuvent maintenant te défier sur ce créneau.
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, width: "100%", marginBottom: 10 }}>
          {["📄 Reçu PDF", "📤 Partager"].map(b => (
            <button key={b} style={{ flex: 1, ...S.btnOutline, fontSize: 12 }}>{b}</button>
          ))}
        </div>
        <button style={{ ...S.btnPrimary(false), width: "100%" }} onClick={() => onNav("dashboard")}>🏠 Retour à l'accueil</button>
      </div>
    </>
  );
};

// ─── DEFIS SCREEN ─────────────────────────────────────────────────────────────
const DefisScreen = ({ onNav }) => {
  const [filter, setFilter] = useState("Tous");
  const filters = ["Tous", "P2 BFA", "P3 BFA", "Ce soir", "Cette semaine"];
  return (
    <>
      <div style={{ ...S.topBar(), justifyContent: "space-between" }}>
        <div style={S.topTitle}>Défis ouverts</div>
        <span style={{ background: C.blue, borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 700, color: C.white }}>12 dispo</span>
      </div>
      <div style={{ background: C.navy, padding: "0 16px 14px", display: "flex", gap: 8, overflowX: "auto" }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ background: filter === f ? C.blue : "rgba(255,255,255,0.1)", border: `0.5px solid ${filter === f ? C.blue : "rgba(255,255,255,0.2)"}`, borderRadius: 20, padding: "5px 14px", fontSize: 11, fontWeight: 700, color: filter === f ? C.white : C.blueLight, cursor: "pointer", whiteSpace: "nowrap", fontFamily: font }}>{f}</button>
        ))}
      </div>
      <div style={S.scrollBody}>
        <div style={{ background: C.white, borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "center", gap: 8, marginBottom: 14, border: `0.5px solid ${C.grayLight}` }}>
          <span>🔍</span>
          <span style={{ fontSize: 13, color: C.gray }}>Rechercher une équipe, une salle...</span>
        </div>

        <div style={S.sectionTitle}>🔴 Défis urgents</div>
        {DEFIS.filter(d => d.urgent).map(d => (
          <div key={d.id} style={{ ...S.card, cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 40, height: 40, background: d.couleur, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: d.textColor }}>{d.initiales}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>{d.equipe}</div>
                  <span style={S.badge(C.blue, "#EEF2FF")}>{d.division}</span>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={S.badge(C.error, C.errorBg)}>Urgent</span>
                <div style={{ fontSize: 11, color: C.gray, marginTop: 4 }}>{d.heure}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 14, marginBottom: 12 }}>
              {[`🏟 ${d.salle}`, `⏰ ${d.heure}`, "📍 1.2 km"].map(m => <span key={m} style={{ fontSize: 11, color: C.gray }}>{m}</span>)}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, borderTop: `0.5px solid ${C.bg}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>Gratuit <span style={{ fontSize: 11, color: C.gray, fontWeight: 400 }}>· terrain déjà payé</span></div>
              <button style={{ background: C.navy, border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 700, color: C.white, cursor: "pointer", fontFamily: font }}>⚔️ Relever le défi</button>
            </div>
          </div>
        ))}

        <div style={{ ...S.sectionTitle, marginTop: 4 }}>Cette semaine</div>
        {DEFIS.filter(d => !d.urgent).map(d => (
          <div key={d.id} style={{ ...S.card, cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 40, height: 40, background: d.couleur, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: d.textColor }}>{d.initiales}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>{d.equipe}</div>
                  <span style={S.badge(C.blue, "#EEF2FF")}>{d.division}</span>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={S.badge(C.success, C.successBg)}>Ouvert</span>
                <div style={{ fontSize: 11, color: C.gray, marginTop: 4 }}>{d.heure}</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, borderTop: `0.5px solid ${C.bg}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>Gratuit <span style={{ fontSize: 11, color: C.gray, fontWeight: 400 }}>· terrain déjà payé</span></div>
              <button style={{ background: C.navy, border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 700, color: C.white, cursor: "pointer", fontFamily: font }}>⚔️ Défier</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

// ─── EQUIPE SCREEN ────────────────────────────────────────────────────────────
const EquipeScreen = ({ user }) => (
  <>
    <div style={{ background: C.navy, padding: "14px 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ width: 64, height: 64, background: C.blue, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: C.white, border: "2px solid rgba(255,255,255,0.15)" }}>ZC</div>
      <div style={{ fontFamily: fontDisplay, fontSize: 18, fontWeight: 800, color: C.white }}>{user.team}</div>
      <span style={{ background: C.blue, borderRadius: 20, padding: "3px 14px", fontSize: 11, fontWeight: 700, color: C.white }}>{user.division} · Saison 2025–2026</span>
      <div style={{ display: "flex", background: "rgba(255,255,255,0.08)", borderRadius: 12, overflow: "hidden", width: "100%", marginTop: 6 }}>
        {[["8","Joués"],["5","Victoires"],["2","Nuls"],["1","Défaites"]].map(([v,l],i,a) => (
          <div key={l} style={{ flex: 1, padding: "10px 0", textAlign: "center", borderRight: i<a.length-1?"0.5px solid rgba(255,255,255,0.1)":"none" }}>
            <div style={{ fontFamily: fontDisplay, fontSize: 20, fontWeight: 800, color: C.white }}>{v}</div>
            <div style={{ fontSize: 10, color: C.blueLight, marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={S.scrollBody}>
      <div style={S.sectionTitle}>
        Infos équipe
        <span style={{ fontSize: 11, color: C.blue, cursor: "pointer" }}>✏️ Modifier</span>
      </div>
      <div style={S.card}>
        {[["📍","Ville","Charleroi, Belgique"],["🏟","Salle domicile","Omnisports Jumet"],["👕","Couleurs","Noir & Blanc"],["📅","Fondée en","2018"]].map(([icon,lbl,val]) => (
          <div key={lbl} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `0.5px solid ${C.bg}`, fontSize: 13 }}>
            <span style={{ color: C.gray }}>{icon} {lbl}</span>
            <span style={{ fontWeight: 700, color: C.navy }}>{val}</span>
          </div>
        ))}
      </div>

      <div style={S.sectionTitle}>Derniers résultats</div>
      <div style={{ ...S.card, display: "flex", gap: 6, flexWrap: "wrap" }}>
        {["V","V","N","V","D","V","V","N"].map((r,i) => (
          <div key={i} style={{ width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, background: r==="V"?C.successBg:r==="D"?C.errorBg:C.warningBg, color: r==="V"?C.success:r==="D"?C.error:C.warning }}>{r}</div>
        ))}
      </div>

      <div style={S.sectionTitle}>
        Effectif <span style={{ fontSize: 11, color: C.gray, fontWeight: 400 }}>· {JOUEURS.length} joueurs</span>
        <span style={{ fontSize: 11, color: C.blue, cursor: "pointer" }}>+ Ajouter</span>
      </div>
      <div style={S.card}>
        {JOUEURS.map((j, i) => (
          <div key={j.num} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: i<JOUEURS.length-1?`0.5px solid ${C.bg}`:"none" }}>
            <div style={{ width: 28, height: 28, background: "#EEF2FF", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: C.blue }}>{j.num}</div>
            <div style={{ width: 32, height: 32, background: j.couleur, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: j.textColor }}>{j.initiales}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>{j.nom}</div>
              <div style={{ fontSize: 11, color: C.gray, marginTop: 1 }}>{j.poste}</div>
            </div>
            {j.capitaine && <span style={{ background: C.navy, color: C.blueLight, fontSize: 10, fontWeight: 700, borderRadius: 6, padding: "2px 7px" }}>Cap.</span>}
            {!j.capitaine && <div style={{ textAlign: "right" }}><span style={{ fontSize: 14, fontWeight: 800, color: C.navy }}>{j.buts}</span><div style={{ fontSize: 10, color: C.gray }}>buts</div></div>}
          </div>
        ))}
        <button style={{ ...S.btnOutline, marginTop: 10, width: "100%", border: `1px dashed ${C.blueLight}`, color: C.blue }}>+ Ajouter un joueur</button>
      </div>
    </div>
  </>
);

// ─── PROFIL SCREEN ────────────────────────────────────────────────────────────
const ProfilScreen = ({ user, onLogout }) => (
  <>
    <div style={{ ...S.topBar(), justifyContent: "flex-start" }}>
      <div style={S.topTitle}>Mon profil</div>
    </div>
    <div style={S.scrollBody}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
        <div style={{ width: 72, height: 72, background: C.blue, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 800, color: C.white, marginBottom: 10 }}>{user.initials}</div>
        <div style={{ fontFamily: fontDisplay, fontSize: 18, fontWeight: 800, color: C.navy }}>{user.name}</div>
        <div style={{ fontSize: 13, color: C.gray, marginTop: 4 }}>{user.email}</div>
        <span style={{ ...S.badge(C.blue, "#EEF2FF"), marginTop: 8, fontSize: 12 }}>Capitaine · {user.division}</span>
      </div>

      {[{ title: "Informations personnelles", items: [["👤","Nom",user.name],["✉️","Email",user.email],["📱","Téléphone","+32 493 37 87 86"]] },
        { title: "Mon équipe", items: [["⚽","Équipe",user.team],["🏅","Division",user.division],["📍","Ville","Charleroi"]] }].map(section => (
        <div key={section.title}>
          <div style={S.sectionTitle}>{section.title}</div>
          <div style={S.card}>
            {section.items.map(([icon,lbl,val]) => (
              <div key={lbl} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `0.5px solid ${C.bg}`, fontSize: 13 }}>
                <span style={{ color: C.gray }}>{icon} {lbl}</span>
                <span style={{ fontWeight: 700, color: C.navy }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button style={{ ...S.btnOutline, width: "100%", marginTop: 8, color: C.error, borderColor: C.error }} onClick={onLogout}>
        🚪 Se déconnecter
      </button>
    </div>
  </>
);

// ─── GERANT HOME ──────────────────────────────────────────────────────────────
const GerantHome = ({ user, onNav }) => (
  <>
    <div style={{ background: C.navy, padding: "14px 20px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12, color: C.blueLight }}>Espace gérant</div>
          <div style={{ fontFamily: fontDisplay, fontSize: 18, fontWeight: 800, color: C.white, marginTop: 2 }}>{user.salle}</div>
          <div style={{ fontSize: 12, color: C.blueLight, marginTop: 2 }}>{user.terrains} terrains · Actif</div>
        </div>
        <div style={{ width: 44, height: 44, background: C.blue, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, color: C.white }}>{user.initials}</div>
      </div>
    </div>
    <div style={S.scrollBody}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
        {[["📅","6","Réservations aujourd'hui","+2 vs hier"],["💰","360€","Revenus aujourd'hui","+120€ vs hier"],["📊","78%","Taux d'occupation","Ce mois-ci"],["⏰","3","Créneaux libres ce soir","Sur 8 au total"]].map(([icon,val,lbl,sub]) => (
          <div key={lbl} style={{ background: C.white, borderRadius: 14, border: `0.5px solid ${C.grayLight}`, padding: "12px 10px" }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
            <div style={{ fontFamily: fontDisplay, fontSize: 22, fontWeight: 800, color: C.navy }}>{val}</div>
            <div style={{ fontSize: 10, color: C.gray, marginTop: 2 }}>{lbl}</div>
            <div style={{ fontSize: 10, color: C.success, marginTop: 2 }}>{sub}</div>
          </div>
        ))}
      </div>

      <div style={S.sectionTitle}>Réservations du jour</div>
      <div style={S.card}>
        {RESERVATIONS_GERANT.map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: i<RESERVATIONS_GERANT.length-1?`0.5px solid ${C.bg}`:"none" }}>
            <div style={{ background: C.bg, borderRadius: 8, padding: "6px 8px", textAlign: "center", flexShrink: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: C.navy }}>{r.heure}</div>
              <div style={{ fontSize: 10, color: C.gray }}>{r.terrain}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>{r.equipe}</div>
            </div>
            <span style={S.badge(r.statutColor, r.statutBg)}>{r.statut}</span>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.blue }}>{r.montant}€</div>
          </div>
        ))}
      </div>

      <div style={S.sectionTitle}>Actions rapides</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[["📅","Gérer créneaux","gerant-creneaux"],["🏟","Ma salle","gerant-salle"],["💰","Tarifs","gerant-tarifs"],["📊","Statistiques","gerant-stats"]].map(([icon,label,nav]) => (
          <button key={label} onClick={() => onNav(nav)} style={{ background: C.white, border: `0.5px solid ${C.grayLight}`, borderRadius: 14, padding: "14px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 12, fontWeight: 700, color: C.navy, fontFamily: font }}>
            <span style={{ fontSize: 22 }}>{icon}</span>{label}
          </button>
        ))}
      </div>
    </div>
  </>
);

// ─── GERANT CRENEAUX ──────────────────────────────────────────────────────────
const GerantCreneaux = ({ onNav }) => {
  const creneaux = [
    [{ h:"17h00-18h00",pris:true,equipe:"FC Marchienne"},{h:"18h00-19h00",pris:false},{h:"19h00-20h00",pris:true,equipe:"Zebratack"},{h:"20h00-21h00",pris:false},{h:"21h00-22h00",pris:"attente",equipe:"Racing"},{h:"22h00-23h00",pris:false}],
    [{h:"17h00-18h00",pris:true,equipe:"US Gilly"},{h:"18h00-19h00",pris:true,equipe:"FC Farciennes"},{h:"19h00-20h00",pris:false},{h:"20h00-21h00",pris:true,equipe:"US Charleroi"},{h:"21h00-22h00",pris:false},{h:"22h00-23h00",pris:false}],
  ];
  return (
    <>
      <div style={S.topBar(true)}>
        <button style={S.backBtn} onClick={() => onNav("gerant-home")}>←</button>
        <div style={S.topTitle}>Gestion des créneaux</div>
      </div>
      <div style={S.scrollBody}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>Mardi 20 mai 2026</div>
          <button style={{ background: C.blue, border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700, color: C.white, cursor: "pointer" }}>Changer</button>
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
          {[["#ECFDF5","#059669","Libre"],["#FEF2F2","#DC2626","Réservé"],["#FFFBEB","#D97706","Attente"]].map(([bg,col,lbl]) => (
            <div key={lbl} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, background: bg, border: `1px solid ${col}`, borderRadius: 3 }}></div>
              <span style={{ fontSize: 10, color: C.gray }}>{lbl}</span>
            </div>
          ))}
        </div>
        {creneaux.map((terrain, ti) => (
          <div key={ti} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.gray, marginBottom: 8 }}>Terrain {ti+1}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {terrain.map(c => (
                <div key={c.h} style={{ borderRadius: 10, padding: "10px", background: c.pris===true?C.errorBg:c.pris==="attente"?C.warningBg:C.successBg, border: `1px solid ${c.pris===true?"#FECACA":c.pris==="attente"?"#FDE68A":"#A7F3D0"}`, cursor: "pointer" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>{c.h}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: c.pris===true?C.error:c.pris==="attente"?C.warning:C.success, marginTop: 2 }}>{c.pris===true?"Réservé":c.pris==="attente"?"En attente":"Libre"}</div>
                  {c.equipe && <div style={{ fontSize: 10, color: C.gray, marginTop: 2 }}>{c.equipe}</div>}
                </div>
              ))}
            </div>
          </div>
        ))}
        <button style={{ ...S.btnOutline, width: "100%", border: `1px dashed ${C.blueLight}`, color: C.blue }}>+ Ajouter un créneau</button>
      </div>
    </>
  );
};

// ─── GERANT SALLE ─────────────────────────────────────────────────────────────
const GerantSalle = ({ user, onNav }) => (
  <>
    <div style={S.topBar(true)}>
      <button style={S.backBtn} onClick={() => onNav("gerant-home")}>←</button>
      <div style={S.topTitle}>Ma salle</div>
    </div>
    <div style={S.scrollBody}>
      <div style={S.sectionTitle}>
        Photos de la salle
        <span style={{ fontSize: 11, color: C.blue, cursor: "pointer" }}>+ Ajouter</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
        {[["🏟️","Vue générale"],["⚽","Terrain 1"],["🚿","Vestiaires"],["➕","Ajouter"]].map(([icon,lbl],i) => (
          <div key={lbl} style={{ height: 70, background: i===3?C.inputBg:"#EEF2FF", borderRadius: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, border: i===3?`1px dashed ${C.grayLight}`:"none", cursor: "pointer" }}>
            <span style={{ fontSize: 24 }}>{icon}</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: i===3?C.gray:C.blue }}>{lbl}</span>
          </div>
        ))}
      </div>

      <div style={S.sectionTitle}>
        Informations générales
        <span style={{ fontSize: 11, color: C.blue, cursor: "pointer" }}>✏️ Modifier</span>
      </div>
      <div style={S.card}>
        {[["🏟","Nom",user.salle],["📍","Adresse","Rue du Sport 12, Jumet"],["🚪","Terrains","2 terrains futsal"],["⏰","Horaires","17h00 – 23h00"],["📞","Contact","+32 71 XX XX XX"]].map(([icon,lbl,val]) => (
          <div key={lbl} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `0.5px solid ${C.bg}`, fontSize: 13 }}>
            <span style={{ color: C.gray }}>{icon} {lbl}</span>
            <span style={{ fontWeight: 700, color: C.navy, textAlign: "right", maxWidth: "55%" }}>{val}</span>
          </div>
        ))}
      </div>

      <div style={S.sectionTitle}>Équipements</div>
      <div style={{ ...S.card, display: "flex", flexWrap: "wrap", gap: 6 }}>
        {["Vestiaires","Douches","Parking","Éclairage LED","Cafétéria"].map(t => <span key={t} style={S.tag()}>{t}</span>)}
        <span style={{ ...S.tag(C.gray, C.bg), border: `1px dashed ${C.grayLight}`, cursor: "pointer" }}>+ Ajouter</span>
      </div>
    </div>
  </>
);

// ─── GERANT TARIFS ────────────────────────────────────────────────────────────
const GerantTarifs = ({ onNav }) => (
  <>
    <div style={S.topBar(true)}>
      <button style={S.backBtn} onClick={() => onNav("gerant-home")}>←</button>
      <div style={S.topTitle}>Tarifs</div>
    </div>
    <div style={S.scrollBody}>
      {[{ title: "Tarifs standard", items: [["Tarif horaire (1h)","60,00 €"],["Tarif 1h30","85,00 €"],["Tarif 2h","110,00 €"]] },
        { title: "Tarifs spéciaux", items: [["Week-end (1h)","70,00 €"],["Heure creuse (avant 18h)","45,00 €"],["Abonnement mensuel","199,00 €"]] },
        { title: "Commission FutsalBook", items: [["Taux de commission","7%"],["Reversé à la salle","55,80 € / résa"],["Paiement","Virement J+7"]] }].map(section => (
        <div key={section.title}>
          <div style={{ background: C.navy, borderRadius: "14px 14px 0 0", padding: "10px 16px", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.white }}>{section.title}</span>
            {section.title !== "Commission FutsalBook" && <span style={{ fontSize: 11, color: C.blueLight, cursor: "pointer" }}>✏️ Modifier</span>}
          </div>
          <div style={{ background: C.white, border: `0.5px solid ${C.grayLight}`, borderRadius: "0 0 14px 14px", padding: "4px 16px", marginBottom: 12 }}>
            {section.items.map(([lbl,val]) => (
              <div key={lbl} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `0.5px solid ${C.bg}`, fontSize: 13 }}>
                <span style={{ color: C.gray }}>{lbl}</span>
                <span style={{ fontWeight: 800, color: C.navy }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button style={{ ...S.btnOutline, width: "100%", border: `1px dashed ${C.blueLight}`, color: C.blue }}>+ Ajouter un tarif personnalisé</button>
    </div>
  </>
);

// ─── GERANT STATS ─────────────────────────────────────────────────────────────
const GerantStats = ({ onNav }) => (
  <>
    <div style={S.topBar(true)}>
      <button style={S.backBtn} onClick={() => onNav("gerant-home")}>←</button>
      <div style={S.topTitle}>Statistiques</div>
    </div>
    <div style={S.scrollBody}>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {["7 jours","30 jours","Ce mois"].map((p,i) => (
          <button key={p} style={{ flex: 1, background: i===1?C.navy:C.white, border: `0.5px solid ${i===1?C.navy:C.grayLight}`, borderRadius: 10, padding: "8px 0", fontSize: 12, fontWeight: 700, color: i===1?C.white:C.gray, cursor: "pointer", fontFamily: font }}>{p}</button>
        ))}
      </div>

      {[["💰","Revenus du mois","1 440 €","↑ +18% vs mois dernier"],["📅","Réservations totales","24","↑ +6 vs mois dernier"],["📊","Taux d'occupation moyen","78%","↑ +5% vs mois dernier"],["⭐","Note moyenne","4.8 / 5","Sur 32 avis"]].map(([icon,lbl,val,sub]) => (
        <div key={lbl} style={{ ...S.card, display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
          <div style={{ width: 44, height: 44, background: "#EEF2FF", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: C.gray }}>{lbl}</div>
            <div style={{ fontFamily: fontDisplay, fontSize: 20, fontWeight: 800, color: C.navy, marginTop: 2 }}>{val}</div>
          </div>
          <div style={{ fontSize: 11, color: C.success, fontWeight: 600, textAlign: "right" }}>{sub}</div>
        </div>
      ))}

      <div style={S.sectionTitle} >Occupation par jour</div>
      <div style={S.card}>
        {[["Lundi","45%",0.45],["Mardi","82%",0.82],["Mercredi","70%",0.70],["Jeudi","90%",0.90],["Vendredi","95%",0.95],["Samedi","100%",1.0],["Dimanche","30%",0.30]].map(([jour,pct,val]) => (
          <div key={jour} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: `0.5px solid ${C.bg}` }}>
            <span style={{ fontSize: 12, color: C.gray, width: 72, flexShrink: 0 }}>{jour}</span>
            <div style={{ flex: 1, background: C.bg, borderRadius: 6, height: 8, overflow: "hidden" }}>
              <div style={{ width: `${val*100}%`, height: "100%", background: val>0.85?C.success:val>0.5?C.blue:C.blueLight, borderRadius: 6 }}></div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.navy, width: 36, textAlign: "right" }}>{pct}</span>
          </div>
        ))}
      </div>
    </div>
  </>
);

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [selectedSalle, setSelectedSalle] = useState(null);

  const handleLogin = (u) => {
    setUser(u);
    setPage(u.role === "gerant" ? "gerant-home" : "dashboard");
  };

  const handleLogout = () => { setUser(null); setPage("dashboard"); };

  const noNavPages = ["reservation","confirmation","gerant-creneaux","gerant-salle","gerant-tarifs","gerant-stats"];

  const renderPage = () => {
    if (!user) return <LoginScreen onLogin={handleLogin} />;
    switch (page) {
      case "dashboard": return <DashboardCapitaine user={user} onNav={setPage} />;
      case "salles": return <SallesScreen onNav={setPage} onSelectSalle={setSelectedSalle} />;
      case "reservation": return <ReservationScreen salle={selectedSalle} onNav={setPage} />;
      case "confirmation": return <ConfirmationScreen salle={selectedSalle} onNav={setPage} />;
      case "defis": return <DefisScreen onNav={setPage} />;
      case "equipe": return <EquipeScreen user={user} />;
      case "profil": return <ProfilScreen user={user} onLogout={handleLogout} />;
      case "gerant-home": return <GerantHome user={user} onNav={setPage} />;
      case "gerant-creneaux": return <GerantCreneaux onNav={setPage} />;
      case "gerant-salle": return <GerantSalle user={user} onNav={setPage} />;
      case "gerant-tarifs": return <GerantTarifs onNav={setPage} />;
      case "gerant-stats": return <GerantStats onNav={setPage} />;
      default: return <DashboardCapitaine user={user} onNav={setPage} />;
    }
  };

  return (
    <div style={S.phoneWrap}>
      <div style={S.phone}>
        <StatusBar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: page === "dashboard" || page === "gerant-home" ? "hidden" : "auto" }}>
          {renderPage()}
        </div>
        {user && !noNavPages.includes(page) && (
          <NavBar active={page} onNav={setPage} role={user.role} />
        )}
      </div>
    </div>
  );
}
