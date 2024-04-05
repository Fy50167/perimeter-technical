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
        const response = await Polygon.find();
        const savedPolygons = JSON.parse(JSON.stringify(response));

        console.log('Polygons fetched!');
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
        const response = await Polygon.findOne({ name: name });
        if (!response) {
            console.log('No corresponding polygon found.');
            return null;
        }
        const polygon = JSON.parse(JSON.stringify(response));
        console.log('Polygon fetched!');
        return polygon;
    } catch (error) {
        console.error('Error fetching polygon', error);
        throw error;
    }
}

// Update one polygon
export async function updateSavedPolygon(
    name: string,
    coordinates: number[][]
) {
    connectToDB();

    try {
        const updatedPolygon = await Polygon.findOneAndUpdate(
            { name: name },
            { name, coordinates }
        );
        console.log('Polygon updated!');
    } catch (error) {
        console.error('Error updating polygon', error);
        throw error;
    }
}

export async function deletePolygon(name: string) {
    connectToDB();
    try {
        const deletedPolygon = await Polygon.findOneAndDelete({ name: name });
        console.log('Polygon deleted!');
    } catch (error) {
        console.error('Error deleting polygon', error);
        throw error;
    }
}
