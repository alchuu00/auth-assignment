import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface UserData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string | null;
  avatar: string | null;
}

interface UpdateResult {
  loading: boolean;
  error: string | null;
  data: UserData;
  update: (data: UserData) => Promise<void>;
}

const useUpdateUser = (): UpdateResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const router = useRouter();

  const update: (data: UserData) => Promise<void> = async (data: UserData) => {
    console.log("update function called");
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        "http://localhost:8000/update",
        {
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          avatar: data.avatar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
      console.log("user updated");
    } catch (err: any) {
      setError(err.message);
      if (err.response && err.response.status === 500) {
        router.push("/500");
      } else if (err.response && err.response.status === 404) {
        router.push("/404");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, update };
};

export default useUpdateUser;
