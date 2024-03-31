'use client';

import { useState } from 'react';

import Button from './Button';

interface Props {
    clearMarkers: () => void;
    undoMarkers: () => void;
    markerName: string;
    setMarkerName: React.Dispatch<React.SetStateAction<string>>;
}

const BottomBar = ({
    clearMarkers,
    undoMarkers,
    setMarkerName,
    markerName,
}: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMarkerName(e.currentTarget.value);
    };
    return (
        <div className='w-full flex-1 flex justify-evenly items-center'>
            <div className='flex-1 flex items-center justify-evenly border-r-2 border-black border-solid'>
                <Button value={'undo'} onClick={undoMarkers} />
                <Button value={'clear'} onClick={clearMarkers} />
                <Button value={'save'} />
            </div>
            <div className='flex-1 flex items-center justify-center'>
                <label htmlFor='name' className='text-black mr-4'>
                    Name:{' '}
                </label>
                <input
                    type='text'
                    name='name'
                    id='name'
                    value={markerName}
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
