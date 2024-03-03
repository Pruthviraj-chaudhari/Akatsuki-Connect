// useApiHandler.js
import { useContext } from "react";
import { AppContext } from "@/contexts/AppContext";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function useApiHandler() {
  const navigate = useNavigate();
  const { setUserData, setIsLogin } = useContext(AppContext);

  const ApiHandler = async ({
    apiUrl,
    requestBody,
    loadingMessage,
    successMessage,
    errorMessage,
    navigateTo = null,
  } = {}) => {
    try {
      const promise = () =>
        axios
          .post(apiUrl, requestBody, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token') || ''}`, // Include the stored token
            },
          })
          .then((response) => {
            setIsLogin(true);
            setUserData(response.data.student);
            // Save the token in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.student));
          })
          .catch((error) => {
            if (error.response) {
              const errorMessage = error.response.data.message;
              throw new Error(errorMessage);
            } else if (error.request) {
              throw new Error("No response from the server");
            } else {
              throw error;
            }
          });

      toast.promise(promise(), {
        loading: loadingMessage,
        success: () => {
          if (navigateTo) {
            navigate(navigateTo);
          }
          toast.success(successMessage);
        },
        error: (error) => {
          return toast.error(error.message);
        },
      });
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error(errorMessage);
    }
  };

  

  return { ApiHandler };
}

export default useApiHandler;
