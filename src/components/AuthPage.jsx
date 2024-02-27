/* eslint-disable react/no-unescaped-entities */
import Signup from "./Signup";
import Login from "./Login";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export default function AuthPage() {

  const [signupForm, setSignupForm] = useState(false);

  return (
    <>
      <Card className="flex flex-col lg:flex-row bg-black text-white border-none max-w-[90vw] md:w-[80vw] justify-center mx-auto p-2 rounded-lg m-3">
        <div className="ml-5 lg:w-1/2">
          <CardHeader>
            <CardTitle className="text-2xl">
              <div className="flex gap-2 w-full">
                <img
                  className="w-[100px]"
                  src="https://i.ibb.co/mb0W3LS/pngegg.png"
                  alt=""
                />
                <img
                  className="w-[100px] h-[90px]"
                  src="https://www.rcpit.ac.in/uploads/1599837268.png"
                  alt=""
                />
              </div>
              Akatsuki Coding Club
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <CardDescription className="lg:text-lg">
              Create Your{" "}
              <span className="text-white font-medium">
                Akatsuki Connect Account!
              </span>
              <br />
              <br />
              We're excited to have you join us and showcase your coding skills
              and contributions.
              <br />
              <br />
              Let's get started on this coding adventure ❤️
            </CardDescription>
          </CardContent>
          <CardFooter className="p-1 mt-4 gap-4 flex justify-start items-center"></CardFooter>
        </div>
        <div className="flex justify-center lg:w-1/2">
          <div className="lg:p-8 ">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  {signupForm ? "Create an Profile" : "Welcome Back"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {signupForm
                    ? "Enter your email below to create your account"
                    : "Enter your email & password below to login"}
                </p>
              </div>
              <div className="flex flex-col gap-5">
              
                {signupForm ? ( <Signup /> ): (<Login />)}

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className=" bg-black px-2 text-muted-foreground">
                      Or {signupForm ? "Login" : "Signup"}
                    </span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  type="button"
                  className="text-white bg-dark border-[1px] border-gray-500"
                  onClick={() => setSignupForm((prev) => !prev)}
                >
                  {signupForm ? "Login" : "Create Profile"}
                </Button>

              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
