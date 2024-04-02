import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        fontSize: {
            'heading1-bold': [
                '36px',
                {
                    lineHeight: '140%',
                    fontWeight: '700',
                },
            ],
            'heading1-semibold': [
                '36px',
                {
                    lineHeight: '140%',
                    fontWeight: '600',
                },
            ],
            'heading2-bold': [
                '30px',
                {
                    lineHeight: '140%',
                    fontWeight: '700',
                },
            ],
            'heading2-semibold': [
                '30px',
                {
                    lineHeight: '140%',
                    fontWeight: '600',
                },
            ],
            'heading3-bold': [
                '24px',
                {
                    lineHeight: '140%',
                    fontWeight: '700',
                },
            ],
            'heading4-medium': [
                '20px',
                {
                    lineHeight: '140%',
                    fontWeight: '500',
                },
            ],
            'body-bold': [
                '18px',
                {
                    lineHeight: '140%',
                    fontWeight: '700',
                },
            ],
            'body-semibold': [
                '18px',
                {
                    lineHeight: '140%',
                    fontWeight: '600',
                },
            ],
            'body-medium': [
                '18px',
                {
                    lineHeight: '140%',
                    fontWeight: '500',
                },
            ],
            'body-normal': [
                '17px',
                {
                    lineHeight: '140%',
                    fontWeight: '400',
                },
            ],
            'body1-bold': [
                '18px',
                {
                    lineHeight: '140%',
                    fontWeight: '700',
                },
            ],
            'base-regular': [
                '16px',
                {
                    lineHeight: '140%',
                    fontWeight: '400',
                },
            ],
            'base-medium': [
                '16px',
                {
                    lineHeight: '140%',
                    fontWeight: '500',
                },
            ],
            'base-semibold': [
                '16px',
                {
                    lineHeight: '140%',
                    fontWeight: '600',
                },
            ],
            'base1-semibold': [
                '16px',
                {
                    lineHeight: '140%',
                    fontWeight: '600',
                },
            ],
            'small-regular': [
                '14px',
                {
                    lineHeight: '140%',
                    fontWeight: '400',
                },
            ],
            'small-medium': [
                '14px',
                {
                    lineHeight: '140%',
                    fontWeight: '500',
                },
            ],
            'small-semibold': [
                '14px',
                {
                    lineHeight: '140%',
                    fontWeight: '600',
                },
            ],
            'subtle-medium': [
                '12px',
                {
                    lineHeight: '16px',
                    fontWeight: '500',
                },
            ],
            'subtle-semibold': [
                '12px',
                {
                    lineHeight: '16px',
                    fontWeight: '600',
                },
            ],
            'tiny-medium': [
                '10px',
                {
                    lineHeight: '140%',
                    fontWeight: '500',
                },
            ],
            'x-small-semibold': [
                '7px',
                {
                    lineHeight: '9.318px',
                    fontWeight: '600',
                },
            ],
        },
        extend: {
            colors: {
                'maroon-1': '#6e1835',
                'maroon-2': '#4d1125',
                'gold-1': '#dccda6',
                'gold-2': '#b99b4c',
            },
            backgroundImage: {
                gradient:
                    'radial-gradient(circle, rgba(68,17,35,1) 0%, rgba(0,0,0,1) 100%)',
            },
        },
    },
    plugins: [],
};
export default config;
