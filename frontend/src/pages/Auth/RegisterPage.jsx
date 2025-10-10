import AuthForm from "../../components/AuthForm";
const RegisterPage = () => {
  return (
    <AuthForm
      title="Create Your Journal"
      buttonText="Register"
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Login"
    />
  );
};
export default RegisterPage;
