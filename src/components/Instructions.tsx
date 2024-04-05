import Image from 'next/image';
import React from 'react';
import { instructions } from '@/constants';

const Instructions = () => {
    return (
        <div className='absolute right-[-4px] md:right-0 top-6 md:top-8 w-[12rem] md:w-[12rem] z-20'>
            <div className='relative'>
                <div className='bg-slate-500 rounded-md border-black border-2 border-solid p-2 flex flex-col'>
                    <h2 className='text-small-semibold'>How to use:</h2>

                    <ul className='text-small-regular'>
                        {instructions.map((instruction, index) => (
                            <li
                                key={index}
                                className={`${
                                    index !== instructions.length - 1
                                        ? 'mb-2'
                                        : ''
                                }`}
                            >
                                {instruction}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='absolute right-0 top-0 w-4 h-4 transform rotate-45 -mt-1 mr-1'>
                    <div className='bg-slate-500 w-full h-full border-black border-t-2 border-solid z-30' />
                </div>
            </div>
        </div>
    );
};

export default Instructions;
