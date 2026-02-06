import { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAccessToken, finishLoading, setUser } from "./authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const refreshRes = await axios.post(
          "http://localhost:3000/api/auth/refresh",
          {},
          { withCredentials: true },
        );
        dispatch(setAccessToken(refreshRes.data.accessToken));
        const meRes = await axios.get("http://localhost:3000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${refreshRes.data.accessToken}`,
          },
          withCredentials: true,
        });
        dispatch(setUser(meRes.data));
      } catch (error) {
        console.log("error in useAuth ", error.message);
      } finally {
        dispatch(finishLoading());
      }
    };

    restoreSession();
  }, [dispatch]);
};
