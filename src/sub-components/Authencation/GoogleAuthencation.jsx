import React, { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { googleAuth } from "../../actions/authActions";
import { displayMessage } from "../../actions/messageActions";

function GoogleAuthencation() {
  const google_client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      dispatch(displayMessage(error));
    }
  }, [error]);

  const handleSuccess = (credentialResponse) => {
    dispatch(googleAuth(credentialResponse));
  };

  const handleFailure = (error) => {    
    dispatch(displayMessage("Login Failed"));
  };
  
  return (
    <GoogleOAuthProvider clientId={google_client_id}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
    </GoogleOAuthProvider>
  );
}

export default GoogleAuthencation;
