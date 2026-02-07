import { Spinner } from "@/components/ui/spinner";
import { useSelector } from "react-redux";

const AuthLoader = ({ children }) => {
  const { loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return children;
};

export default AuthLoader;
