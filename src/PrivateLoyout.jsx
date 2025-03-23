import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

const PrivateLayout = () => {
  const { user, isLoading } = useAuth(); // Переконайтеся, що isLoading є в вашому хук-стані

  // Якщо дані користувача ще завантажуються, можемо показати лоадер
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateLayout;
