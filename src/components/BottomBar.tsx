'use client';

import { useState } from 'react';

import Button from './Button';

const BottomBar = () => {
    const [polygonName, setPolygonName] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPolygonName(e.currentTarget.value);
    };
    return (
        <div className='w-full flex-1 flex justify-evenly items-center'>
            <div className='flex-1 flex items-center justify-evenly border-r-2 border-black border-solid'>
                <Button value={'undo'} />
                <Button value={'clear'} />
                <Button value={'save'} />
            </div>
            <div className='flex-1 flex items-center justify-center'>
                <label htmlFor='name' className='text-black mr-4'>
                    Name:{' '}
                </label>
                <input
                    type='text'
                    name='name'
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
