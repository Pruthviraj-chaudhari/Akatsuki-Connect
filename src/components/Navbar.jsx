import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Card, CardTitle } from "./ui/card";

export function Navbar() {

  return (
    <div className="">
       {/* Navbar */}
       <div className="flex justify-evenly items-center w-full fixed top-0 bg-black z-50 bg-opacity-80 px-10 py-0 gap-8">
        <Card className="flex items-center bg-black bg-opacity-0 mb-4 relative top-2 border-none">
          <CardTitle className="flex justify-center items-center gap-2 lg:text-2xl sm:text-sm bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 tracking-wide">
            <img
              className="w-[50px]"
              src="https://i.ibb.co/mb0W3LS/pngegg.png"
              alt=""
            />
            Akatsuki Connect
          </CardTitle>
        </Card>

        <form
          // onSubmit={handleSearch}
          className="flex justify-center w-36 lg:w-2/12"
        >
          <div className="relative w-full text-gray-600 focus-within:text-gray-400 border-[1px] border-white rounded-full ">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <MagnifyingGlassIcon
                height="20"
                width="20"
                className="text-white"
              />
            </span>
            <input
              type="text"
              placeholder="Search..."
              name="search"
              value=""
              className="py-2 text-sm text-white bg-transparent rounded-md pl-10 focus:outline-none "
              autoComplete="off"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
