import AuthForm from "../../components/AuthForm";
import { register } from "../../features/authSlices";

const RegisterPage = () => {
  return (
    <AuthForm
      title="Create Your Journal"
      buttonText="Register"
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Login"
      authAction={register}
    />
  );
};
export default RegisterPage;
