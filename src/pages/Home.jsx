/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Spotlight from "../components/ui/Spotlight";
import { useSelector } from "react-redux";

const Welcome = () => {
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  return (
    <Card className="flex flex-col lg:flex-row  max-w-[90vw] md:w-[80vw] justify-center mx-auto rounded-lg text-white bg-black border-black shadow-md">
      <Spotlight
        className="-top-20 left-0 md:left-10 md:-top-10"
        fill="white"
      />
      <div className="ml-5 lg:ml-10 flex flex-col justify-center">
        <CardHeader className="pl-0">
          <CardTitle className="p-2 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
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
        <CardContent className="p-1">
          <CardDescription className="lg:text-lg">
            Welcome to{" "}
            <span className="text-white font-medium">Akatsuki Connect !</span>
            <br />
            <br />
            We're eager to learn more about your coding skills and
            contributions.
            <br />
            <br />
            Let's get to know you better ❤️
            <br />
            <br />
            Hit "Add Me"!
          </CardDescription>
        </CardContent>
        <CardFooter className="p-1 mt-4 gap-4 flex justify-start items-center">
          <Button
            className="border-slate-600 bg-black border hover:bg-slate-100 hover:text-black transition-all duration-300 text-white"
            onClick={() => navigate("/profiles")}
          >
            Discover Akatsuki
          </Button>

          {token !== null ? (
            <Button
              className="border-slate-700 border-2 text-black w-full"
              variant="outline"
              onClick={() => navigate("/myprofile")}
            >
              My Profile
            </Button>
          ) : (
            <Button
              className="border-slate-900 border-2 text-black"
              variant="outline"
              onClick={() => navigate("/signup")}
            >
              Add Me
            </Button>
          )}
        </CardFooter>
      </div>
      <div className="flex justify-center lg:w-[80%] z-50 md:mt-10">
        <img src="/students3.png" alt="Students" />
      </div>
    </Card>
  );
};

export default Welcome;
