//imports
import styled from "styled-components";
import { breakPoints, defaultColors } from "../styles/defaultValues";

//styles
const StyledBtn = styled.button`
  height: 7.8dvh;
  width: 20dvw;

  background-color: transparent;
  border: none;
  outline: none;

  border-radius: 0.7rem;

  color: ${defaultColors.light};
  font-size: 1.3rem;
  font-weight: 700;

  &:hover {
    cursor: pointer;
    background-color: ${defaultColors.light};
    border: 0.1rem solid ${defaultColors.midway};

    color: ${defaultColors.dark};
    font-weight: 900;
  }

  @media ${breakPoints.medium} {
    font-size: 2.6rem;
    letter-spacing: 0.2rem;
  }
`;

function ToggleBtn({
  onClick,
  showSum,
}: {
  onClick: () => void;
  showSum: boolean;
}) {
  return (
    <StyledBtn onClick={onClick}>
      {showSum ? "Show Form" : "Show Summary"}
    </StyledBtn>
  );
}

export default ToggleBtn;
