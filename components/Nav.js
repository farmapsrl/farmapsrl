import { useRouter } from "next/router";

export default function Nav() {
  const router = useRouter();

  const navLink = (href, label) => {
    const active = router.pathname === href;
    return (
      <a
        href={href}
        style={{
          fontSize: 14,
          letterSpacing: "0.2px",
          color: active ? "#3B6D11" : "#555",
          fontWeight: active ? 600 : 400,
          textDecoration: "none",
          padding: "6px 14px",
          borderRadius: 8,
          background: active ? "#EEF5E8" : "transparent",
          transition: "background 0.15s, color 0.15s",
        }}
        onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = "#EEF5E8"; e.currentTarget.style.color = "#3B6D11"; } }}
        onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#555"; } }}
      >
        {label}
      </a>
    );
  };

  return (
    <nav
      style={{
        padding: "1.1rem 2rem",
        borderBottom: "1px solid #eee",
        boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
      }}
    >
      <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
        <img src="/LogoFarmaP.png" alt="FarmaP" style={{ height: 52, width: "auto" }} />
      </a>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {navLink("/sedi", "Sedi")}
        {navLink("/servizi", "Servizi")}
        {navLink("/deblistering", "Deblistering")}
        {navLink("/", "Chi siamo")}
      </div>
    </nav>
  );
}
