import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import useApiHandler from "@/Hooks/useApiHandler";
import { checkRequiredFields } from "@/utils/formUtils";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

const Login = () => {
  const { ApiHandler } = useApiHandler();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    const requiredFields = ["email", "password"];

    const isLoginValid = checkRequiredFields(formData, requiredFields);

    if (!isLoginValid) {
      return;
    }

    const LOGIN_API = import.meta.env.VITE_API_LOGIN_URL;
    const loadingMessage = "Authenticating...";
    const successMessage = "Welcome to Akatsuki Connect";
    const errorMessage = "Error occurred while login";
    const navigateTo = "/myprofile";

    ApiHandler({
      apiUrl: LOGIN_API,
      requestBody: formData,
      loadingMessage,
      successMessage,
      errorMessage,
      navigateTo,
    });

    // try {
    //   const promise = () =>
    //     axios.post(LOGIN_API, formData)
    //     .then((response) => setUserData(response.data.student))
    //     .catch((error) => {
    //         if (error.response) {
    //           const errorMessage = error.response.data.message;
    //           throw new Error(errorMessage);
    //         } else if (error.request) {
    //           throw new Error("No response from the server");
    //         } else {
    //           throw error;
    //         }
    //     });

    //   toast.promise(promise(), {
    //     loading: "Authenticating...",
    //     success: () => {
    //       setIsLogin(true);
    //       navigate("/");
    //       return toast.success("Welcome to Akatsuki Connect");
    //     },
    //     error: (error) => {
    //       return toast.error(error.message);
    //     },
    //   });
    // } catch (error) {
    //   console.error("Error occurred:", error);
    //   toast.error("Error occurred while login");
    // }
  };

  return (
    <form>
      <div className="mt-3 flex flex-col gap-2">
        <Label>Email</Label>
        <Input
          name="email"
          value={formData.email}
          type="email"
          onChange={changeHandler}
          className="border border-gray-600"
          placeholder="example@gmail.com"
        ></Input>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <Label>Password</Label>
        <div className="flex items-center border border-slate-600 rounded-md border-input">
          <input
            name="password"
            value={formData.password}
            type={showPassword ? "text" : "password"}
            onChange={changeHandler}
            className=" border-none tracking-widest text-sm placeholder:text-lg placeholder:tracking-widest flex h-9 w-full bg-transparent px-3 py-1 shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="********"
          ></input>
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="z-[10] cursor-pointer mr-3"
          >
            {showPassword ? (
              <IoEyeOff className="w-5 h-5" />
            ) : (
              <IoEye className="w-5 h-5" />
            )}
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        type="submit"
        className="text-black w-full mt-5"
        onClick={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        Login
      </Button>
    </form>
  );
};

export default Login;
