import OtpInput from "react-otp-input";
import AuthTemplate from "@/components/AuthTemplate";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "@/services/auth";

const VerifyEmail = () => {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { signupData } = useSelector((state) => state.auth);

    useEffect(() => {
        // Only allow access of this route when user has filled the signup form
        if (!signupData) {
            navigate("/signup");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSignup = (event) => {
        event.preventDefault();
        const { fname, lname, email, password, confirmPassword } = signupData;
        dispatch(signUp(fname, lname,email,password,confirmPassword,otp,navigate));
    };

    return (
        <AuthTemplate>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] md:mt-20">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="md:text-2xl text-lg font-semibold tracking-tight">
                        Verify Email to Create Account
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter the OTP sent to your email.
                    </p>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-center items-center gap-2">
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span>-</span>}
                                containerStyle={cn(
                                    "flex justify-evenly w-3/4 text-center text-black font-semibold"
                                )}
                                inputStyle={cn(
                                    "h-10 min-w-[40px] text-xl rounded-lg border border-gray-300 bg-gray-200"
                                )}
                                renderInput={(props) => <input {...props} />}
                            />
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        type="submit"
                        className="text-black w-full mt-5"
                        onClick={handleSignup}
                    >
                        Verify Email
                    </Button>

                    <Button
                        variant="ghost"
                        type="button"
                        className="text-white bg-dark border-[1px] border-gray-500"
                        onClick={() => navigate("/")}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </AuthTemplate>
    );
};

export default VerifyEmail;
