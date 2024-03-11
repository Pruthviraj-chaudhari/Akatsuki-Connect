import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  loading: false,
  user: (localStorage.getItem("user") && localStorage.getItem("user")!==undefined)
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  token: (localStorage.getItem("token") && localStorage.getItem("token")!==undefined)
    ? JSON.parse(localStorage.getItem("token"))
    : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setSignupData(state, action) {
            state.signupData = action.payload;
        },
        setUser(state, action){
            state.user = action.payload;
        },
        setToken(state, action){
            state.token = action.payload;
        },
        setLoading(state, action){
            state.loading = action.payload;
        }
    }
});

export const {setSignupData,setUser,setToken,setLoading} = authSlice.actions;

export default authSlice.reducer;
