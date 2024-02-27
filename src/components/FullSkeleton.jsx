import { Skeleton } from "./ui/skeleton";
import { CardContent, Card, CardHeader } from "@/components/ui/card";

const FullSkeleton = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start max-w-[90vw] md:w-[80vw] px-4 mx-auto py-6">
      <div className="flex flex-col lg:h-[79vh] gap-6 ">
        <Card className="lg:h-[79vh] bg-black text-white rounded-[22px] border border-slate-600">
          <CardContent className="flex flex-col justify-center items-center gap-4 p-6">
            <Skeleton className="h-52 w-52 rounded-full bg-neutral-900" />
            <Skeleton className=" h-2 w-1/2 bg-neutral-900" />
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-6">
        <Card className="h-[200px] rounded-[22px] bg-dark border border-slate-600">
          <Skeleton className="h-8 w-1/3 bg-neutral-900 m-5 mt-8" />
        </Card>

        <Card className="h-[200px] rounded-[22px] bg-dark border border-slate-600">
          <Skeleton className="h-full w-full" />
        </Card>

        <Card className="h-[200px] rounded-[22px] bg-dark border border-slate-600">
          <Skeleton className="h-full w-full" />
        </Card>
      </div>
    </div>
  );
};

export default FullSkeleton;
