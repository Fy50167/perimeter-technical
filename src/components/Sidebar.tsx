import React from 'react';

interface Polygon {
    name: string;
    coordinates: Array<mapboxgl.Marker>;
}

interface Props {
    savedPolygons: Polygon[] | [];
}

const Sidebar = ({ savedPolygons }: Props) => {
    return (
        <aside className='h-full flex-1 rounded-md border-2 border-solid border-black flex flex-col'>
            <div className='h-[5%] w-full border-b-2 border-black bg-maroon-2'>
                <h3 className='text-gold-2 h-full w-full text-body-bold flex justify-center items-center'>
                    SAVED POLYGONS
                </h3>
            </div>
        </aside>
    );
};

export default Sidebar;
