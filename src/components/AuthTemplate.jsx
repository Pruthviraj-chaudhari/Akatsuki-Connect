/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AuthTemplate({ children }) {
  return (
    <>
      <Card className="flex flex-col lg:flex-row bg-black text-white border-none max-w-[90vw] md:w-[80vw] justify-center mx-auto p-2 rounded-lg m-3">
        <div className="ml-5 lg:w-1/2">
          <CardHeader>
            <CardTitle className="text-2xl">
              <div className="flex gap-2 w-full">
                <img
                  className="w-[100px]"
                  src="./logo.png"
                  alt=""
                />
                <img
                  className="w-[100px] h-[90px]"
                  src="./rcpit.png"
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
          <div className="lg:p-8 ">{children}</div>
        </div>
      </Card>
    </>
  );
}
