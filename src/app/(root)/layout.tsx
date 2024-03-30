import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';

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
                <body className={inter.className}>{children}</body>
            </html>
        </>
    );
}
