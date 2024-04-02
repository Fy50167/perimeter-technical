'use client';

import { useState } from 'react';

import Button from './Button';

interface Props {
    clearMarkers: () => void;
    undoMarkers: () => void;
    saveMarkers: () => void;
    polygonName: string;
    setPolygonName: React.Dispatch<React.SetStateAction<string>>;
}

const BottomBar = ({
    clearMarkers,
    undoMarkers,
    saveMarkers,
    setPolygonName,
    polygonName,
}: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPolygonName(e.currentTarget.value);
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
                    onClick={saveMarkers}
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
