//imports
import { FieldValues, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import {
  breakPoints,
  defaultColors,
  defaultFontValues,
  defaultFormValues,
} from "../styles/defaultValues";
import { TypeInput, TypeLabel } from "../types/styledTypes";
import { Dispatch, SetStateAction } from "react";

//styles
const StyledFieldset = styled.fieldset`
  width: 98%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: none;
`;

const StyledLabel = styled.label<TypeLabel>`
  min-height: ${(props) =>
    props.$isSeperator ? "0.8rem" : defaultFontValues.fonstSize};

  color: ${defaultColors.light};
  font-size: ${defaultFormValues.labelDefaultFontSize};
  line-height: ${defaultFormValues.labelDefaultLineHeight};
  letter-spacing: ${defaultFormValues.labelDefaultLetterSpacing};

  @media ${breakPoints.medium} {
    font-size: ${defaultFormValues.labelMediumFontSize};
  }
`;

const StyledInput = styled.input<TypeInput>`
  width: ${(props) => (props.$isRange ? "50%" : "98%")};
  min-height: ${(props) =>
    props.$isRange ? "1.8rem" : defaultFontValues.fonstSize};

  margin-top: ${(props) => (props.$isRange ? "0.8rem" : "0.2rem")};

  color: ${defaultColors.grey};
  font-size: ${defaultFormValues.inputDefaultFontSize};
  font-weight: ${defaultFormValues.inputDefaultFontWeight};
  letter-spacing: ${defaultFormValues.inputDefaultLetterSpacing};
  text-indent: ${defaultFormValues.inputDefaultTextIndent};

  border: none;
  outline: none;
  border-radius: 0.2rem;

  background-color: ${(props) =>
    props.$isRange ? defaultColors.midway : defaultColors.light};

  -webkit-appearance: none;
  appearance: none;

  cursor: ${(props) => (props.$isRange ? "pointer" : "text")};

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;

    height: 1.8rem;
    width: 2.4rem;

    border-radius: 0.4rem;

    background-color: ${defaultColors.light};
    //src: https://stackoverflow.com/questions/23865523/how-to-show-the-value-of-range-slider-on-the-thumb-of-the-slider
    //created by Костючик Юрий
    //edited by Stephan T.
    background-image: ${(props) =>
      `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='40' width='20'%3E%3Ccircle cx='0' cy='0' r='0' /%3E%3Ctext x='8' y='14' %3E${props.$rangeValue}%3C/text%3E%3C/svg%3E");`};
  }

  @media ${breakPoints.medium} {
    min-height: ${(props) => (props.$isRange ? "1.8rem" : "2.1rem")};
    font-size: ${defaultFormValues.inputMediumFontSize};
  }
`;

function InputContainer({
  question,
  register,
  name,
  rangeValue,
  setRangeValue,
}: {
  question: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  rangeValue: number;
  setRangeValue: Dispatch<SetStateAction<number>>;
}) {
  return (
    <StyledFieldset>
      <StyledLabel htmlFor="gossip-input-text" $isSeperator={false}>
        {question}
      </StyledLabel>
      <StyledInput
        id="gossip-input-rating"
        type="range"
        max={5}
        min={-5}
        {...register(`${name}_rating`, {
          required: true,
          onChange: (e) => setRangeValue(e.target.value),
        })}
        defaultValue={0}
        $isRange={true}
        $rangeValue={rangeValue}
      />
      <StyledLabel
        htmlFor="gossip-input-rating"
        $isSeperator={true}
      ></StyledLabel>
      <StyledInput
        id="gossip-input-text"
        type="text"
        {...register(`${name}_attachment`, {
          required: true,
        })}
        defaultValue=""
        $isRange={false}
      />
    </StyledFieldset>
  );
}

export default InputContainer;
