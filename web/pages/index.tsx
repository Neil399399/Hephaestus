import type { NextPage } from "next";
import "semantic-ui-css/semantic.min.css";
import LoginForm from "./login";

const Home: NextPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Home;
