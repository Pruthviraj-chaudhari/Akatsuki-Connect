/* eslint-disable react/prop-types */
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BackgroundGradient } from "./ui/background-gradient";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import Views from "./Views";

const ProfileCard = ({ data }) => {
  return (
    <BackgroundGradient>
      <Card className="flex flex-col justify-center items-center w-[280px] rounded-[22px] shadow-md bg-black text-white border-white/[0.2] ">
       
        <Views visits={data.visits}/>

        <CardHeader className="flex flex-col justify-center items-center">
          <img
            className="w-24 h-24 rounded-full mb-2"
            src={data.image || `https://ui-avatars.com/api/?name=${data.name}`}
            alt={`Profile of ${data.name}`}
          />
          <CardTitle className="text-2xl">{data.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="flex justify-center text-base text-gray-600">
            {data.role}
          </CardDescription>

          <div className="flex justify-center mt-4">
            <a href={data.github} target="_blank" rel="noopener noreferrer">
              <FaGithub className="w-6 h-6 mx-2 hover:scale-110 transition-all duration-200" />
            </a>
            <a href={data.leetcode} target="_blank" rel="noopener noreferrer">
              <SiLeetcode className="w-6 h-6 mx-2 hover:scale-110 transition-all duration-200" />
            </a>
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="w-6 h-6 mx-2 hover:scale-110 transition-all duration-200" />
            </a>
          </div>
        </CardContent>
        <CardFooter className="mt-4">
          <Link to={`/fullprofile/${data._id}`}>
            <Button
              variant="outline"
              size="lg"
              className="border-slate-600  bg-black border hover:bg-slate-100 hover:text-black transition-all duration-500 text-white"
            >
              View More...
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </BackgroundGradient>
  );
};

export default ProfileCard;
