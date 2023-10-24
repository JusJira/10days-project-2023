import React from "react";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";

function page() {
  return (
    <div>
      <LoginLink>Sign in</LoginLink>

      <RegisterLink>Sign up</RegisterLink>
    </div>
  );
}

export default page;
