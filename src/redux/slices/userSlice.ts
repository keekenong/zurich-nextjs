import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: "",
        name: "",
    },
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;