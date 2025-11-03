import AuthForm from "../../components/AuthForm";
import { registerUser } from "../../api/auth";

const RegisterPage = () => {
  return (
    <AuthForm
      title="Create Your Journal"
      buttonText="Register"
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Login"
      authUser={registerUser}
    />
  );
};
export default RegisterPage;
