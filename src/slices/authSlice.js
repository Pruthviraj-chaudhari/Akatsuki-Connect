import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

const initialState = {
  signupData: null,
  loading: false,
  user: storedUser !== "undefined" && storedUser !== null ? JSON.parse(storedUser) : null,
  token: storedToken !== "undefined" && storedToken !== null ? JSON.parse(storedToken) : null,
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
