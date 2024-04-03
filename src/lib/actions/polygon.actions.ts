'use server';

import { connectToDB } from '../mongoose';

export async function updatePolygon(): Promise<void> {
    connectToDB();
}
