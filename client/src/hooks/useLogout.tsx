import { useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const router = useRouter();

  const logout = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:8000/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // Remove user data from localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");

        router.push("/");
      }
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  }, []);

  return logout;
};

export default useLogout;
