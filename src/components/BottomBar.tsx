'use client';

import Swal from 'sweetalert2';

import Button from './Button';

interface Props {
    clearMarkers: () => void;
    undoMarkers: () => void;
    saveMarkers: (e: string) => void;
    markers: [] | mapboxgl.Marker[];
    polygonName: string;
    setPolygonName: React.Dispatch<React.SetStateAction<string>>;
}

const BottomBar = ({
    clearMarkers,
    undoMarkers,
    saveMarkers,
    markers,
    setPolygonName,
    polygonName,
}: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPolygonName(e.currentTarget.value);
    };

    // Conditions to check that we have a name and we have at least 3 points to generate a polygon
    const saveHandler = () => {
        if (!polygonName) {
            Swal.fire({
                title: 'Save failed.',
                text: "You're missing a title for your polygon!",
                icon: 'error',
                confirmButtonText: 'Confirm',
            });
        } else if (markers.length < 3) {
            Swal.fire({
                title: 'Save failed.',
                text: 'You need at least three points to save a polygon!',
                icon: 'error',
                confirmButtonText: 'Confirm',
            });
        } else {
            // Our save markers function already checks if the polygon exists to update, otherwise it just adds a new one
            saveMarkers(polygonName);
        }
    };

    return (
        <footer className='w-full flex-1 flex flex-col md:flex-row justify-evenly items-center p-2 m:p-0'>
            <div className='w-full md:w-1/2 flex flex-col md:flex-row items-center justify-evenly gap-2 md:gap-0 md:border-r-2 border-black border-solid mb-2 md:mb-0'>
                <Button
                    value={'undo'}
                    onClick={undoMarkers}
                    className={'w-3/5 md:w-1/5 md:min-w-[4.7rem]'}
                />
                <Button
                    value={'clear'}
                    onClick={clearMarkers}
                    className={'w-3/5 md:w-1/5 md:min-w-[4.7rem]'}
                />
                <Button
                    value={'save'}
                    onClick={saveHandler}
                    className={'w-3/5 md:w-1/5 md:min-w-[4.7rem]'}
                />
            </div>
            <div className='w-full md:w-1/2 flex items-center justify-center'>
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
        </footer>
    );
};

export default BottomBar;
