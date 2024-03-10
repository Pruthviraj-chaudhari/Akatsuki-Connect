import PasswordValidator from "password-validator";
import { useState } from "react";
import { toast } from "sonner";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { checkRequiredFields } from "@/utils/formUtils";
import { requiredFieldsSendOTP } from "@/Data";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setSignupData } from "@/slices/authSlice";
import { sendOtp } from "@/services/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendOTP = async () => {
    const isFormValid = checkRequiredFields(formData, requiredFieldsSendOTP);

    if (!isFormValid) return;

    if (formData.password != formData.confirmPassword) {
      return toast.warning("Password do not match");
    }

    const passwordSchema = new PasswordValidator();

    passwordSchema
      .is()
      .min(8)
      .is()
      .max(100)
      .has()
      .uppercase()
      .has()
      .lowercase()
      .has()
      .digits(1)
      .has()
      .not()
      .spaces();

    if (!passwordSchema.validate(formData.password)) {
      return toast.warning("Invalid Password. Please use a stronger password.");
    }

    dispatch(setSignupData(formData));
    dispatch(sendOtp(formData.email, navigate));

    // const requestBody = { email: formData.email };
    // const SEND_OTP_API = import.meta.env.VITE_API_SEND_OTP_URL;
    // const loadingMessage = "Sending OTP...";
    // const successMessage = "OTP has been sent to your email";
    // const errorMessage = "Error occurred while sending OTP";

    // try {
    //   const promise = () =>
    //     axios
    //       .post(SEND_OTP_API, requestBody, {
    //         withCredentials: true,
    //       })
    //       .then((response) => {
    //         setIsLogin(true);
    //         setUserData(response.data.student);
    //         // Save the token in localStorage
    //         localStorage.setItem("token", JSON.stringify(response.data.token));
    //         localStorage.setItem("user", JSON.stringify(response.data.student));
    //       })
    //       .catch((error) => {
    //         if (error.response) {
    //           const errorMessage = error.response.data.message;
    //           throw new Error(errorMessage);
    //         } else if (error.request) {
    //           throw new Error("No response from the server");
    //         } else {
    //           throw error;
    //         }
    //       });

    //   toast.promise(promise(), {
    //     loading: loadingMessage,
    //     success: () => {
    //       toast.success(successMessage);
    //     },
    //     error: (error) => {
    //       return toast.error(error.message);
    //     },
    //   });
    // } catch (error) {
    //   console.error("Error occurred:", error);
    //   toast.error(errorMessage);
    // }
  };

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an Profile
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <form>
          <div className="flex flex-col gap-2">
            <Label>Name</Label>
            <div className="flex gap-2">
              <Input
                name="fname"
                value={formData.fname}
                onChange={changeHandler}
                className="border border-gray-600"
                placeholder="Firstname"
              ></Input>
              <Input
                name="lname"
                value={formData.lname}
                onChange={changeHandler}
                className="border border-gray-600"
                placeholder="Lastname"
              ></Input>
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <Label>Email</Label>
            <Input
              name="email"
              value={formData.email}
              onChange={changeHandler}
              className="border border-gray-600"
              placeholder="example@gmail.com"
            ></Input>
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <Label>New Password</Label>
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

          <div className="mt-3 flex flex-col gap-2">
            <Label>Confirm Password</Label>
            <div className="flex items-center border border-slate-600 rounded-md border-input">
              <input
                name="confirmPassword"
                value={formData.confirmPassword}
                type={showConfirmPassword ? "text" : "password"}
                onChange={changeHandler}
                className=" border-none tracking-widest text-sm placeholder:text-lg placeholder:tracking-widest flex h-9 w-full bg-transparent px-3 py-1 shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="********"
              ></input>
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="z-[10] cursor-pointer mr-3"
              >
                {showConfirmPassword ? (
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
              handleSendOTP();
            }}
          >
            Create Profile
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className=" bg-black px-2 text-muted-foreground">
              Or Login
            </span>
          </div>
        </div>

        <Button
          variant="ghost"
          type="button"
          className="text-white bg-dark border-[1px] border-gray-500"
          onClick={()=>navigate("/login")}
        >
          Login
        </Button>

      </div>
    </div>
  );
};

export default Signup;
