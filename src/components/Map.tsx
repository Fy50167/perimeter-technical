'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import Marker from './Marker';
import { createRoot } from 'react-dom/client';
import Location from './Location';
import BottomBar from './BottomBar';
import Sidebar from './Sidebar';

interface Polygon {
    name: string;
    coordinates: Array<mapboxgl.Marker>;
}

export default function Map() {
    mapboxgl.accessToken =
        'pk.eyJ1IjoiZnJhbmNpcy15YW5nIiwiYSI6ImNsdWJ4d3h5MzExNTMya2s0a2x0M3MybzAifQ.pkLkcbf73zZS0gEUzHz47A';

    // Using type any here since the standard <HTMLDivElement> didn't work; map-gl may have unique types?
    const mapContainer = useRef<any>(null);
    const map = useRef<any>(null);

    // Contain current longitude and latitude
    const [lng, setLng] = useState<number | null>(null);
    const [lat, setLat] = useState<number | null>(null);
    const [zoom, setZoom] = useState<number>(12);
    const [markers, setMarkers] = useState<[] | mapboxgl.Marker[]>([]);
    const [savedPolygons, setSavedPolygons] = useState<[] | Polygon[]>([]);
    const [polygonName, setPolygonName] = useState<string>('');

    // Function to generate a polygon in-between markers assuming that we have at least 3
    const updatePolygon = () => {
        if (map.current?.getSource('polygon')) {
            map.current.removeLayer('polygon');
            map.current.removeSource('polygon');
        }
        if (markers.length >= 3) {
            const coordinates = markers.map((marker) =>
                marker.getLngLat().toArray()
            );

            // We have to delete the current polygon, either whenever we generate a new one or clear markers

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

    // Functions to clear and undo markers
    const clearMarkers = () => {
        markers.forEach((marker) => marker.remove());
        setMarkers([]);
    };

    const undoMarkers = () => {
        const lastMarker = markers[markers.length - 1];
        if (lastMarker) {
            lastMarker.remove();
        }
        setMarkers((prevMarkers) => {
            const newMarkers = [...prevMarkers];
            newMarkers.pop();
            return newMarkers;
        });
    };

    const saveMarkers = () => {
        if (polygonName !== '') {
            setSavedPolygons([
                ...savedPolygons,
                {
                    name: polygonName,
                    coordinates: markers,
                },
            ]);
            // Clear markers after they are saved
            clearMarkers();
            setPolygonName('');
        } else {
        }
    };

    // Function to handle map click, generating new markers
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

    // On initial load, fetch user's current position using browser's geolocation API and set default longitutde and latitude
    useEffect(() => {
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
                <section className='w-4/5 h-[45rem] p-4 bg-slate-200 rounded-md flex justify-evenly gap-4'>
                    <Sidebar
                        savedPolygons={savedPolygons}
                        setSavedPolygons={setSavedPolygons}
                    />
                    <div className='h-full w-4/5 border-2 border-black border-solid rounded-md overflow-hidden z-0 flex flex-col items-center justify-center'>
                        <div className='w-full h-[92%] border-black border-b-2 border-solid relative'>
                            <Location lng={lng} lat={lat} zoom={zoom} />
                            <div
                                ref={mapContainer}
                                className='w-full h-full'
                            ></div>
                        </div>
                        <BottomBar
                            clearMarkers={clearMarkers}
                            undoMarkers={undoMarkers}
                            saveMarkers={saveMarkers}
                            setPolygonName={setPolygonName}
                            polygonName={polygonName}
                            savedPolygons={savedPolygons}
                        />
                    </div>
                </section>
            ) : (
                <p className='mt-5 text-heading2-semibold'>
                    Obtaining current location...
                </p>
            )}
        </>
    );
}
