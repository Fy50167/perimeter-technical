'use client';

import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Map() {
    const Map = ReactMapboxGl({
        accessToken:
            'pk.eyJ1IjoiZnJhbmNpcy15YW5nIiwiYSI6ImNsdWJ4d3h5MzExNTMya2s0a2x0M3MybzAifQ.pkLkcbf73zZS0gEUzHz47A',
    });
    return (
        <div className='w-4/5 h-[45rem] p-4 bg-slate-200 rounded-md'>
            <div className='h-full w-full border-2 border-black border-solid rounded-md overflow-hidden'>
                <Map
                    style='mapbox://styles/mapbox/streets-v9'
                    containerStyle={{
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <Layer
                        type='symbol'
                        id='marker'
                        layout={{ 'icon-image': 'marker-15' }}
                    >
                        <Feature
                            coordinates={[-0.481747846041145, 51.3233379650232]}
                        />
                    </Layer>
                </Map>
            </div>
        </div>
    );
}
