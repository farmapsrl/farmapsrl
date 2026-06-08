import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function FitBounds({ farmacie }) {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds(farmacie.map((f) => [f.lat, f.lng]));
    map.fitBounds(bounds, { padding: [48, 48] });
  }, [map, farmacie]);
  return null;
}

const icon = L.divIcon({
  className: "",
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="38" viewBox="0 0 28 38">
    <path d="M14 0C6.27 0 0 6.27 0 14c0 9.625 14 24 14 24S28 23.625 28 14C28 6.27 21.73 0 14 0z" fill="#3B6D11"/>
    <circle cx="14" cy="14" r="6" fill="#fff"/>
  </svg>`,
  iconSize: [28, 38],
  iconAnchor: [14, 38],
  popupAnchor: [0, -40],
});

export default function Map({ farmacie }) {
  return (
    <MapContainer
      center={[45.18, 9.45]}
      zoom={8}
      style={{ height: "420px", width: "100%", borderRadius: 14, zIndex: 0 }}
      scrollWheelZoom={false}
    >
      <FitBounds farmacie={farmacie} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {farmacie.map((f) => (
        <Marker key={f.slug} position={[f.lat, f.lng]} icon={icon}>
          <Popup>
            <div style={{ fontFamily: "'Lexend', sans-serif", minWidth: 160 }}>
              <div style={{ fontSize: 10, color: "#3B6D11", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>FarmaP</div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{f.nome}</div>
              <div style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>{f.citta}</div>
              <a
                href={"/" + f.slug}
                style={{ fontSize: 12, color: "#fff", fontWeight: 500, textDecoration: "none", background: "#3B6D11", padding: "5px 12px", borderRadius: 6, display: "inline-block" }}
              >
                Scopri →
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
