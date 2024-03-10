const api = {
    GET_ALL_PROFILES_API: String(import.meta.env.VITE_API_DATA),
    GET_PROFILE_API: String(import.meta.env.VITE_API_GET_PROFILE),
    UPDATE_PROFILE_API: String(import.meta.env.VITE_API_UPDATE_PROFILE_URL),
    SEND_OTP_API: String(import.meta.env.VITE_API_SEND_OTP_URL),
    SIGNUP_API: String(import.meta.env.VITE_API_SIGNUP_URL),
    LOGIN_API: String(import.meta.env.VITE_API_LOGIN_URL)
}

export default api;