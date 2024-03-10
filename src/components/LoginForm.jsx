import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { checkRequiredFields } from "@/utils/formUtils";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "@/services/auth";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    dispatch(login(formData.email, formData.password, navigate));
  };

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome Back
        </h1>
        <p className="text-sm text-muted-foreground">
            Enter your email & password below to login
        </p>
      </div>
      <div className="flex flex-col gap-5">
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

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className=" bg-black px-2 text-muted-foreground">
              Or Signup
            </span>
          </div>
        </div>

        <Button
          variant="ghost"
          type="button"
          className="text-white bg-dark border-[1px] border-gray-500"
          onClick={()=>navigate("/signup")}
        >
          Create Profile
        </Button>
      </div>
    </div>
  );
};

export default Login;
