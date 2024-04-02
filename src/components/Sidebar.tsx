import Button from './Button';

interface Polygon {
    name: string;
    coordinates: Array<mapboxgl.Marker>;
}

interface Props {
    savedPolygons: Polygon[] | [];
}

const Sidebar = ({ savedPolygons }: Props) => {
    return (
        <aside className='h-full flex-1 rounded-md border-2 border-solid border-black flex flex-col min-w-[200px]'>
            <div className='h-[5%] w-full border-b-2 border-black bg-maroon-2'>
                <h3 className='text-gold-2 h-full w-full text-medium-semibold lg:text-base-semibold flex justify-center items-center'>
                    SAVED POLYGONS: {savedPolygons.length}/20
                </h3>
            </div>
            {savedPolygons.map((polygon) => (
                <div
                    className='h-[5%] w-full border-b-2 border-black flex justify-center items-center p-1'
                    key={polygon.name}
                >
                    <h3 className='text-black text-base-semibold w-3/4'>
                        {polygon.name}
                    </h3>
                    <div className='flex justify-evenly items-center w-full flex-1 border-l-2 border-black border-solid pl-1'>
                        <Button image={'/assets/select.png'} />
                        <Button image={'/assets/trash.png'} />
                    </div>
                </div>
            ))}
        </aside>
    );
};

export default Sidebar;
