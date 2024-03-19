import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/reducers/userReducer";
import { useRouter } from "next/navigation";

interface LoginResult {
  loading: boolean;
  error: string | null;
  data: any;
  login: () => Promise<void>;
}

const useLogin = (email: string, password: string): LoginResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const dispatch = useDispatch();

  const router = useRouter();

  const login = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });
      setData(response.data);
      // Dispatch action to Redux store
      dispatch(setUser(response.data.user));
      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("accessToken", response.data.token);
      router.push("/account");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, login };
};

export default useLogin;
