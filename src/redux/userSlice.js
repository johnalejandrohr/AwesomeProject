import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: 0,
    name: '',
    email: '',
    auth: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const {id, name, username, email} = action.payload;
            state.id = id;
            state.name = name;
            state.username = username;
            state.email = email;
            state.auth = true;
        }
    }
})

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
