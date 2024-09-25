//imports
import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import styled from "styled-components";
import { SwitchProp } from "../types/styledTypes";

//styles
const StyledToolTipContainer = styled.div<SwitchProp>`
  height: ${(props) => (props.$switch ? "14rem" : "10rem")};
  min-width: 10rem;

  padding-bottom: ${(props) => (props.$switch ? "3rem" : "")};
  padding-left: 0.5rem;
  padding-right: 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;

  border: 0.2rem solid #853211;
  border-bottom: ${(props) => (props.$switch ? "none" : "")};
  border-radius: 0.7rem;

  background-color: #aabce8;
  //clip-path src: https://bennettfeely.com/clippy/ (message)
  clip-path: ${(props) =>
    props.$switch
      ? "polygon(0% 0%,100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)"
      : ""};
`;

const StyledInfo = styled.div`
  color: #853211;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.05rem;
  text-transform: capitalize;

  & > span {
    font-size: 1rem;
    font-weight: 900;
  }
`;

function CustomToolTip({ active, payload }: TooltipProps<ValueType, NameType>) {
  if (active && payload && payload.length) {
    const { name, value, total } = payload[0].payload;
    const { rating, max, min, avg } = payload[0].payload;

    if (name)
      return (
        <StyledToolTipContainer $switch={true}>
          <StyledInfo>
            word: <span>{name}</span>
          </StyledInfo>
          <StyledInfo>
            repetition: <span>{value}</span>
          </StyledInfo>
          <StyledInfo>
            total: <span>{total}</span>
          </StyledInfo>
        </StyledToolTipContainer>
      );

    if (rating || max || min || avg)
      return (
        <StyledToolTipContainer $switch={false}>
          <StyledInfo>
            rating: <span>{rating}</span>
          </StyledInfo>
          <StyledInfo>
            max: <span>{max}</span>
          </StyledInfo>
          <StyledInfo>
            avg: <span>{avg}</span>
          </StyledInfo>
          <StyledInfo>
            min: <span>{min}</span>
          </StyledInfo>
        </StyledToolTipContainer>
      );
  }

  return null;
}

export default CustomToolTip;
