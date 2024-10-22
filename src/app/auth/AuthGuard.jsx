import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { protectedRoutes } from "app/routes";
import GullLayout from "app/layouts/GullLayout";
import AccessDenied from "app/views/sessions/AccessDenied";

const userHasPermission = (pathname, user, routes) => {
  if (!user) {
    console.log("Nenhum usuário encontrado");
    return false;
  }

  const matched = routes.find((r) => r.path === pathname);
  const hasPermission = matched && matched.auth && matched.auth.length ? matched.auth.includes(user.role) : true;
  
  console.log(`User role: ${user.role}`);
  console.log(`Matched route: ${matched ? matched.path : "None"}`);
  console.log(`Has permission: ${hasPermission}`);
  
  return hasPermission;
};

export default function AuthGuard() {
  const { pathname } = useLocation();
  const [previousRoute, setPreviousRoute] = useState(null);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (previousRoute !== null) setPreviousRoute(pathname);
  }, [pathname, previousRoute]);

  return (
    <>
      {isAuthenticated && userHasPermission(pathname, user, protectedRoutes) ? (
        <GullLayout>
          <Outlet />
        </GullLayout>
      ) : (
        <>
          {isAuthenticated && !userHasPermission(pathname, user, protectedRoutes) ? (
            <AccessDenied />
          ) : (
            <Navigate to={previousRoute || "/sessions/signin"} replace={true} />
          )}
        </>
      )}
    </>
  );
}
