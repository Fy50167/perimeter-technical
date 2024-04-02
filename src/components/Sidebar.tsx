import { createRoot } from 'react-dom/client';
import Button from './Button';
import Marker from './Marker';
import mapboxgl from 'mapbox-gl';

interface Polygon {
    name: string;
    coordinates: Array<mapboxgl.Marker>;
}

interface Props {
    map: any;
    markers: [] | mapboxgl.Marker[];
    setMarkers: React.Dispatch<React.SetStateAction<mapboxgl.Marker[]>>;
    savedPolygons: Polygon[] | [];
    setSavedPolygons: React.Dispatch<React.SetStateAction<Polygon[]>>;
    setPolygonName: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar = ({
    map,
    markers,
    setMarkers,
    savedPolygons,
    setSavedPolygons,
    setPolygonName,
}: Props) => {
    // Select a previously saved polygon
    const selectPolygon = (name: string) => {
        if (markers) markers.forEach((marker) => marker.remove());
        setPolygonName(name);
        const selected = savedPolygons.find(
            (polygon) => polygon.name === name
        )!;

        // Create an array to hold the new markers
        const newMarkers: mapboxgl.Marker[] = [];

        // Add markers in bulk
        for (let i = 0; i < selected.coordinates.length; i++) {
            const markerElement = document.createElement('div');
            createRoot(markerElement).render(<Marker />);
            const newMarker = new mapboxgl.Marker({
                draggable: true,
                anchor: 'bottom',
                element: markerElement,
            });
            const lngLat = selected.coordinates[i].getLngLat();
            newMarker.setLngLat(lngLat).addTo(map);
            newMarkers.push(newMarker);
        }

        // Update the markers state with the new markers
        setMarkers(newMarkers);
    };

    // Delete polygons by filtering out the polygons that has the same name
    const deletePolygon = (name: string) => {
        setSavedPolygons(
            savedPolygons.filter((polygon) => polygon.name !== name)
        );
    };

    return (
        <aside className='h-full flex-1 rounded-md border-2 border-solid border-black flex flex-col min-w-[200px]'>
            <div className='h-[5%] w-full border-b-2 border-black bg-maroon-2'>
                <h3 className='text-gold-2 h-full w-full text-medium-semibold lg:text-base-semibold flex justify-center items-center'>
                    SAVED POLYGONS
                </h3>
            </div>
            {savedPolygons.map((polygon) => (
                <div
                    className='h-[5%] w-full border-b-2 border-black flex justify-center items-center p-1'
                    key={polygon.name}
                >
                    <h3 className='text-black text-base-semibold w-3/4'>
                        {polygon.name}
                    </h3>
                    <div className='flex justify-evenly items-center w-full flex-1 border-l-2 border-black border-solid pl-1'>
                        <Button
                            image={'/assets/select.png'}
                            onClick={() => selectPolygon(polygon.name)}
                        />
                        <Button
                            image={'/assets/trash.png'}
                            onClick={() => deletePolygon(polygon.name)}
                        />
                    </div>
                </div>
            ))}
        </aside>
    );
};

export default Sidebar;
