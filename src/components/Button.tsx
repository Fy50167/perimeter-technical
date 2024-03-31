interface Props {
    value: string;
}

const Button = ({ value }: Props) => {
    // Set to uppercase to ensure normalization across all buttons
    const uppercase = value.toUpperCase();

    return (
        <button className='text-gold-2 text-body-bold bg-maroon-2 p2 w-1/5 border-2 border-black border-solid rounded-md'>
            {uppercase}
        </button>
    );
};

export default Button;
