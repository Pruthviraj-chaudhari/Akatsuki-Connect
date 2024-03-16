/* eslint-disable react/prop-types */
import { IoRocketSharp } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


const Views = ({visits = 1}) => {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="absolute top-2 right-2 bg-white text-black px-2 py-1 rounded-full text-sm cursor-pointer">
            <div className="flex items-center gap-1 ">
              <span className="font-bold">{visits}</span> <IoRocketSharp />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="backdrop-filter backdrop-blur-lg bg-opacity-30 bg-transparent text-white">
          <p className="text-sm font-medium">Total Impressions: {visits}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Views;
