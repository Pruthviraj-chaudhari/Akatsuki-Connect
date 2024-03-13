/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FiGithub } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { SiGeeksforgeeks } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { SiCodechef } from "react-icons/si";
import { LiaHackerrank } from "react-icons/lia";
import { IoLinkSharp } from "react-icons/io5";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "../components/ui/textarea";
import { skillsData, roles, requiredFields } from "../Data";
import { useDispatch, useSelector } from "react-redux";
import { update } from "@/services/auth";
import { Navbar } from "@/components/Navbar";
import fetchProfilePhoto from "@/utils/getGithubProfile";

function CompleteProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.auth);

  const {
    name,
    email,
    about,
    github,
    leetcode,
    linkedin,
    instagram,
    gfg,
    codechef,
    hackerrank,
    resume,
    skills,
    isProfileComplete,
  } = user;

  const nameArray = name.split(" ");
  const fname = nameArray[0];
  const lname = nameArray[1];

  const [open, setOpen] = useState(false);

  const [selectedSkills, setSelectedSkills] = useState([]);

  const initialData = {
    fname: fname,
    lname: lname,
    email: email,
    about: isProfileComplete ? about : "",
    role: "",
    github: isProfileComplete ? github : "",
    linkedin: isProfileComplete ? linkedin : "",
    instagram: instagram || "",
    resume: resume || "",
    leetcode: leetcode || "",
    hackerrank: hackerrank || "",
    codechef: codechef || "",
    gfg: gfg || "",
    skills: skills || [],
  };

  const [formData, setFormData] = useState(initialData);

  const selectOptions = skillsData.map((name) => ({
    label: name,
    value: name.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-"),
  }));

  const submitHandler = async () => {
    setOpen(false);

    const isFormValid = requiredFields.every((field) => formData[field]);

    if (!isFormValid && !user.isProfileComplete) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const skillsSelected = selectedSkills.map((item) => item.label);

    let requestBody = {
      ...formData,
      skills: skillsSelected.length > 0 ? skillsSelected : skills,
      token,
    };

    if (!isProfileComplete) {
      const image = await fetchProfilePhoto(formData.github);
      if (image !== null) {
        requestBody = {
          ...formData,
          image,
          skills: skillsSelected.length > 0 ? skillsSelected : skills,
          token,
        };
      }
    }

    dispatch(update(requestBody, navigate));
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeRoleHandler = (value) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center bg-black flex-col mt-[4rem]">
        <Card className="max-w-[80vw] mx-auto w-[100vw]">
          <CardHeader>
            <CardTitle className="text-2xl">Hey Akatsuki's ❤️</CardTitle>
            <CardDescription>Tell us more about you.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col sm:flex-row w-full gap-4 gap-x-10 mb-5">
                <div className="flex flex-col w-full sm:w-1/2 gap-y-4">
                  <div className="flex items-center justify-start gap-4">
                    <div className="flex flex-col space-y-1.5 w-1/2">
                      <Label htmlFor="fname">
                        First Name{" "}
                        {!isProfileComplete && (
                          <span className="text-red-600">*</span>
                        )}
                      </Label>
                      <Input
                        id="name"
                        name="fname"
                        value={formData.fname}
                        onChange={changeHandler}
                        placeholder="John"
                        required
                        disabled
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5 w-1/2">
                      <Label htmlFor="fname">
                        Last Name{" "}
                        {!isProfileComplete && (
                          <span className="text-red-600">*</span>
                        )}
                      </Label>
                      <Input
                        id="name"
                        name="lname"
                        value={formData.lname}
                        onChange={changeHandler}
                        placeholder="Doe"
                        required
                        disabled
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">
                      Email{" "}
                      {!isProfileComplete && (
                        <span className="text-red-600">*</span>
                      )}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={changeHandler}
                      placeholder="example@gmail.com"
                      required
                      disabled
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label>Skills</Label>
                    <MultiSelect
                      options={selectOptions}
                      value={selectedSkills}
                      onChange={setSelectedSkills}
                      labelledBy={"Select"}
                      isCreatable={true}
                      className="w-full rounded-lg shadow-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full sm:w-1/2 gap-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="role">
                      Developer Role{" "}
                      {!isProfileComplete && (
                        <span className="text-red-600">*</span>
                      )}
                    </Label>
                    <Select
                      name="role"
                      value={formData.role}
                      onValueChange={changeRoleHandler}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {roles.map((role, index) => (
                          <SelectItem value={role} key={index}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="about">
                      About{" "}
                      {!isProfileComplete && (
                        <span className="text-red-600">*</span>
                      )}
                    </Label>
                    <Textarea
                      id="about"
                      name="about"
                      value={formData.about}
                      onChange={changeHandler}
                      placeholder="I'm a full stack developer..."
                      rows={5}
                      required
                    />
                  </div>
                </div>
              </div>

              <Label className="text-lg">Social Profiles & Resume</Label>
              <Separator className="grid grid-cols-1 md:grid-cols-2 mb-5 mt-1" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-10 mb-5">
                <div className="flex flex-col space-y-1.5">
                  <div className="flex gap-2">
                    <FiGithub className="" />
                    <Label htmlFor="github">
                      GitHub{" "}
                      {!isProfileComplete && (
                        <span className="text-red-600">*</span>
                      )}
                    </Label>
                  </div>
                  <Input
                    id="github"
                    name="github"
                    value={formData.github}
                    onChange={changeHandler}
                    placeholder="Your GitHub url"
                    required
                    disabled={isProfileComplete ? true : false}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <div className="flex gap-2">
                    <FaLinkedin />
                    <Label htmlFor="github">
                      LinkedIn{" "}
                      {!isProfileComplete && (
                        <span className="text-red-600">*</span>
                      )}
                    </Label>
                  </div>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={changeHandler}
                    placeholder="Your LinkedIn url"
                    required
                    disabled={isProfileComplete ? true : false}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <div className="flex gap-2">
                    <FaInstagram />
                    <Label htmlFor="github">Instagram</Label>
                  </div>
                  <Input
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={changeHandler}
                    placeholder="Your Instagram url"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <div className="flex gap-2">
                    <IoLinkSharp />
                    <Label htmlFor="resume">
                      Resume Link{" "}
                      {!isProfileComplete && (
                        <span className="text-red-600">*</span>
                      )}
                    </Label>
                  </div>
                  <Input
                    id="resume"
                    name="resume"
                    value={formData.resume}
                    onChange={changeHandler}
                    placeholder="https://drive.google.com"
                    required
                  />
                </div>
              </div>

              <Label className="text-lg">Coding Profiles</Label>
              <Separator className="grid grid-cols-1 md:grid-cols-2 mb-5 mt-1" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-10 mb-5">
                <div className="flex flex-col space-y-1.5">
                  <div className="flex gap-2">
                    <SiLeetcode />
                    <Label htmlFor="leetcode">
                      Leetcode{" "}
                      {!isProfileComplete && (
                        <span className="text-red-600">*</span>
                      )}
                    </Label>
                  </div>
                  <Input
                    id="leetcode"
                    name="leetcode"
                    value={formData.leetcode}
                    onChange={changeHandler}
                    placeholder="Your Leetcode url"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <div className="flex gap-2">
                    <LiaHackerrank />
                    <Label htmlFor="hackerrank">HackerRank</Label>
                  </div>
                  <Input
                    id="hackerrank"
                    name="hackerrank"
                    value={formData.hackerrank}
                    onChange={changeHandler}
                    // placeholder="https://www.hackerrank.com/profile/"
                    placeholder="Your HackerRank url"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <div className="flex gap-2">
                    <SiCodechef />
                    <Label htmlFor="codechef">CodeChef</Label>
                  </div>
                  <Input
                    id="codechef"
                    name="codechef"
                    value={formData.codechef}
                    onChange={changeHandler}
                    placeholder="Your CodeChef url"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <div className="flex gap-2">
                    <SiGeeksforgeeks />
                    <Label htmlFor="gfg">GFG</Label>
                  </div>
                  <Input
                    id="gfg"
                    name="gfg"
                    value={formData.gfg}
                    onChange={changeHandler}
                    placeholder="Your GFG url"
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back
            </Button>
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button type="submit">Submit</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-lg mx-auto">
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                  Are you sure you want to submit the form?
                </AlertDialogDescription>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={submitHandler}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default CompleteProfile;
