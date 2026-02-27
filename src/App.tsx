import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthRoute, DashboardRoute } from "./routes";
import type { RootState } from "./store/store";
import { saveToken } from "./store/TokenSlice";

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.accessToken);

  // localStorage'dan token'ni load qilish
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken && !token) {
      dispatch(saveToken(savedToken));
    }
  }, [dispatch, token]);

  const isAuthenticated = !!token || !!localStorage.getItem("token");

  return isAuthenticated ? <DashboardRoute /> : <AuthRoute />;
};

export default App;