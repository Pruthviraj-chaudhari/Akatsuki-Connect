/* eslint-disable react/prop-types */
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ImageDialog = ({ name, image }) => {
  return (
    <Dialog className="w-[20rem] border-none">

      <DialogTrigger asChild>
        <Avatar className="h-52 w-52">
          <AvatarImage
            alt={`Profile of ${name}`}
            src={
              image ||
              `https://ui-avatars.com/api/?name=${name}`
            }
          />
          <AvatarFallback>JP</AvatarFallback>
        </Avatar>
      </DialogTrigger>

      <DialogContent className="w-auto h-auto backdrop-filter backdrop-blur-lg bg-opacity-35 bg-transparent border-none text-white">
        <DialogHeader>
          <DialogTitle>Profile Picture</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <Avatar className="h-[18rem] w-[18rem] md:h-[25rem] md:w-[25rem]">
            <AvatarImage
              src={image}
              alt={name}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
