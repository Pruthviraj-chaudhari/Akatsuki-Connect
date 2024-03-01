/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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
// import { IoIosArrowBack } from "react-icons/io";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
import {
  CardHeader,
  CardTitle,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { BackgroundGradient } from "./ui/background-gradient";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import FullSkeleton from "./FullSkeleton";

const FullProfile = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  console.log("ID IS HERE: ", id);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileById = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_GET_PROFILE}/${id}`
        );
        if (!response.ok) {
          toast.error("Profile not found");
          throw new Error("Profile not found"); // Handle non-successful response
        }
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        toast.error("Error fetching profile");
        console.error("Error fetching profile:", error);
        navigate("/error");
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchProfileById();
  }, []);

  const [copied, setCopied] = useState(false);

  const handleShareProfile = async () => {

    const currentUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Share Akatsuki Connect Profile',
          text: "Check out my coding journey on Akatsuki Connect! ❤👨‍💻\nExplore my profile and join the Akatsuki Coding Club community.\n\nReady to showcase your skills? Create your own profile now!\n\n",
          url: currentUrl, 
        });
      } else {
        toast.error("Error sharing profile");
        console.log('Web Share API not supported.');
      }
    } catch (error) {
      console.error('Error sharing profile:', error);
    }
  };

  return loading ? (
    <FullSkeleton />
  ) : (
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start max-w-[90vw] md:w-[80vw] px-4 mx-auto py-6">
      <div className="flex flex-col h-full gap-6 ">
        <BackgroundGradient className="h-full bg-black text-white rounded-[22px] ">
          <Card className=" h-full bg-black text-white rounded-[22px] ">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex justify-between">
                <Button
                  variant="outline"
                  className="border-slate-600  bg-black border hover:bg-slate-100 hover:text-black transition-all duration-500 text-white"
                  onClick={() => navigate(-1)}
                >
                  <MdArrowBackIosNew className="mr-1" />
                  Back
                </Button>
                Developer Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center gap-4 p-6">
              <Avatar className="h-52 w-52">
                <AvatarImage
                  alt={`Profile of ${profile.name}`}
                  src={
                    profile.image ||
                    `https://ui-avatars.com/api/?name=${profile.name}`
                  }
                />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-semibold">{profile.name}</h2>
              <p className="text-gray-500 font-mono">{profile.role}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {profile.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="rounded-full px-3 py-1 bg-gray-900 cursor-pointer hover:bg-gray-700 transition-all duration-300"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="w-full mt-3">
              <Button
                variant="outline"
                className=" w-full mx-4 py-4 border-slate-600  bg-black border hover:bg-white hover:text-black transition-all duration-500 text-white"
                onClick={handleShareProfile}
              >
                Share Profile <IoShareSocial className="h-4 w-4 mx-2" />
              </Button>
            </CardFooter>
          </Card>
        </BackgroundGradient>
      </div>
      <div className="flex flex-col justify-between gap-6">
        <BackgroundGradient>
          <Card className="bg-black text-white rounded-[22px]">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold">About Me</h2>
              <p className="mt-4 md:text-lg text-gray-500 dark:text-gray-400">
                {profile.about}
              </p>
            </CardContent>
          </Card>
        </BackgroundGradient>

        <BackgroundGradient>
          <Card className="bg-black text-white rounded-[22px] ">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold">Profiles</h2>
              <div className="grid gap-4 grid-cols-2 mt-4 ">
                <a
                  href={profile.github}
                  className="flex items-center gap-2 "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiGithub className="h-5 w-5" />
                  <span className="text-gray-500 dark:text-gray-400">
                    Github
                  </span>
                </a>
                <a
                  href={profile.linkedin}
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
                  href={profile.instagram}
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
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2"
                >
                  <SiGmail className="h-5 w-5" />
                  <span className="text-gray-500 dark:text-gray-400">
                    Email
                  </span>
                </a>
                <a
                  href={profile.leetcode}
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
                  href={profile.gfg}
                  className="flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiGeeksforgeeks className="h-5 w-5" />
                  <span className="text-gray-500 dark:text-gray-400">GFG</span>
                </a>
                <a
                  href={profile.codechef}
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
                  href={profile.hackerrank}
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
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Click the button below to see my resume.
              </p>
            </CardContent>
            <CardFooter>
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  variant="outline"
                  className="w-full py-4 border-slate-600  bg-black border hover:bg-white hover:text-black transition-all duration-500 text-white"
                >
                  View Resume <VscEye className="h-4 w-4 mx-2" />
                </Button>
              </a>
            </CardFooter>
          </Card>
        </BackgroundGradient>
      </div>
    </div>
  );
};

export default FullProfile;
