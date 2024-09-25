//imports
import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { AuthProp, SwitchProp } from "../types/styledTypes";
import {
  breakPoints,
  defaultColors,
  defaultFontValues,
  largeFontValues,
  mediumFontValues,
} from "../styles/defaultValues";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  DemoData,
  getFromLocalStorage,
  sendToLocalStorage,
} from "../services/localStorage";

//styles
const StyledLoginForm = styled.form<AuthProp>`
  min-height: 80dvh;
  width: 80dvw;

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 7rem;

  border-radius: 0.4rem;

  transition: min-height 1s ease-out;

  @media ${breakPoints.small} {
    min-height: 60dvh;
  }

  @media ${breakPoints.medium} {
    min-height: 40dvh;
  }
`;

const StyledLabel = styled.label<SwitchProp>`
  width: 100%;
  height: 40%;

  display: ${(props) => (props.$switch ? "block" : "none")};

  color: ${defaultColors.light};
  font-size: ${defaultFontValues.fonstSize};
  line-height: ${defaultFontValues.lineHeight};
  letter-spacing: ${defaultFontValues.letterSpacing};
  font-weight: bold;

  user-select: none;
`;

const StyledInput = styled.input`
  min-height: 5rem;
  width: 96%;

  color: ${defaultColors.light};
  font-size: ${defaultFontValues.fonstSize};
  letter-spacing: ${defaultFontValues.letterSpacing};
  text-indent: 1rem;
  font-weight: bold;

  opacity: 0.5;

  outline: none;
  border: none;
  border-bottom: 0.2rem solid ${defaultColors.grey};
  border-radius: 0.2rem;

  background-color: ${defaultColors.dark};

  transition: all 1s ease-out;

  @media ${breakPoints.small} {
    min-height: 8rem;
    font-size: ${mediumFontValues.fonstSize};
    letter-spacing: ${mediumFontValues.letterSpacing};
  }

  @media ${breakPoints.medium} {
    min-height: 11rem;
    font-size: ${largeFontValues.fonstSize};
    letter-spacing: ${largeFontValues.letterSpacing};
  }
`;

const StyledSubmitButton = styled.button`
  min-height: 5rem;
  width: 50%;

  color: ${defaultColors.light};
  font-size: ${defaultFontValues.fonstSize};

  outline: none;
  border: 0.3rem solid ${defaultColors.grey};
  border-radius: 0.6rem;

  background-color: ${defaultColors.dark};

  transition: all 1s ease-out;

  &:hover {
    cursor: pointer;

    border: 0.2rem solid ${defaultColors.light};
  }

  @media ${breakPoints.small} {
    min-height: 8rem;
  }

  @media ${breakPoints.medium} {
    min-height: 11rem;
  }
`;

const StyledSwitchButton = styled.button`
  min-height: 5rem;
  width: 6rem;

  position: absolute;
  bottom: 0;
  right: 0;

  color: ${defaultColors.light};
  font-size: 0.6rem;
  text-align: center;

  border: 0.2rem solid ${defaultColors.dark};
  border-radius: 0.6rem;

  background-color: ${defaultColors.grey};

  transition: all 1s ease-out;

  &:hover {
    width: 80dvw;

    font-size: ${defaultFontValues.fonstSize};
    text-transform: uppercase;
    letter-spacing: 0.3rem;
    font-weight: 900;

    border: 0.2rem solid ${defaultColors.light};

    cursor: pointer;
  }

  @media ${breakPoints.small} {
    min-height: 8rem;
    width: 12rem;

    font-size: 1.1rem;
  }

  @media ${breakPoints.medium} {
    min-height: 11rem;
    width: 18rem;

    font-size: 1.6rem;
  }
`;

//type
type Input = {
  key: string;
};

function LoginForm({
  authFail,
  onAuthFail,
  onAuthSucceed,
  onCurrentKey,
}: {
  authFail: boolean;
  onAuthFail: () => void;
  onAuthSucceed: () => void;
  onCurrentKey: Dispatch<SetStateAction<string>>;
}) {
  const { register, handleSubmit, reset } = useForm<Input>();

  const [switchLogin, setSwitchLogin] = useState(false);

  const onSubmit: SubmitHandler<Input> = function ({ key }) {
    //get the data from the local storage
    const appData = getFromLocalStorage();

    //if user is in login section (join) (switchLogin = false) check if there is a matching key, if there is not throw an error
    if (!switchLogin) {
      //join the fun
      //get the keys from the app data
      const keys = appData.keys;

      //check if the key exists in the keys
      const keyMatch = keys[key];

      //if there is no keyMatch, authentication fails
      //if there is a keyMatch, user is authenticated, the can see the rest of the app
      if (!keyMatch) onAuthFail();
      else {
        onAuthSucceed();
        //set the session key
        onCurrentKey(key);
      }
    }

    //if user is in signup section (start) (switchLogin = true) create new key
    if (switchLogin) {
      //start the fun

      //get the keys from the app data
      const oldKeys = appData.keys;

      //all keys must be unique
      if (oldKeys[key]) {
        reset();
        alert("All keys must be unique!");
        throw new Error("All keys must be unique!");
      }

      //update the appData
      const newData: DemoData = {
        ...appData,
        keys: {
          ...oldKeys,
          [key]: {
            visiual: { ratings: [], attachments: [] },
            behavior: { ratings: [], attachments: [] },
            intelligence: { ratings: [], attachments: [] },
            arbitraryAttachments: [],
          },
        },
      };

      //send updated data to the local storage
      sendToLocalStorage(newData);

      //enter the app
      onAuthSucceed();

      //set the session key
      onCurrentKey(key);
    }

    //reset input
    reset();
  };

  return (
    <StyledLoginForm $authFail={authFail} onSubmit={handleSubmit(onSubmit)}>
      <StyledLabel $switch={!switchLogin} htmlFor="start">
        Do I feel betrayed? No, but this secret is no more. Keep your key, do
        not tell others, for this is not the key, you trusted in me. Be welcome
        and join your friends, and hope this does not reach your other friend.
      </StyledLabel>
      <StyledLabel $switch={switchLogin} htmlFor="start">
        If it is fun what you seek at all, the one you hide shall be to all. I
        must advise you to keep your key, but after all it is your key. Do not
        expect any morals from me, for all I care is the key.
      </StyledLabel>
      <StyledInput
        id="start"
        {...register("key", { required: true })}
        autoFocus={true}
      />

      <StyledSubmitButton type="submit">
        {switchLogin ? "start the fun" : "join the fun"}
      </StyledSubmitButton>
      <StyledSwitchButton
        type="button"
        onClick={() => setSwitchLogin((log) => !log)}
      >
        {switchLogin ? "switch to join" : "switch to start"}
      </StyledSwitchButton>
    </StyledLoginForm>
  );
}

export default LoginForm;
