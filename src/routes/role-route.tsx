import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "@/utils/routes";

interface RoleRouteProps extends React.PropsWithChildren {
  roles?: string[];
}

function RoleRoute({ roles = [], children }: RoleRouteProps) {
  const location = useLocation();
  // const role = useSelector((state: any) => state.app.user?.role);
  const role = "admin";
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!role || roles.length === 0) return;

    const checkRole = roles.includes(role);

    if (!checkRole) {
      navigate(ROUTES.ERROR_403);
    }
  }, [location, roles, role]);

  return <>{children}</>;
}

export default RoleRoute;
