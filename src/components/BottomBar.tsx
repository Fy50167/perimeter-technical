'use client';

import Swal from 'sweetalert2';

import Button from './Button';

interface Polygon {
    name: string;
    coordinates: Array<mapboxgl.Marker>;
}

interface Props {
    clearMarkers: () => void;
    undoMarkers: () => void;
    saveMarkers: () => void;
    polygonName: string;
    setPolygonName: React.Dispatch<React.SetStateAction<string>>;
    savedPolygons: [] | Polygon[];
}

const BottomBar = ({
    clearMarkers,
    undoMarkers,
    saveMarkers,
    setPolygonName,
    polygonName,
    savedPolygons,
}: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPolygonName(e.currentTarget.value);
    };

    // Conditions to check that we have a name and we get no duplicate names
    const saveHandler = () => {
        if (!polygonName) {
            Swal.fire({
                title: 'Save failed.',
                text: "You're missing a title for your polygon!",
                icon: 'error',
                confirmButtonText: 'Confirm',
            });
        } else if (
            savedPolygons.some((polygon) => polygon.name === polygonName)
        ) {
            Swal.fire({
                title: 'Save failed.',
                text: 'You already have a polygon with that name.',
                icon: 'error',
                confirmButtonText: 'Confirm',
            });
        } else {
            saveMarkers();
        }
    };

    return (
        <div className='w-full flex-1 flex justify-evenly items-center'>
            <div className='flex-1 flex items-center justify-evenly border-r-2 border-black border-solid'>
                <Button
                    value={'undo'}
                    onClick={undoMarkers}
                    className={'w-1/5'}
                />
                <Button
                    value={'clear'}
                    onClick={clearMarkers}
                    className={'w-1/5'}
                />
                <Button
                    value={'save'}
                    onClick={saveHandler}
                    className={'w-1/5'}
                />
            </div>
            <div className='flex-1 flex items-center justify-center'>
                <label htmlFor='name' className='text-black mr-4'>
                    Name:{' '}
                </label>
                <input
                    type='text'
                    name='name'
                    id='name'
                    value={polygonName}
                    placeholder='Polygon name'
                    className='w-3/5 p-2 text-black'
                    onChange={handleChange}
                    maxLength={30}
                />
            </div>
        </div>
    );
};

export default BottomBar;
