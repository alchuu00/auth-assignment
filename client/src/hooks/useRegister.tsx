import { useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setUser } from "@/redux/actions/userActions";

interface RegisterResult {
  loading: boolean;
  error: string | null;
  data: any;
  register: () => Promise<void>;
}

const useRegister = (
  fullName: string,
  email: string,
  password: string,
  confirmPassword: string
): RegisterResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const dispatch = useDispatch();

  const register = async () => {
    setLoading(true);
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/register", {
        fullName: fullName,
        email: email,
        password: password,
        avatar: null,
      });
      setData(response.data);
      // Dispatch action to Redux store
      dispatch(setUser(response.data));
      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, register };
};

export default useRegister;
