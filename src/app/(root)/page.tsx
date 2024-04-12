'use client';

import Image from 'next/image';
import Map from '../../components/Map';
import { useState } from 'react';
import Instructions from '@/components/Instructions';

export default function Home() {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    return (
        <main className='min-h-screen min-w-screen bg-gradient flex flex-col justify-center items-center gap-4 p-4 overflow-auto'>
            <div className='flex flex-col justify-center items-center bg-maroon-2 px-8 py-4 rounded-md border-2 border-gold-2 border-solid relative'>
                <div className='w-auto h-auto absolute top-2 right-2 m-0 p-0'>
                    <div className='relative w-full h-full flex flex-col'>
                        <Image
                            src='/assets/question.png'
                            alt='question mark icon'
                            width={14}
                            height={14}
                            className='md:w-[1.25rem] md:h-[1.25rem] hover:cursor-pointer'
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        />
                        {isHovered && <Instructions />}
                    </div>
                </div>
                <h1 className='md:text-heading1-bold text-body-bold w-full'>
                    Interactive Map
                </h1>
                <h3 className='text-small-medium md:text-base-medium'>
                    By: Francis Yang
                </h3>
            </div>
            <Map />
        </main>
    );
}
