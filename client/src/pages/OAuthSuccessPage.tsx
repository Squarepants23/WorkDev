import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function OAuthSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-2xl font-semibold">
        Logging you in...
      </h1>
    </div>
  );
}

export default OAuthSuccessPage;