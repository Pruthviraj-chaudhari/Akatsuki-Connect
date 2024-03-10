import { toast } from "sonner";
import { setLoading, setToken, setUser } from "@/slices/authSlice";
import api from "./api";
import { apiConnector } from "../services/apiConnector";

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Sending OTP...");

    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", api.SEND_OTP_API, {
        email,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP has been sent to your email");
      navigate("/verify-email");
    } catch (error) {
      console.log("Auth Service :: Send OTP :: Error", error);
      toast.error("Could Not Send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signUp(
  fname,
  lname,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", api.SIGNUP_API, {
        fname,
        lname,
        email,
        password,
        confirmPassword,
        otp,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setToken(response.data.token));
      dispatch(setUser({ ...response.data.user }));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/");

      toast.success("Account Created Sucessfully 🎉");
    } catch (error) {
      console.log("Auth Service :: Signup :: Error", error);
      toast.error("Signup Failed");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", api.LOGIN_API, {
        email,
        password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setToken(response.data.token));
      dispatch(setUser({ ...response.data.user }));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("Welcome to Akatsuki Connect");
      navigate("/");
    } catch (error) {
      console.log("Auth Service :: Login :: Error", error);
      toast.error("Cannot Login");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}



// update service
export function update(requestBody, navigate){
  return async (dispatch) => {
    const toastId = toast.loading("Updating Profile...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", api.UPDATE_PROFILE_API, requestBody);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setUser({ ...response.data.user }));

      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Profile Updated Successfully");

      navigate("/myprofile");
    } catch (error) {
      console.log("Auth Service :: Login :: Error", error);
      toast.error("Cannot Updating Profile");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}