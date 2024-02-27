import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import useApiHandler from "@/Hooks/useApiHandler";
import { checkRequiredFields } from "@/utils/formUtils";

const Login = () => {
  const { ApiHandler } = useApiHandler();

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
        <Input
          name="password"
          value={formData.password}
          type="password"
          onChange={changeHandler}
          className="border border-gray-600 tracking-widest text-xl"
          placeholder="********"
        ></Input>
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
