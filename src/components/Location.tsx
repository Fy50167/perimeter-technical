interface Props {
    lng: number;
    lat: number;
    zoom: number;
}

const Location = ({ lng, lat, zoom }: Props) => {
    return (
        <div className='absolute z-10 bg-blue-950 p-2 rounded-md top-2 left-2 opacity-90 text-small-regular md:text-body-normal'>
            Longitude: {lng}
            <span className='divider'> | </span>
            <br className='mobile-line-break' />
            Latitude: {lat}
            <span className='divider'> | </span>
            <br className='mobile-line-break' />
            Zoom: {zoom}
        </div>
    );
};

export default Location;
