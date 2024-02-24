import "next";
import "next-auth";

declare module "next" {
  interface NextApiRequest extends NextApiRequest {
    user: {
      id: string;
    };
  }
}

declare module "next-auth" {
  interface User extends AuthUser {
    id: string;
    email: string;
    name: string;
    accessToken?: string;
    refreshToken?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      accessToken?: string;
      refreshToken?: string;
    };
  }
}

import "redux";
