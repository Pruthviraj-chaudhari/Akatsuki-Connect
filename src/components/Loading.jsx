import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col space-y-5">
      <Card className="flex flex-col justify-center items-center w-[280px] h-full rounded-[22px] bg-black border-none ">
        <Skeleton className="w-full h-full rounded-[22px] bg-neutral-950" >
          <CardHeader className="flex flex-col justify-center items-center gap-4">
            <Skeleton className="w-24 h-24 rounded-full mb-2 bg-neutral-900" />
            <Skeleton className="h-5 w-[250px] bg-neutral-900" />
          </CardHeader>

          <CardContent>
            <div className="flex justify-center">
              <Skeleton className="h-4 w-[160px] bg-neutral-900" />
            </div>

            <div className="flex justify-center mt-4 gap-2">
              <Skeleton className="w-10 h-10 rounded-full bg-neutral-900" />
              <Skeleton className="w-10 h-10 rounded-full bg-neutral-900" />
              <Skeleton className="w-10 h-10 rounded-full bg-neutral-900" />
            </div>
          </CardContent>

          <CardFooter className="flex justify-center mt-2">
            <Skeleton className="h-10 w-2/3  bg-neutral-900" />
          </CardFooter>
        </Skeleton>
      </Card>
    </div>
  );
};

export default LoadingSkeleton;
