import AuthForm from "../../components/AuthForm";
import { loginUser } from "../../api/auth";
// import { getMe } from "../../api/auth";

const LoginPage = () => {
  // this is for when u don't want to always login the app everytime-only for dev
  // if (isDev) {
  //   // Fake token for dev use only
  //   const fakeToken = "dev-token-123";
  //   localStorage.setItem("token", fakeToken);
  //   console.log("✅ Dev login activated");
  // }

  return (
    <AuthForm
      title="Login to Your Journal"
      buttonText="Login"
      footerText="Don't have an account?"
      footerLink="/register"
      footerLinkText="Register"
      authUser={loginUser}
      // getMe={getMe}
    />
  );
};
export default LoginPage;
