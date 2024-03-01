/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import ProfileCard from "./ProfileCard";
import { Card, CardTitle } from "@/components/ui/card";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import * as Realm from "realm-web";
import { useState, useEffect } from "react";
import LoadingSkeleton from "./Loading";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "sonner";

const Cards = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const getProfiles = async (page = 1, pageSize = 20) => {
    setLoading(true);
    try {
      const url = `${
        import.meta.env.VITE_API_DATA
      }?page=${page}&pageSize=${pageSize}`;
      const response = await fetch(url);
      const { data, totalPages } = await response.json();
      setProfiles(data);
      localStorage.setItem("profiles", JSON.stringify(data));
      setTotalPages(totalPages);
    } catch (error) {
      toast.error("Error fetching profiles");
      console.error("Error fetching profiles:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProfiles(currentPage);
  }, []);

  useEffect(() => {
    getProfiles(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm?.length > 0) {
        try {
          setLoading(true);
          const REALM_APP_ID = "application-0-rpjcj";
          const app = new Realm.App({ id: REALM_APP_ID });
          const credentials = Realm.Credentials.anonymous();
          const user = await app.logIn(credentials);

          const functionResponse = await user.functions.searchAkatsuki(
            searchTerm
          );

          if (functionResponse.length !== 0) setProfiles(functionResponse);
        } catch (error) {
          console.error("Error performing search:", error);
        } finally {
          setLoading(false);
        }
      } else {
        // If searchTerm is empty, use the initial profiles received as props
        setProfiles(profiles);
      }
    };

    fetchData();
  }, [searchTerm]);

  const handleSearch = (event) => {
    event.preventDefault();
    const searchTermInput = event.currentTarget.querySelector(
      '[name="searchTerm"]'
    );
    if (searchTermInput) {
      setSearchTerm(searchTermInput.value);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <div className="flex justify-evenly items-center w-full fixed top-0 backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-neutral-900 z-50 px-10 py-0 gap-8">
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
            onSubmit={handleSearch}
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
                onChange={(e) => setSearchTerm(e.target.value)}
                name="search"
                value={searchTerm}
                className="py-2 text-sm text-white bg-transparent rounded-md pl-10 focus:outline-none "
                autoComplete="off"
              />
            </div>
          </form>
        </div>

        <div className="flex flex-wrap justify-center gap-7 mt-20 my-3 p-6">
          {loading ? (
            [...Array(8)].map((element) => <LoadingSkeleton key={element} />)
          ) : profiles.length === 0 ? (
            <h1 className="text-slate-600 text-xl">No results found.</h1>
          ) : (
            profiles.map((member) => (
              <ProfileCard key={member._id} data={member} />
            ))
          )}
        </div>
      </div>

      {/* pagination */}
      <div className="py-10 w-full">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`border-slate-600  bg-black border transition-all duration-500 text-white cursor-pointer ${
                  currentPage > 1
                    ? "hover:bg-slate-100 hover:text-black"
                    : "hover:bg-black hover:text-white"
                }`}
                onClick={() =>
                  setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                }
                disabled={currentPage === 1}
              />
            </PaginationItem>

            {currentPage > 1 && (
              <PaginationItem>
                <PaginationEllipsis className="transition-all duration-500 text-white" />
              </PaginationItem>
            )}

            {[...Array(2).keys()]
              .map((_, index) => currentPage + index)
              .filter((page) => page <= totalPages)
              .map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    className={`border-slate-600 bg-black border hover:bg-slate-100 hover:text-black transition-all duration-500 cursor-pointer
                  text-white ${
                    currentPage === page ? "bg-white text-black" : ""
                  }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationEllipsis className="transition-all duration-500 text-white" />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                className={`border-slate-600  bg-black border transition-all duration-500 text-white cursor-pointer ${
                  currentPage !== totalPages
                    ? "hover:bg-slate-100 hover:text-black"
                    : "hover:bg-black hover:text-white"
                }`}
                onClick={() =>
                  setCurrentPage((prevPage) =>
                    Math.min(prevPage + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default Cards;
