//imports
import styled from "styled-components";
import { defaultColors, defaultFontValues } from "../styles/defaultValues";
import { useEffect } from "react";

//styles
const StlyedMockingContainer = styled.div`
  height: 100dvh;
  width: 100dvw;

  display: flex;
  justify-content: center;
  align-items: center;

  span {
    height: 96%;
    width: 96%;

    user-select: none;

    color: ${defaultColors.light};
    font-size: ${defaultFontValues.fonstSize};
  }

  background-color: ${defaultColors.dark};
`;

const StyledMockingMessage = styled.p``;

function LoginFail({
  resetAuthFail,
  authFail,
}: {
  resetAuthFail: () => void;
  authFail: boolean;
}) {
  //after some time reset authFail
  useEffect(() => {
    //always true in this component
    if (authFail)
      setTimeout(() => {
        resetAuthFail();
      }, 4321);
  }, [authFail, resetAuthFail]);
  return (
    <StlyedMockingContainer>
      {/*False login*/}
      <StyledMockingMessage>
        <span>
          Wonder you, where you do not belong, or maybe you do, does not matter
          I have no morals, entwined I am, only to the key.
        </span>
      </StyledMockingMessage>
    </StlyedMockingContainer>
  );
}

export default LoginFail;
