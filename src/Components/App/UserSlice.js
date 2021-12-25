import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: null,
    email: null,
    photo: null,
    uid: null,
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setSigninState: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.photo = action.payload.photo;
            state.uid = action.payload.uid;
        },
        setSignOutState: (state) => {
            state.name = null;
            state.email = null;
            state.photo = null;
            state.uid = null;
        }
    }
});

export const { setSigninState, setSignOutState } = UserSlice.actions;
export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserPhoto = (state) => state.user.photo;
export const selectUserUID = (state) => state.user.uid;
export default UserSlice.reducer;