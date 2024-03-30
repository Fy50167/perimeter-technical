'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

export default function Map() {
    const mapContainer = useRef<any>(null);
    const map = useRef<any>(null);

    // Contain current longitude and latitude
    const [lng, setLng] = useState<number | null>(null);
    const [lat, setLat] = useState<number | null>(null);
    const [zoom, setZoom] = useState<number>(12);

    mapboxgl.accessToken =
        'pk.eyJ1IjoiZnJhbmNpcy15YW5nIiwiYSI6ImNsdWJ4d3h5MzExNTMya2s0a2x0M3MybzAifQ.pkLkcbf73zZS0gEUzHz47A';

    const position = () => {
        console.log([lng, lat]);
    };

    useEffect(() => {
        // Fetch user's current position using browser's geolocation API and set default longitutde and latitude
        navigator.geolocation.getCurrentPosition((position) => {
            const { longitude, latitude } = position.coords;
            setLng(longitude);
            setLat(latitude);
        });
    }, []);

    useEffect(() => {
        if (lng !== null && lat !== null && !map.current) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [lng, lat],
                zoom: zoom,
            });
        }
    }, [lng, lat]);

    return (
        <>
            {lng && lat ? (
                <div className='w-4/5 h-[45rem] p-4 bg-slate-200 rounded-md'>
                    <div className='h-full w-full border-2 border-black border-solid rounded-md overflow-hidden'>
                        <div ref={mapContainer} className='w-full h-full'></div>
                    </div>
                </div>
            ) : (
                <p className='mt-5 text-heading2-semibold'>
                    Obtaining current location...
                </p>
            )}
        </>
    );
}
