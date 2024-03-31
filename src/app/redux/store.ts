'use client';

import { configureStore } from '@reduxjs/toolkit';
import markersSlice from './features/markers/markersSlice';

export const store = configureStore({
    reducer: {
        markers: markersSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
