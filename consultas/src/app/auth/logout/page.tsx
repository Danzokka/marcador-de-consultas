import React from "react";
import { logout } from "@/app/actions";

const Logout = async () => {
  await logout();

  return <div>Logout</div>;
};

export default Logout;
