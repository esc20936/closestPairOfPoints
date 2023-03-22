import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        dataArray: []
    },
    reducers: {
        setDataArray: (state, action) => {
            state.dataArray = action.payload
        }
    }
});

export const { setDataArray } = dataSlice.actions;
