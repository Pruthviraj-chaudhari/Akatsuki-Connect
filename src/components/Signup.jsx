import PasswordValidator from "password-validator";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { toast } from "sonner";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import useApiHandler from "@/Hooks/useApiHandler";
import { checkRequiredFields } from "@/utils/formUtils";
import { requiredFieldsSendOTP } from "@/Data";

const Signup = () => {
  const { ApiHandler } = useApiHandler();

  const [otp, setOtp] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    
    if (formData.password != formData.confirmPassword){
      return toast.warning("Password do not match");
    }

    const passwordSchema = new PasswordValidator();
    
    passwordSchema.is().min(8).is().max(100).has().uppercase().has().lowercase().has().digits(1).has().not().spaces();

    if (!passwordSchema.validate(formData.password)){
      return toast.warning("Invalid Password. Please use a stronger password.");
    }

    const requestBody = { email: formData.email }; 
    const SEND_OTP_API = import.meta.env.VITE_API_SEND_OTP_URL;
    const loadingMessage = "Sending OTP...";
    const successMessage = "OTP has been sent to your email";
    const errorMessage = "Error occurred while sending OTP";

    ApiHandler({
      apiUrl: SEND_OTP_API,
      requestBody: requestBody,
      loadingMessage,
      successMessage,
      errorMessage,
    });

    setIsDialogOpen(true);
  };

  const handleSignup = (event) => {
    event.preventDefault();

    setIsDialogOpen(false);

    const SIGNUP_API = import.meta.env.VITE_API_SIGNUP_URL;

    const requestBody = {
      fname: formData.fname,
      lname: formData.lname,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      otp,
    };

    const loadingMessage = "Creating Account...";
    const successMessage = "Account Created Successfully 🎉";
    const errorMessage = "Error occurred while creating account";
    const navigateTo = "/completeprofile";

    ApiHandler({
      apiUrl: SIGNUP_API,
      requestBody: requestBody,
      loadingMessage,
      successMessage,
      errorMessage,
      navigateTo,
    });

    // try {
    //   const promise = () =>
    //     axios
    //       .post(SIGNUP_API, requestBody)
    //       .then((response) => setUserData(response.data.student))
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
    //     loading: "Creating Account...",
    //     success: () => {
    //       setIsLogin(true);
    //       navigate("/completeprofile");
    //       return toast.success("Account Created Successfully 🎉");
    //     },
    //     error: () => {
    //       return toast.error("Anable to Create Account, try again!");
    //     },
    //   });
    // } catch (error) {
    //   console.error("Error occurred:", error);
    //   toast.error("Error occurred while creating account");
    // }
  };

  return (
    <div>
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
          <Input
            name="password"
            value={formData.password}
            type="password"
            onChange={changeHandler}
            className="border border-gray-600 tracking-widest text-xl"
            placeholder="********"
          ></Input>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <Label>Confirm Password</Label>
          <Input
            name="confirmPassword"
            value={formData.confirmPassword}
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
            handleSendOTP();
          }}
        >
          Create Profile
        </Button>
      </form>

      <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
        <DialogTrigger asChild>
          <div className="sr-only">Trigger</div>
        </DialogTrigger>
        <DialogContent className="lg:max-w-md w-[90vw] flex flex-col justify-center items-center rounded-lg border border-gray-600  bg-black text-white ">
          <DialogHeader className="w-full">
            <DialogTitle>Enter OTP</DialogTitle>
            <DialogDescription>
              Please enter the OTP sent to your email.
            </DialogDescription>
          </DialogHeader>
          <Label htmlFor="otp" className="sr-only">
            OTP
          </Label>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            containerStyle="flex justify-evenly w-3/4 text-center text-black font-semibold "
            inputStyle="h-10 min-w-[40px] text-xl rounded-lg border border-gray-300 bg-gray-200"
            renderInput={(props) => <input {...props} />}
          />
          <DialogFooter className="flex lg:gap-x-44 mt-2 w-full">
            <Button
              variant="ghost"
              className="m-1"
              size="lg"
              onClick={() => setIsDialogOpen(false)}
            >
              Close
            </Button>
            <Button
              variant="secondary"
              className="m-1"
              size="lg"
              onClick={handleSignup}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Signup;
