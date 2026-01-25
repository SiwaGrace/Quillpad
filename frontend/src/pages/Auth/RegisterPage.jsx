import AuthForm from "../../components/AuthForm";
import { register } from "../../features/authSlices";

const RegisterPage = () => {
  return (
    <AuthForm
      title="Begin your journey"
      desc="Create your private sanctuary for reflection."
      buttonText="Register"
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Sign in"
      authAction={register}
    />
  );
};
export default RegisterPage;
