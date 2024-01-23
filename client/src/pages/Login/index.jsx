import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../../components/AuthForm";
import { fetchUserByIdThunk, loginThunk } from "../../thunks/auth-thunk";
import { useEffect } from "react";

export default function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message } = useSelector((state) => state.error);
  const { user } = useSelector((state) => state.user);

  const fields = [
    {
      placeholder: "username",
      name: "username",
      type: "text",
    },
    {
      placeholder: "Password",
      name: "password",
      type: "password",
      validateStatus: message ? "error" : null,
      help: message || null,
    },
  ];

  useEffect(() => {
    if (user) {
      dispatch(fetchUserByIdThunk(user.id));
    }
  }, []);
  console.log("user onboarding", user);

  // TODO: check onboarding==approved:PERSONAL INFORMATION PAGE
  // else REDIRECT TO ONBOARDING PAGE
  const onSubmit = (data) => {
    dispatch(loginThunk(data)).then((res) => {
      if (res.payload.token) {
        if (res.payload.username === "hr") {
          navigate("/hiring-management");
        } else {
          setTimeout(() => {
            // Set loading to false after 1 second
        
          }, 1000);
     
          if (user.onboardingStatus === "approved") {
            console.log("user onboarding", user.onboardingStatus);
            navigate("/personal-information");
          } else {
            navigate("/onboarding");
          }
        }
      }
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <AuthForm
        buttonText="Log in"
        onSubmit={onSubmit}
        title="Please log in first"
        fields={fields}
      />
    </div>
  );
}
