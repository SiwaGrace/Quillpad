import AuthForm from "../../components/AuthForm";
import { login } from "../../features/authSlices";

const LoginPage = () => {
  return (
    <AuthForm
      title="Login to Your Journal"
      desc="Continue your creative journey"
      buttonText="Login"
      footerText="Don't have an account?"
      footerLink="/register"
      footerLinkText="Create an account"
      authAction={login}
    />
  );
};
export default LoginPage;
