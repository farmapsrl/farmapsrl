import Head from "next/head";
import farmacie from "../../farmacie.json";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

export async function getStaticPaths() {
  const paths = farmacie
    .filter((f) => f.cosmetici && f.cosmetici.length > 0)
    .map((f) => ({ params: { slug: f.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const farmacia = farmacie.find((f) => f.slug === params.slug);
  return { props: { farmacia } };
}

export default function CosmeticiPage({ farmacia }) {
  const brand = farmacia.cosmetici.map((c) => c.brand).slice(0, 4).join(", ");
  const titolo = `Linee cosmetiche - ${farmacia.nome}, ${farmacia.citta} | Gruppo FarmaP`;
  const descrizione = `Linee cosmetiche e dermatologiche disponibili presso ${farmacia.nome} a ${farmacia.citta}: ${brand} e molti altri brand.`;

  return (
    <>
    <Head>
      <title>{titolo}</title>
      <meta name="description" content={descrizione} />
    </Head>
    <div style={{ fontFamily: "var(--font-lexend), sans-serif", width: "100%", minHeight: "100vh", background: "#f7f7f5" }}>
      <Nav />

      <div style={{ background: "#fff", borderBottom: "1px solid #eee", padding: "2.5rem 2rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <a href={"/" + farmacia.slug} style={{ fontSize: 13, color: "#3B6D11", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
            ← {farmacia.nome}
          </a>
          <div style={{ fontSize: 11, color: "#7A9E6A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
            FarmaP · {farmacia.citta}
          </div>
          <h1 style={{ fontFamily: "var(--font-lexend), sans-serif", fontSize: 36, fontWeight: 400, marginBottom: 6 }}>
            Linee cosmetiche
          </h1>
          <p style={{ fontSize: 14, color: "#888", margin: 0 }}>{farmacia.nome}</p>
        </div>
      </div>

      <div style={{ padding: "2.5rem 2rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {farmacia.servizi && farmacia.servizi.length > 0 && (
            <div style={{ display: "flex", gap: 28, marginBottom: 32, borderBottom: "2px solid #eee", paddingBottom: 12 }}>
              <a href={"/" + farmacia.slug} style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, fontWeight: 500, color: "#aaa", textDecoration: "none", paddingBottom: 12, marginBottom: -14 }}>
                Servizi disponibili
              </a>
              <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, color: "#3B6D11", borderBottom: "2px solid #3B6D11", paddingBottom: 12, marginBottom: -14, cursor: "default" }}>
                Linee cosmetiche
              </span>
            </div>
          )}
          <div style={{ fontSize: 11, color: "#7A9E6A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 24 }}>
            I nostri brand
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20 }}>
            {farmacia.cosmetici.map((c, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: "1px solid #eee",
                  borderRadius: 14,
                  padding: "2rem 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  minHeight: 140,
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                }}
              >
                <img
                  src={c.logo}
                  alt={c.brand}
                  style={{ maxWidth: "100%", maxHeight: 70, objectFit: "contain", transform: `scale(${c.scale || 1})` }}
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                <span style={{ fontSize: 13, color: "#555", fontWeight: 500, textAlign: "center" }}>{c.brand}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32, background: "#fff", border: "1px solid #eee", borderRadius: 14, padding: "1.5rem 1.75rem", display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#222" }}>Molti altri brand disponibili</div>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.8, margin: 0 }}>
              Oltre ai marchi in evidenza, questa sede tratta un&apos;ampia selezione di prodotti cosmetici e dermatologici di altri brand. Se non trovi ciò che cerchi, puoi richiederlo direttamente in farmacia: provvederemo all&apos;ordine nel minor tempo possibile.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
    </>
  );
}
