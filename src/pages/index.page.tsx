import type { NextPage } from "next";

import { withAuth } from "@/utils/withAuth";

const Home: NextPage = () => {
  return <div>Home</div>;
};

export default withAuth(Home);
