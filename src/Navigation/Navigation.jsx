import { useNavigate } from "react-router-dom";

export const NavigateToLogin = () => {
  const navigate = useNavigate();
  return () => navigate("/login");
};

export const NavigateToSignup = () => {
  const navigate = useNavigate();
  return () => navigate("/signup")
};

export const NaivgateToChatScreen = () => {
  const navigate = useNavigate();
  return () => navigate("/chatscreen")
};