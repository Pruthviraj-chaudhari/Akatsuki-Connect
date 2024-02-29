import { Skeleton } from "./ui/skeleton";
import { CardContent, Card } from "@/components/ui/card";

const FullSkeleton = () => {
  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-2  md:w-10/12 gap-2 lg:gap-12 items-start px-4 mx-auto py-6">
    <div className="flex flex-col md:h-[70vh] lg:h-full gap-6 m-1 px-6">
      <Card className="md:h-[70vh] lg:h-full bg-black text-white rounded-[22px] border border-slate-600">
        <CardContent className="flex flex-col justify-center items-center gap-4 p-6">
          <Skeleton className="h-52 w-52 mt-20 rounded-full bg-neutral-600" />
          <Skeleton className="h-6 w-1/2 bg-neutral-600" />
        </CardContent>
      </Card>
    </div>
    <div className="flex flex-col md:h-[70vh] lg:h-full gap-6 m-1 px-6">
      <Card className="h-[180px] md:h-[220px] lg:h-[180px] rounded-[22px] bg-dark border border-slate-600">
        <Skeleton className="h-6 w-1/3 bg-neutral-600 m-5 mt-8" />
        <Skeleton className="h-2 w-3/4 md:w-96 bg-neutral-600 mx-5" />
        <Skeleton className="h-2 w-2/3 lg:w-80 bg-neutral-600 mx-5 mt-4" />
      </Card>
  
      <Card className="h-[200px] md:h-[240px] lg:h-[200px] rounded-[22px] bg-dark border border-slate-600">
        <Skeleton className="h-6 w-1/3 bg-neutral-600 m-5 mt-5" />
  
        <div className="grid gap-4 grid-cols-2 mt-4 ml-5">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full bg-neutral-600 " />
              <Skeleton className="h-5 w-1/2 bg-neutral-600 " />
            </div>
          ))}
        </div>
      </Card>
  
      <Card className="h-[200px] md:h-[240px] lg:h-[200px] rounded-[22px] bg-dark border border-slate-600">
        <Skeleton className="h-8 w-1/3 bg-neutral-600 m-5 mt-8" />
        <Skeleton className="h-2 w-3/4 md:w-72 bg-neutral-600 mx-5" />
      </Card>
    </div>
  </div>
  

  );
};

export default FullSkeleton;
