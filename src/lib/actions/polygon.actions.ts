'use server';

import Polygon from '../models/polygon.model';
import { connectToDB } from '../mongoose';

// Generate a new polygon on save
export async function createPolygon(
    name: string,
    coordinates: Array<mapboxgl.Marker>
) {
    
    try {
        connectToDB();
        const newPolygon = new Polygon({
            name: name,
            coordinates: coordinates
        });
        await newPolygon.save(); // Save the newly created polygon document to the database
        console.log('Polygon created successfully');
    } catch (error: any) {
        console.error('Error creating polygon', error);
        throw error;
    }
}

// Get a single polygon
export async function getPolygon(
    id: string
) {
    
    try{
        connectToDB();
    } catch (error: any) {
        console.error('Error fetching polygon', error);
        throw error;
    }
}


export async function updatePolygon(): Promise<void> {
    connectToDB();

    try {
        await Polygon.findOneAndUpdate({

        })
    }
}
