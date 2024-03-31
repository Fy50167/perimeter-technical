'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useEffect, useRef } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';

export default function Map() {
    // Using type any here since the standard <HTMLDivElement> didn't work; map-gl may have unique types?
    const mapContainer = useRef<any>(null);
    const map = useRef<any>(null);

    // Contain current longitude and latitude
    const [lng, setLng] = useState<number | null>(null);
    const [lat, setLat] = useState<number | null>(null);
    const [zoom, setZoom] = useState<number>(12);

    const [points, setPoints] = useState<any>([]);

    // Function to handle map click
    const handleMapClick = (evt: any) => {
        const newMarker = new mapboxgl.Marker()
            .setLngLat([evt.lngLat.lng, evt.lngLat.lat])
            .addTo(map.current);
    };

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
        // Check if there is no map; we only want to initailize this once!
        if (lng !== null && lat !== null && !map.current) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [lng, lat],
                zoom: zoom,
            });
            map.current.addControl(new mapboxgl.NavigationControl());
            map.current.on('click', handleMapClick);
        } else {
            // We can only set new coordinates/zoom if a map already exists
            if (map.current) {
                map.current.on('move', () => {
                    setLng(map.current.getCenter().lng.toFixed(4));
                    setLat(map.current.getCenter().lat.toFixed(4));
                    setZoom(map.current.getZoom().toFixed(2));
                });
            }
        }
    }, [lng, lat]);

    return (
        <>
            {lng && lat ? (
                <div className='w-4/5 h-[45rem] p-4 bg-slate-200 rounded-md'>
                    <div className='h-full w-full border-2 border-black border-solid rounded-md overflow-hidden z-0 relative'>
                        <div className='absolute z-10 bg-blue-950 p-2 rounded-md top-2 left-2 opacity-90'>
                            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                        </div>
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
