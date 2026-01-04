import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import styles from "./Map.module.css";

const reverseGeocode = async ({ lng, lat }) => {
  const response = await fetch(
    `https://api.maptiler.com/geocoding/${lng},${lat}.json?key=f18LjJFT5ceYy706DQ1e`
  );
  const data = await response.json();

  if (data.features?.length) {
    const feature = data.features[0];
    const props = feature.properties || {};
    const street = props.street || "";
    const house = props.housenumber || "";
    const result = [street, house].filter(Boolean).join(" ");

    return result || feature.place_name || "Адрес не найден";
  }

  return "Адрес не найден";
};

export default function Map({ onSelect, data = [], allowMarkers = true }) {
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
        attributionControl: false,
      });

      instance.addControl(new maplibregl.NavigationControl(), "top-right");
      instance.addControl(new maplibregl.FullscreenControl(), "top-left");
      instance.addControl(
        new maplibregl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        }),
        "top-left"
      );

      if (allowMarkers) {
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
              const newAddress = await reverseGeocode({
                lng: newPos.lng,
                lat: newPos.lat,
              });

              new maplibregl.Popup({
                closeButton: false,
                closeOnClick: true,
              })
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

          if (onSelect) onSelect({ lng, lat, address });
        });
      }

      setMap(instance);
    }
  }, [map, allowMarkers, onSelect]);

  useEffect(() => {
    if (map && data.length) {
      data.forEach((district) => {
        new maplibregl.Marker({ color: "#4f46e5" })
          .setLngLat([district.lng, district.lat])
          .setPopup(
            new maplibregl.Popup().setHTML(
              `<strong>${district.name}</strong><br>Заявок: ${district.requests}`
            )
          )
          .addTo(map);
      });
    }
  }, [map, data]);
  return <div ref={mapRef} className={styles.mapContainer} />;
}
