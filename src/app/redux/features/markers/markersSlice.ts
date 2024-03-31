'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ActiveMarkers {
    markers: mapboxgl.Marker[];
}

const initialState: ActiveMarkers = {
    markers: [],
};

export const markersSlice = createSlice({
    name: 'markers',
    initialState,
    reducers: {
        addMarker: (state, action: PayloadAction<mapboxgl.Marker>) => {
            state.markers.push(action.payload);
        },
        clearMarkers: (state) => {
            state.markers = [];
        },
        undoMarker: (state) => {
            state.markers.pop();
        },
    },
});

export const { addMarker, clearMarkers, undoMarker } = markersSlice.actions;

export default markersSlice.reducer;
