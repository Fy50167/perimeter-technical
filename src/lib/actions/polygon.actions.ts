'use server';

import Polygon from '../models/polygon.model';
import { connectToDB } from '../mongoose';

// Generate a new polygon on save
export async function createPolygon(name: string, markers: number[][]) {
    try {
        connectToDB();
        const newPolygon = await Polygon.create({
            name: name,
            coordinates: markers,
        });
        await newPolygon.save(); // Save the newly created polygon document to the database

        console.log('Polygon created successfully');
    } catch (error) {
        console.error('Error fetching polygons', error);
        throw error;
    }
}

// Get all polygons
export async function fetchPolygons() {
    connectToDB();
    try {
        const savedPolygons = await Polygon.find();
        return savedPolygons;
    } catch (error) {
        console.error('Error fetching polygons', error);
        throw error;
    }
}

// Get a single polygon
export async function getPolygon(name: string) {
    connectToDB();
    try {
        const polygon = await Polygon.findOne({ name: name });
        return polygon;
    } catch (error) {
        console.error('Error fetching polygon', error);
        throw error;
    }
}

// Update one polygon
export async function updatePolygon(
    name: string,
    coordinates: Array<mapboxgl.Marker>
) {
    connectToDB();

    try {
        const updatedPolygon = await Polygon.findOneAndUpdate(
            { name: name },
            { name, coordinates }
        );
        return updatedPolygon;
    } catch (error) {
        console.error('Error updating polygon', error);
        throw error;
    }
}
