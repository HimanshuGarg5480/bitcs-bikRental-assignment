import { createSlice } from '@reduxjs/toolkit';

const bikeSlice = createSlice({
    name: 'user',
    initialState: {
        bikeInfo: null,
    },
    reducers: {
        setBike: (state, action) => {
            state.bikeInfo = action.payload;
        },
        clearBike: (state) => {
            state.bikeInfo = null;
        },
    },
});

export const { setBike, clearBike } = bikeSlice.actions;
export default bikeSlice.reducer;

