import { createSlice } from '@reduxjs/toolkit';

const initialState = { bounds: { minLat: null, maxLat: null, minLng: null, maxLng: null }, tasks: [] };

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setBounds: (state, action) => { state.bounds = action.payload },
        setTasks: (state, action) => { state.tasks = action.payload }
    }
})

export const { setBounds, setTasks } = mapSlice.actions
