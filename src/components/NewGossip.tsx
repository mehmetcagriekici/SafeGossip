//imports
import styled from "styled-components";
import InputContainer from "./InputContainer";
import { FieldValues, useForm } from "react-hook-form";
import {
  getFromLocalStorage,
  sendToLocalStorage,
} from "../services/localStorage";
import {
  breakPoints,
  defaultColors,
  defaultFontValues,
  defaultFormValues,
  mediumFontValues,
} from "../styles/defaultValues";
import { useState } from "react";

//styles
const StyledForm = styled.form`
  height: 92dvh;
  width: 100dvw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const StyledFieldset = styled.fieldset`
  width: 98%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: none;
`;

const StyledLabel = styled.label`
  color: ${defaultColors.light};
  font-size: ${defaultFormValues.labelDefaultFontSize};
  line-height: ${defaultFormValues.labelDefaultLineHeight};
  letter-spacing: ${defaultFormValues.labelDefaultLetterSpacing};

  @media ${breakPoints.medium} {
    font-size: ${defaultFormValues.labelMediumFontSize};
  }
`;

const StyledTextarea = styled.textarea`
  width: 96%;
  min-height: 8rem;

  border: none;
  outline: none;
  border-radius: 0.6rem;

  font-size: ${defaultFormValues.inputDefaultFontSize};
  font-weight: ${defaultFormValues.inputDefaultFontWeight};
  letter-spacing: ${defaultFormValues.inputDefaultLetterSpacing};

  background-color: ${defaultColors.light};

  overflow-y: auto;

  margin-top: 0.6rem;
  padding: 0.2rem;

  resize: none;

  @media ${breakPoints.medium} {
    width: 98%;
    min-height: 10rem;
    font-size: ${defaultFormValues.inputMediumFontSize};
  }

  @media ${breakPoints.large} {
    min-height: 16rem;
  }
`;

const StlyedMessage = styled.div`
  width: 98%;

  color: ${defaultColors.light};
  font-size: 0.8rem;
  line-height: 1.6;
  letter-spacing: 0.1rem;
  font-weight: 900;
  text-transform: uppercase;

  @media ${breakPoints.medium} {
    font-size: 1.2rem;
    line-height: ${mediumFontValues.lineHeight};
    letter-spacing: ${mediumFontValues.letterSpacing};
    font-weight: 700;
  }

  @media ${breakPoints.large} {
    font-size: 1.6rem;
  }
`;

const StyledButton = styled.button`
  min-height: 10%;
  width: 40%;

  color: ${defaultColors.light};
  font-size: ${defaultFontValues.fonstSize};
  font-weight: 900;

  background-color: ${defaultColors.midway};

  border: none;
  border-radius: 0.7rem;

  transition: all 0.5s ease-out;

  &:hover {
    cursor: pointer;
    color: ${defaultColors.dark};
    background-color: ${defaultColors.light};
  }

  @media ${breakPoints.medium} {
    width: 20%;
  }
`;

function NewGossip({
  trueSum,
  currKey,
}: {
  trueSum: () => void;
  currKey: string;
}) {
  const { handleSubmit, register, reset } = useForm();
  const [visualRangeValue, setVisualRangeValue] = useState(0);
  const [behaviorRangeValue, setBehaviorRangeValue] = useState(0);
  const [intelligenceRangeValue, setIntelligenceRangeValue] = useState(0);

  function onSubmit(data: FieldValues) {
    //destructure data
    const {
      arbitrary_attachment: arbitraryAttachment,
      behavior_attachment: behaviorAttachment,
      behavior_rating: behaviorRating,
      intelligence_attachment: intelligenceAttachment,
      intelligence_rating: intelligenceRating,
      visual_attachment: visualAttachment,
      visual_rating: visualRating,
    } = data;

    //get app data from local storage
    const appData = getFromLocalStorage();
    const {
      visiual: { ratings: visualRatings, attachments: visualAttachments },
      behavior: { ratings: behaviorRatings, attachments: behaviorAttachments },
      intelligence: {
        ratings: intelligenceRatings,
        attachments: intelligenceAttachments,
      },
      arbitraryAttachments,
    } = appData.keys[currKey];

    //if the arrays above have a length greater then 2, start displaying sum
    const displaySum =
      visualRatings.length > 2 &&
      visualAttachments.length > 2 &&
      behaviorRatings.length > 2 &&
      behaviorAttachments.length > 2 &&
      intelligenceRatings.length > 2 &&
      intelligenceAttachments.length > 2 &&
      arbitraryAttachments.length > 2;

    if (displaySum) trueSum();

    //update the local storage
    sendToLocalStorage({
      ...appData,
      keys: {
        ...appData.keys,
        [currKey]: {
          visiual: {
            ratings: [...visualRatings, visualRating],
            attachments: [...visualAttachments, visualAttachment],
          },
          intelligence: {
            ratings: [...intelligenceRatings, intelligenceRating],
            attachments: [...intelligenceAttachments, intelligenceAttachment],
          },
          behavior: {
            ratings: [...behaviorRatings, behaviorRating],
            attachments: [...behaviorAttachments, behaviorAttachment],
          },
          arbitraryAttachments: [...arbitraryAttachments, arbitraryAttachment],
        },
      },
    });

    //reset form
    reset();

    //reset range values
    setVisualRangeValue(0);
    setIntelligenceRangeValue(0);
    setBehaviorRangeValue(0);
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StlyedMessage>
        {
          "Please wrap your adjectives (definiteves) between octothorpes(#) without any space between while writing comments(adding attachments). This is necessary for us to create a healthy summary based on the data you provide. Otherwise we will not be able to give you the most repeated definitive you and your friends used for this lucky individual. You need at least 3 submits to see the results."
        }
      </StlyedMessage>
      <InputContainer
        question="How was your friend or non-friend looking? Plesase decribe in the text input and rate with the range input. Make sure to wrap the words you use to define (ex. adjectives) the individual between octothorpes (#)."
        register={register}
        name="visual"
        rangeValue={visualRangeValue}
        setRangeValue={setVisualRangeValue}
      />
      <InputContainer
        question="Tell me about your friend's behavior today? Make sure to use octothorpes while defining adjectives!"
        register={register}
        name="behavior"
        rangeValue={behaviorRangeValue}
        setRangeValue={setBehaviorRangeValue}
      />
      <InputContainer
        question="How smart was he/she/they? Make sure to use octothorpes while defining adjectives!"
        register={register}
        name="intelligence"
        rangeValue={intelligenceRangeValue}
        setRangeValue={setIntelligenceRangeValue}
      />
      <StyledFieldset>
        <StyledLabel htmlFor="arbitrary">
          {
            "Anything else you want to spill? This is the place in which you can say anyhting, and all will be counted if you use octothorpes(#)."
          }
        </StyledLabel>
        <StyledTextarea
          id="arbitrary"
          {...register("arbitrary_attachment", {
            required: true,
          })}
        ></StyledTextarea>
      </StyledFieldset>
      <StyledButton type="submit">Submit</StyledButton>
    </StyledForm>
  );
}

export default NewGossip;
