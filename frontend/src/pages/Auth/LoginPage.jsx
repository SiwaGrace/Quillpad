import AuthForm from "../../components/AuthForm";
import { login } from "../../features/authSlices";

const LoginPage = () => {
  return (
    <AuthForm
      title="Login to Your Journal"
      buttonText="Login"
      footerText="Don't have an account?"
      footerLink="/register"
      footerLinkText="Register"
      authAction={login}
    />
  );
};
export default LoginPage;
