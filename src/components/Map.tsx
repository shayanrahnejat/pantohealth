import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useMap from "@/store/store";

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
        L.marker([lat, lng]).addTo(map).bindPopup(`<b>${name}</b>`);
      });
    } else {
      coords.forEach(({ city: cityn, name, lat, lng }) => {
        if (cityn == city) {
          L.marker([lat, lng]).addTo(map).bindPopup(`<b>${name}</b>`);
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
