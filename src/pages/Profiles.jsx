/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import ProfileCard from "../components/SingleCard";

import { useState, useEffect } from "react";
import LoadingSkeleton from "../components/Loading";
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
import { Navbar } from "@/components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/slices/authSlice";
import Search from "@/components/Search";

const Cards = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const dispatch = useDispatch();
  const {loading} = useSelector((state)=>state.auth);

  const getProfiles = async (page = 1, pageSize = 12) => {
    dispatch(setLoading(true));
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
    dispatch(setLoading(false));
  };

  useEffect(() => {
    getProfiles(currentPage);
  }, []);

  useEffect(() => {
    getProfiles(currentPage);
  }, [currentPage]);




  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <Navbar>
          <Search profiles={profiles} setProfiles={setProfiles}/>
        </Navbar>

        <div className="flex flex-wrap justify-center gap-7 mt-20 my-3 p-6">
          {loading ? (
            [...Array(8)].map((_, index) => <LoadingSkeleton key={index} />)
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
