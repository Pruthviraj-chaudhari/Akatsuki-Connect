/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CardHeader,
  CardTitle,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FiGithub } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { SiGeeksforgeeks } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { SiCodechef } from "react-icons/si";
import { LiaHackerrank } from "react-icons/lia";
import { SiGmail } from "react-icons/si";
import { VscEye } from "react-icons/vsc";
import { MdEdit } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import { BackgroundGradient } from "../components/ui/background-gradient";
import FullSkeleton from "../components/FullSkeleton";

const MyProfile = () => {
  const navigate = useNavigate();

  const { user, token, loading } = useSelector((state) => state.auth);

  if (token === null) navigate("/login");

  return loading ? (
    <FullSkeleton />
  ) : (
    !(Object.keys(user).length === 0) && (
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start max-w-[90vw] md:w-[80vw] px-4 mx-auto py-6">
        <div className="flex flex-col h-full gap-6 ">
          <BackgroundGradient className="h-full">
            <Card className="h-full bg-black text-white rounded-[22px] border-none ">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex justify-between gap-x-2">
                  <div className="flex gap-2 items-center">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-600  bg-black border hover:bg-slate-100 hover:text-black transition-all duration-500 text-white"
                      onClick={() => navigate(-1)}
                    >
                      <MdArrowBackIosNew />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-600  bg-black border hover:bg-slate-100 hover:text-black transition-all duration-500 text-white"
                      onClick={() => navigate("/completeprofile")}
                    >
                      Edit Profile
                      <MdEdit className="ml-1" />
                    </Button>
                  </div>
                  Developer Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col justify-center items-center gap-4 p-6">
                <Avatar className="h-52 w-52">
                  <AvatarImage
                    alt={`Profile of ${user.name}`}
                    src={
                      user.image ||
                      `https://ui-avatars.com/api/?name=${user.name}`
                    }
                  />
                  <AvatarFallback className="text-black"></AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <p className="text-gray-500 dark:text-gray-400 font-mono">
                  {user.role}
                </p>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      className="rounded-full px-3 py-1 bg-slate-900"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </BackgroundGradient>
        </div>
        <div className="flex flex-col gap-6">
          <BackgroundGradient>
            <Card className="bg-black text-white rounded-[22px]">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold">About Me</h2>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  {user.about}
                </p>
              </CardContent>
            </Card>
          </BackgroundGradient>

          <BackgroundGradient>
            <Card className="bg-black text-white rounded-[22px] ">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold">Profiles</h2>
                <div className="grid gap-4 grid-cols-2 mt-4">
                  <a
                    href={user.github}
                    className="flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiGithub className="h-5 w-5" />
                    <span className="text-gray-500 dark:text-gray-400">
                      Github
                    </span>
                  </a>
                  <a
                    href={user.linkedin}
                    className="flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="h-5 w-5" />
                    <span className="text-gray-500 dark:text-gray-400">
                      LinkedIn
                    </span>
                  </a>
                  <a
                    href={user.instagram}
                    className="flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="h-5 w-5" />
                    <span className="text-gray-500 dark:text-gray-400">
                      Instagram
                    </span>
                  </a>
                  <a
                    href={`mailto:${user.email}`}
                    className="flex items-center gap-2"
                  >
                    <SiGmail className="h-5 w-5" />
                    <span className="text-gray-500 dark:text-gray-400">
                      Email
                    </span>
                  </a>
                  <a
                    href={user.leetcode}
                    className="flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiLeetcode className="h-5 w-5" />
                    <span className="text-gray-500 dark:text-gray-400">
                      LeetCode
                    </span>
                  </a>
                  <a
                    href={user.gfg}
                    className="flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiGeeksforgeeks className="h-5 w-5" />
                    <span className="text-gray-500 dark:text-gray-400">
                      GFG
                    </span>
                  </a>
                  <a
                    href={user.codechef}
                    className="flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiCodechef className="h-5 w-5" />
                    <span className="text-gray-500 dark:text-gray-400">
                      CodeChef
                    </span>
                  </a>
                  <a
                    href={user.hackerrank}
                    className="flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LiaHackerrank className="h-5 w-5" />
                    <span className="text-gray-500 dark:text-gray-400">
                      HackerRank
                    </span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </BackgroundGradient>

          <BackgroundGradient>
            <Card className="bg-black text-white rounded-[22px] ">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Click the button below to see my resume.
                </p>
              </CardContent>
              <CardFooter>
                <a
                  href={user.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button
                    className="w-full py-4 border-slate-600  bg-black border hover:bg-white hover:text-black transition-all duration-500 text-white"
                    variant="outline"
                  >
                    View Resume <VscEye className="h-4 w-4 mx-2" />
                  </Button>
                </a>
              </CardFooter>
            </Card>
          </BackgroundGradient>
        </div>
      </div>
    )
  );
};

export default MyProfile;
