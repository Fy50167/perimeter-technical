'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import Marker from './Marker';
import { createRoot } from 'react-dom/client';
import Location from './Location';
import BottomBar from './BottomBar';
import Sidebar from './Sidebar';
import {
    createPolygon,
    fetchPolygons,
    getPolygon,
    updateSavedPolygon,
} from '@/lib/actions/polygon.actions';
import Swal from 'sweetalert2';

interface Polygon {
    name: string;
    coordinates: number[][];
}

export default function Map() {
    if (!process.env.NEXT_PUBLIC_ACCESS_TOKEN)
        throw new Error('Mapbox access token is not defined');

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

    // Using type any here since the standard <HTMLDivElement> didn't work; map-gl may have unique types?
    const mapContainer = useRef<any>(null);
    const map = useRef<any>(null);

    // Contain current longitude and latitude
    const [lng, setLng] = useState<number | null>(null);
    const [lat, setLat] = useState<number | null>(null);
    const [zoom, setZoom] = useState<number>(12);
    const [markers, setMarkers] = useState<[] | mapboxgl.Marker[]>([]);
    const [coordinates, setCoordinates] = useState<number[][]>([]);
    const [savedPolygons, setSavedPolygons] = useState<[] | Polygon[]>([]);
    const [polygonName, setPolygonName] = useState<string>('');

    // Function to generate a polygon in-between markers assuming that we have at least 3
    const updatePolygon = () => {
        // Always remove our current polygon before generating a new one
        if (map.current?.getSource('polygon')) {
            map.current.removeLayer('polygon');
            map.current.removeSource('polygon');
        }

        // Only generate a polygon if there are at least 3 markers
        if (coordinates.length >= 3) {
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
        setCoordinates([]);
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

    // Function to replace and save markers to saved polygons
    const saveMarkers = async (name: string) => {
        const polygon = await getPolygon(name);

        if (polygon) {
            await updateSavedPolygon(name, coordinates);
            Swal.fire({
                title: 'Success.',
                text: 'Your polygon has been updated.',
                icon: 'success',
                confirmButtonText: 'Confirm',
            });
        } else {
            await createPolygon(name, coordinates);
            Swal.fire({
                title: 'Success.',
                text: 'Your polygon has been created.',
                icon: 'success',
                confirmButtonText: 'Confirm',
            });

            setSavedPolygons([
                ...savedPolygons,
                {
                    name: name,
                    coordinates: coordinates,
                },
            ]);
        }

        clearMarkers();
        setPolygonName('');
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
        setCoordinates((prevCoordinates: number[][]) => [
            ...prevCoordinates,
            [evt.lngLat.lng, evt.lngLat.lat],
        ]);
    };

    // On initial load, fetch user's current position using browser's geolocation API and set default longitutde and latitude
    useEffect(() => {
        // Fetch all polygons on initial load
        const fetchAndSetPolygons = async () => {
            const polygons = await fetchPolygons();
            setSavedPolygons(polygons);
        };

        fetchAndSetPolygons();
        console.log(savedPolygons);

        // Ask for user location for default map position
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { longitude, latitude } = position.coords;
                setLng(longitude);
                setLat(latitude);
            },

            () => {
                setLng(-0.1282);
                setLat(51.5051);
            }
        );
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
    }, [lng, lat, zoom, mapContainer]);

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

        // Remove event listeners if component is unmounted; not really applicable here but best practice
        return () => {
            if (map.current) {
                markers.forEach((marker) => {
                    marker.off('dragend', handleMarkerDrag);
                });
            }
        };
    }, [markers, coordinates, updatePolygon]);

    return (
        <>
            {lng && lat ? (
                <section className='md:min-w-[48rem] w-[90%] md:w-4/5 min-h-[45rem] h-[45rem] p-4 bg-slate-200 rounded-md flex flex-col md:flex-row justify-evenly gap-4'>
                    <Sidebar
                        map={map.current}
                        markers={markers}
                        setMarkers={setMarkers}
                        setCoordinates={setCoordinates}
                        savedPolygons={savedPolygons}
                        setSavedPolygons={setSavedPolygons}
                        setPolygonName={setPolygonName}
                    />
                    <div className='h-full w-full md:w-4/5 border-2 border-black border-solid rounded-md overflow-hidden z-0 flex flex-col items-center justify-center'>
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
                            markers={markers}
                            setPolygonName={setPolygonName}
                            polygonName={polygonName}
                        />
                    </div>
                </section>
            ) : (
                <p className='mt-5 text-heading2-semibold text-center'>
                    Obtaining current location...
                </p>
            )}
        </>
    );
}
