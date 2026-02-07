import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAccessToken, finishLoading, setUser, logout } from "./authSlice";

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
        dispatch(setAccessToken(refreshRes.data?.accessToken));
        const meRes = await axios.get("http://localhost:3000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${refreshRes.data?.accessToken}`,
          },
          withCredentials: true,
        });
        dispatch(setUser(meRes.data?.user));
      } catch (error) {
        console.error("Session restoration failed:", error);
        dispatch(logout());
      } finally {
        dispatch(finishLoading());
      }
    };

    restoreSession();
  }, [dispatch]);
};
