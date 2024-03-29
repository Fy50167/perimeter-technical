import Image from 'next/image';
import Map from '../../components/Map';

export default function Home() {
    return (
        <main className='min-h-screen min-w-screen bg-gradient flex flex-col justify-center items-center gap-4'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-heading1-bold'>
                    Perimeter Technical Exercise
                </h1>
                <h3 className='text-base-medium'>By: Francis Yang</h3>
            </div>
            <Map />
        </main>
    );
}
