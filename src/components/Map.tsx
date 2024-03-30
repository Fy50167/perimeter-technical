'use client';

import ReactMapboxGl, {
    Layer,
    Feature,
    Source,
    Marker,
    ZoomControl,
} from 'react-mapbox-gl';
import { useState, useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

export default function Map() {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const drawRef = useRef(null);

    useEffect(() => {
        mapboxgl.accessToken =
            'pk.eyJ1IjoiZnJhbmNpcy15YW5nIiwiYSI6ImNsdWJ4d3h5MzExNTMya2s0a2x0M3MybzAifQ.pkLkcbf73zZS0gEUzHz47A';

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [0, 0],
            zoom: 1,
        });

        const draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                polygon: true,
                trash: true,
            },
        });

        mapRef.current = map;
        drawRef.current = draw;

        map.addControl(draw);

        return () => {
            map.remove();
        };
    }, []);

    return (
        <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />
    );
}
