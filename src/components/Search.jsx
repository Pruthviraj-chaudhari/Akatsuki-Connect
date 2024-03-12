/* eslint-disable react/prop-types */
import { setLoading } from "@/slices/authSlice";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Realm from "realm-web";

const Search = ({profiles, setProfiles}) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm?.length > 0) {
        try {
          dispatch(setLoading(true));
          const REALM_APP_ID = import.meta.env.VITE_API_ATLAS_SEARCH;
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
          dispatch(setLoading(false));
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
    <div className=" flex justify-center w-36 mx-4 border-[1px] border-white rounded-full">
      <form
        onSubmit={handleSearch}
        className="relative w-full text-gray-600 focus-within:text-gray-400"
      >
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <MagnifyingGlassIcon height="20" width="20" className="text-white" />
        </span>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          name="search"
          value={searchTerm}
          className="py-2 text-sm text-white bg-transparent rounded-md pl-10 focus:outline-none max-w-32"
          autoComplete="off"
        />
      </form>
    </div>
  );
};

export default Search;
