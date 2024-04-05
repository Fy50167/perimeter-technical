'use client';

import { createRoot } from 'react-dom/client';
import Button from './Button';
import Marker from './Marker';
import mapboxgl from 'mapbox-gl';
import { useState } from 'react';
import Image from 'next/image';
import { deletePolygon, getPolygon } from '@/lib/actions/polygon.actions';

interface Polygon {
    name: string;
    coordinates: number[][];
}

interface Props {
    map: any;
    markers: [] | mapboxgl.Marker[];
    setMarkers: React.Dispatch<React.SetStateAction<mapboxgl.Marker[]>>;
    setCoordinates: React.Dispatch<React.SetStateAction<number[][]>>;
    savedPolygons: Polygon[] | [];
    setSavedPolygons: React.Dispatch<React.SetStateAction<Polygon[]>>;
    setPolygonName: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar = ({
    map,
    markers,
    setMarkers,
    setCoordinates,
    savedPolygons,
    setSavedPolygons,
    setPolygonName,
}: Props) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpand = () => {
        setExpanded(!expanded);
    };
    // Select a previously saved polygon
    const selectPolygon = async (name: string) => {
        if (markers) markers.forEach((marker) => marker.remove());
        setPolygonName(name);
        const polygon = await getPolygon(name);

        // Create an array to hold the new markers
        const newMarkers: mapboxgl.Marker[] = [];

        // Add markers in bulk
        for (let i = 0; i < polygon.coordinates.length; i++) {
            const markerElement = document.createElement('div');
            createRoot(markerElement).render(<Marker />);
            const newMarker = new mapboxgl.Marker({
                draggable: true,
                anchor: 'bottom',
                element: markerElement,
            });
            const lngLat = polygon.coordinates[i];
            newMarker.setLngLat(lngLat).addTo(map);
            newMarkers.push(newMarker);
        }

        // Update the markers state with the new markers
        setMarkers(newMarkers);
        setCoordinates(polygon.coordinates);
    };

    // Delete polygons by filtering out the polygons that has the same name
    const deleteSelected = async (name: string) => {
        await deletePolygon(name);
        setSavedPolygons(
            savedPolygons.filter((polygon) => polygon.name !== name)
        );
    };

    return (
        <aside className='min-h-[2rem] h-auto md:h-full flex-1 rounded-md md:border-2 border-solid border-black relative flex flex-col min-w-[200px] w-full md:w-auto'>
            <div
                className={`h-[2rem] md:h-[5%] w-full border-b-2 border-black bg-maroon-2 flex items-center justify-center relative ${
                    expanded ? 'rounded-t-md' : 'rounded-md'
                } md:rounded-none`}
            >
                <h3 className='text-gold-2 w-full text-base-semibold flex justify-center items-center'>
                    SAVED POLYGONS
                </h3>
                <Image
                    alt='menu icon'
                    src='/assets/hamburger.png'
                    height={18}
                    width={18}
                    className='md:hidden absolute right-8 w-[18px] h-[18px]'
                    onClick={() => handleExpand()}
                />
            </div>
            <div
                className={`flex-1 w-full overflow-auto scroll md:block absolute top-[2rem] md:top-0 z-10 md:relative max-h-[41rem] md:max-h-none bg-slate-500 md:bg-inherit ${
                    expanded ? 'block' : 'hidden'
                }`}
            >
                {savedPolygons.length === 0 ? (
                    <h3 className='text-black h-auto text-small-semibold w-full flex flex-wrap p-1'>
                        No saved polygons yet...
                    </h3>
                ) : (
                    savedPolygons.map((polygon) => (
                        <div
                            className='min-h-[5%] h-auto w-full border-b-2 border-black flex justify-center items-center p-1'
                            key={polygon.name}
                        >
                            <h3 className='text-black h-auto text-small-semibold w-3/4 flex flex-wrap'>
                                {polygon.name}
                            </h3>
                            <div className='flex justify-evenly items-center w-full flex-1 border-l-2 border-black border-solid pl-1'>
                                <Button
                                    image={'/assets/select.png'}
                                    onClick={() => selectPolygon(polygon.name)}
                                />
                                <Button
                                    image={'/assets/trash.png'}
                                    onClick={() => deleteSelected(polygon.name)}
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
