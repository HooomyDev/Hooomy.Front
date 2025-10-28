import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import styles from "./Map.module.css";

const reverseGeocode = async ({ lng, lat }) => {
  const response = await fetch(
    `https://api.maptiler.com/geocoding/${lng},${lat}.json?key=f18LjJFT5ceYy706DQ1e`
  );
  const data = await response.json();
  return data.features?.[0]?.place_name || "Адрес не найден";
};

export default function Map({ onSelect }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (mapRef.current && !map) {
      const instance = new maplibregl.Map({
        container: mapRef.current,
        style:
          "https://api.maptiler.com/maps/streets/style.json?key=f18LjJFT5ceYy706DQ1e",
        center: [27.5619, 53.9023],
        zoom: 12,
      });

      instance.on("click", async (e) => {
        const { lng, lat } = e.lngLat;

        const address = await reverseGeocode({ lng, lat });

        if (markerRef.current) {
          markerRef.current.setLngLat([lng, lat]);
        } else {
          markerRef.current = new maplibregl.Marker({
            color: "#ff6600",
            draggable: true,
          })
            .setLngLat([lng, lat])
            .addTo(instance);

          markerRef.current.on("dragend", async () => {
            const newPos = markerRef.current.getLngLat();
            const newAddress = await reverseGeocode(newPos);
            new maplibregl.Popup()
              .setLngLat([newPos.lng, newPos.lat])
              .setHTML(`<strong>Адрес:</strong><br>${newAddress}`)
              .addTo(instance);

            if (onSelect)
              onSelect({
                lng: newPos.lng,
                lat: newPos.lat,
                address: newAddress,
              });
          });
        }

        new maplibregl.Popup()
          .setLngLat([lng, lat])
          .setHTML(`<strong>Адрес:</strong><br>${address}`)
          .addTo(instance);

        if (onSelect) onSelect({ lng, lat, address });
      });

      setMap(instance);
    }
  }, [map, onSelect]);

  return <div ref={mapRef} className={styles.mapContainer} />;
}
