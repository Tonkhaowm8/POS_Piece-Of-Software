// RedirectPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RedirectLayout from './LogoutLayout';

function Logout() {
  const history = useNavigate();

  useEffect(() => {
    // Redirect to the target page after a short delay (e.g., 2 seconds)
    const redirectTimeout = setTimeout(() => {
      history('/login');
    }, 200); // Adjust the delay as needed (in milliseconds)

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(redirectTimeout);
  }, [history]);

  return (
    <RedirectLayout>
        <div>
            <p>Redirecting to the target page...</p>
            {/* You can add a loading spinner or message here */}
        </div>
    </RedirectLayout>
  );
}

export default Logout;