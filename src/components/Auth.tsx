//imports
import styled from "styled-components";
import LoginFail from "./LoginFail";
import LoginForm from "./LoginForm";
import { AuthProp } from "../types/styledTypes";
import { defaultColors } from "../styles/defaultValues";
import { Dispatch, SetStateAction } from "react";

//styles
const StyledAuth = styled.div<AuthProp>`
  position: fixed;
  top: 0;
  left: 0;

  //display ony if auth is false
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100dvh;
  width: 100dvw;

  background-color: ${defaultColors.dark};
`;

function Auth({
  authFail,
  onAuthFail,
  onAuthSucceed,
  resetAuthFail,
  onCurrentKey,
}: {
  authFail: boolean;
  onAuthFail: () => void;
  onAuthSucceed: () => void;
  resetAuthFail: () => void;
  onCurrentKey: Dispatch<SetStateAction<string>>;
}) {
  return (
    <StyledAuth $authFail={false}>
      {authFail || (
        <LoginForm
          authFail={authFail}
          onAuthFail={onAuthFail}
          onAuthSucceed={onAuthSucceed}
          onCurrentKey={onCurrentKey}
        />
      )}
      {authFail && (
        <LoginFail resetAuthFail={resetAuthFail} authFail={authFail} />
      )}
    </StyledAuth>
  );
}

export default Auth;
