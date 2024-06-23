import  { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { SignIn, useUser } from "@clerk/clerk-react";
 
const Protected = ({ Component }) => {
  const { user } = useUser();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Simulate an asynchronous call to check authentication status
        const emid = user?.primaryEmailAddress?.emailAddress;
        setIsSignedIn(emid != null);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {isSignedIn ? (
        <Component /> 
      ) : (
        <div className="flex justify-center">
        <SignIn mode="modal" redirectUrl="/signup" />
        </div>
      )}
    </div>
  );
};

Protected.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default Protected;
