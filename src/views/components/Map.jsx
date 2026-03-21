
import { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import '../../assets/styles/MapContainer.css';

export default function Map({ lat, lon }) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const zoom = 14;

    maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

    useEffect(() => {
        if (!map.current) {
            map.current = new maptilersdk.Map({
                container: mapContainer.current,
                style: maptilersdk.MapStyle.STREETS,
                center: [lon, lat],
                zoom: zoom
            });
        } else {
            map.current.setCenter([lon, lat]);
        }
    }, [lon, lat]);

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
}
