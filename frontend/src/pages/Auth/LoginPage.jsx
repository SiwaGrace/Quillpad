import AuthForm from "../../components/AuthForm";

const LoginPage = () => {
  return (
    <AuthForm
      title="Login to Your Journal"
      buttonText="Login"
      footerText="Don't have an account?"
      footerLink="/register"
      footerLinkText="Register"
    />
  );
};
export default LoginPage;
