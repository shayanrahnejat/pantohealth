import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useMap from "@/store/store";

export const customIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],      // default Leaflet size
  iconAnchor: [12, 41],    // point that corresponds to marker location
  popupAnchor: [1, -34],   // point from marker where popup opens
  shadowSize: [41, 41],    // default shadow size
});

export default function Map() {
  const city: string = useMap((state) => state.current);
  const station: String = useMap((state) => state.station);
  const coords: {
    id: number;
    name: string;
    city: string;
    lat: number;
    lng: number;
  }[] = useMap((state) => state.coords);
  useEffect(() => {
    const map = L.map("map");

    if (station == "all") {
      map.setView([51.1657, 10.4515], 5);
    } else {
      coords.map(({ name, lat, lng }) => {
        name == station && map.setView([lat, lng], 20);
      });
    }
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution: "&copy; OpenStreetMap & CARTO",
        subdomains: "abcd",
        maxZoom: 19,
      }
    ).addTo(map);

    if (city === "all") {
      coords.forEach(({ name, lat, lng }) => {
        L.marker([lat, lng], { icon: customIcon }).addTo(map).bindPopup(`<b>${name}</b>`);
      });
    } else {
      coords.forEach(({ city: cityn, name, lat, lng }) => {
        if (cityn == city) {
          L.marker([lat, lng], { icon: customIcon }).addTo(map).bindPopup(`<b>${name}</b>`);
        }
      });
    }

    return () => {
      map.remove();
    };
  }, [city, coords, station]);

  return (
    <div id="map" className="w-full h-screen absolute z-10 bg-[#0b0f14]" />
  );
}
