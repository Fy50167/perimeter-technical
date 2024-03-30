'use client';

import ReactMapboxGl, {
    Layer,
    Feature,
    Source,
    Marker,
    ZoomControl,
} from 'react-mapbox-gl';
import { useState, useEffect } from 'react';
import './mapbox-gl.css';

export default function Map() {
    // Hold user position to set default map location
    const [userPosition, setUserPosition] = useState<[number, number] | null>(
        null
    );
    const [someState, setSomeState] = useState<number>(0);

    const Map = ReactMapboxGl({
        accessToken:
            'pk.eyJ1IjoiZnJhbmNpcy15YW5nIiwiYSI6ImNsdWJ4d3h5MzExNTMya2s0a2x0M3MybzAifQ.pkLkcbf73zZS0gEUzHz47A',
    });

    const position = () => {
        console.log(userPosition);
    };

    const changeState = () => {
        setSomeState(someState + 1);
    };

    useEffect(() => {
        // Fetch user's current position using browser's geolocation API
        navigator.geolocation.getCurrentPosition((position) => {
            const { longitude, latitude } = position.coords;
            setUserPosition([longitude, latitude]);
        });
    }, []);

    return (
        <>
            {userPosition ? (
                <div
                    className='w-4/5 h-[45rem] p-4 bg-slate-200 rounded-md'
                    onClick={() => changeState()}
                >
                    <div className='h-full w-full border-2 border-black border-solid rounded-md overflow-hidden'>
                        <Map
                            style='mapbox://styles/mapbox/streets-v11'
                            containerStyle={{
                                height: '100%',
                                width: '100%',
                            }}
                            zoom={[15]}
                            center={userPosition}
                        >
                            <ZoomControl />
                            <Layer
                                type='symbol'
                                id='marker'
                                layout={{ 'icon-image': 'marker-15' }}
                            >
                                <Feature coordinates={userPosition} />
                            </Layer>
                        </Map>
                    </div>
                </div>
            ) : (
                <p className='mt-5 text-heading2-semibold'>
                    Obtaining current location...
                </p>
            )}
        </>
    );
}
