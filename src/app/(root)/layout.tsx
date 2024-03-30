import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';

export const metadata: Metadata = {
    title: 'Perimeter Map',
    description:
        'Technical project for the Perimeter Platform technical interview.',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <html lang='en'>
                <link
                    href='https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.css'
                    rel='stylesheet'
                />
                <body className={inter.className}>{children}</body>
            </html>
        </>
    );
}
