interface Props {
    value: string;
    onClick: () => void;
}

const Button = ({ value, onClick }: Props) => {
    // Set to uppercase to ensure normalization across all buttons
    const uppercase = value.toUpperCase();

    return (
        <button
            className='text-gold-2 text-body-bold bg-maroon-2 p2 w-1/5 border-2 border-black border-solid rounded-md tracking-widest'
            onClick={() => onClick()}
        >
            {uppercase}
        </button>
    );
};

export default Button;
