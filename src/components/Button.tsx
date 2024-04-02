import Image from 'next/image';

interface Props {
    value?: string;
    onClick?: () => void;
    className?: string;
    image?: string;
}

const Button = ({ value, onClick, className, image }: Props) => {
    // Set to uppercase to ensure normalization across all buttons
    const uppercase = value?.toUpperCase();

    return (
        <button
            className={`text-gold-2 lg:text-base-semibold text-small-semibold bg-maroon-2 p2 border-2 border-black border-solid rounded-md lg:tracking-widest ${
                className ? `${className}` : ''
            }`}
            onClick={() => onClick?.()}
        >
            {image && (
                <Image alt='icon' src={`${image}`} width={20} height={20} />
            )}
            {uppercase && uppercase}
        </button>
    );
};

export default Button;
