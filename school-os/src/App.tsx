import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { Suspense, useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { Toaster } from "sonner";
import PageSkeleton from "./PageSkeleton";

const App = () => {
  
  const fetchMe = useAuthStore((state) => state.fetchMe);
  const token = useAuthStore((s) => s.token);
  useEffect(() => {
    if (token) {
      fetchMe();
    }
  }, [token]);

  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <BrowserRouter>
        <Suspense fallback={<PageSkeleton />}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
