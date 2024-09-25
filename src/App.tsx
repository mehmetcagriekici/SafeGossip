//imports
import styled from "styled-components";
import Auth from "./components/Auth";
import GossipContainer from "./components/GossipContainer";
import { useState } from "react";

//stlyes
const StyledApp = styled.div``;

function App() {
  //if true display login fail, hide login form for some time (6s)
  const [authFail, setAuthFail] = useState(false);
  //if true display display the rest of the app
  const [authSuccess, setAuthSuccess] = useState(false);
  //session key (updated after login form is submitted)
  const [currKey, setCurrKey] = useState("");

  //authentication functions //////
  const authFailed = () => setAuthFail(true);
  const resetAuthFail = () => setAuthFail(false);
  const authSucceeded = () => setAuthSuccess(true);
  //////////

  return (
    <StyledApp>
      {authSuccess || (
        <Auth
          authFail={authFail}
          onAuthFail={authFailed}
          onAuthSucceed={authSucceeded}
          resetAuthFail={resetAuthFail}
          onCurrentKey={setCurrKey}
        />
      )}
      {authSuccess && <GossipContainer currKey={currKey} />}
    </StyledApp>
  );
}

export default App;
