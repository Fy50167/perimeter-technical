'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import Marker from './Marker';
import { createRoot } from 'react-dom/client';
import Location from './Location';
import BottomBar from './BottomBar';

export default function Map() {
    // Using type any here since the standard <HTMLDivElement> didn't work; map-gl may have unique types?
    const mapContainer = useRef<any>(null);
    const map = useRef<any>(null);

    // Contain current longitude and latitude
    const [lng, setLng] = useState<number | null>(null);
    const [lat, setLat] = useState<number | null>(null);
    const [zoom, setZoom] = useState<number>(12);
    const [markers, setMarkers] = useState<[] | mapboxgl.Marker[]>([]);

    // Function to generate a polygon in-between markers assuming that we have at least 3
    const updatePolygon = () => {
        if (markers.length >= 3) {
            const coordinates = markers.map((marker) =>
                marker.getLngLat().toArray()
            );

            // We have to delete the current polygon to generate new one to avoid layers with duplicate ids
            if (map.current.getSource('polygon')) {
                map.current.removeLayer('polygon');
                map.current.removeSource('polygon');
            }

            map.current.addLayer({
                id: 'polygon',
                type: 'fill',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        geometry: {
                            type: 'Polygon',
                            coordinates: [coordinates],
                        },
                    },
                },
                layout: {},
                paint: {
                    'fill-color': '#6e1835',
                    'fill-opacity': 0.8,
                },
            });
        }
    };

    const clearMarkers = () => {
        setMarkers([]);
        updatePolygon();
    };

    const undoMarkers = () => {
        setMarkers((prevMarkers) => {
            const newMarkers = [...prevMarkers];
            newMarkers.pop();
            return newMarkers;
        });
        updatePolygon();
    };

    // Function to handle map click
    const handleMapClick = (evt: mapboxgl.MapMouseEvent) => {
        const markerElement = document.createElement('div');
        createRoot(markerElement).render(<Marker />);
        const newMarker = new mapboxgl.Marker({
            draggable: true,
            anchor: 'bottom',
            element: markerElement,
        })
            .setLngLat([evt.lngLat.lng, evt.lngLat.lat])

            .addTo(map.current);
        setMarkers((prevMarkers: mapboxgl.Marker[]) => [
            ...prevMarkers,
            newMarker,
        ]);
    };

    mapboxgl.accessToken =
        'pk.eyJ1IjoiZnJhbmNpcy15YW5nIiwiYSI6ImNsdWJ4d3h5MzExNTMya2s0a2x0M3MybzAifQ.pkLkcbf73zZS0gEUzHz47A';

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
        }
        // We can only set new coordinates/zoom if a map already exists
        if (map.current) {
            map.current.on('move', () => {
                setLng(map.current.getCenter().lng.toFixed(4));
                setLat(map.current.getCenter().lat.toFixed(4));
                setZoom(map.current.getZoom().toFixed(2));
            });
        }
    }, [lng, lat]);

    useEffect(() => {
        const handleMarkerDrag = () => {
            updatePolygon();
        };

        // Handle polygon updates whenever any marker is dragged
        markers.forEach((marker) => {
            marker.on('dragend', handleMarkerDrag);
        });

        // Handle polygon updates whenever new marker is added
        updatePolygon();

        return () => {
            if (map.current) {
                markers.forEach((marker) => {
                    marker.off('dragend', handleMarkerDrag);
                });
            }
        };
    }, [markers]);

    return (
        <>
            {lng && lat ? (
                <div className='w-4/5 h-[45rem] p-4 bg-slate-200 rounded-md'>
                    <div className='h-full w-full border-2 border-black border-solid rounded-md overflow-hidden z-0 flex flex-col items-center justify-center'>
                        <div className='w-full h-[92%] border-black border-b-2 border-solid relative'>
                            <Location lng={lng} lat={lat} zoom={zoom} />
                            <div
                                ref={mapContainer}
                                className='w-full h-full'
                            ></div>
                        </div>
                        <BottomBar />
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
