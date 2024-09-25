//imports
import styled from "styled-components";
import NewGossip from "./NewGossip";
import Sum from "./Sum";
import { getFromLocalStorage } from "../services/localStorage";
import { useEffect, useState } from "react";
import { defaultColors } from "../styles/defaultValues";
import ToggleBtn from "./ToggleBtn";

//styles
const StyledContainer = styled.div`
  height: 100dvh;
  width: 100dvw;

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background-color: ${defaultColors.dark};
`;

function GossipContainer({ currKey }: { currKey: string }) {
  //when true, there is enough data for summary and it is ready to be displayed.
  const [sumReady, setSumReady] = useState(false);
  //toggle between sum screen, and gossip form, on true display sum
  const [showSum, setShowSum] = useState(false);

  //function to make SumReady true in child components
  const trueSum = () => setSumReady(true);
  const toggleSum = () => setShowSum((show) => !show);

  //get the keys from the local storage
  const { keys } = getFromLocalStorage();
  const {
    visiual: { ratings: visualRatings, attachments: visualAttachments },
    behavior: { ratings: behaviorRatings, attachments: behaviorAttachments },
    intelligence: {
      ratings: intelligenceRatings,
      attachments: intelligenceAttachments,
    },
    arbitraryAttachments,
  } = keys[currKey];

  //initial check sum
  const displaySum =
    visualRatings.length > 2 &&
    visualAttachments.length > 2 &&
    behaviorRatings.length > 2 &&
    behaviorAttachments.length > 2 &&
    intelligenceRatings.length > 2 &&
    intelligenceAttachments.length > 2 &&
    arbitraryAttachments.length > 2;

  useEffect(() => {
    if (displaySum) trueSum();
  }, [displaySum]);

  return (
    <StyledContainer>
      {sumReady && <ToggleBtn onClick={toggleSum} showSum={showSum} />}
      {sumReady && showSum && <Sum currKey={currKey} />}
      {showSum || <NewGossip currKey={currKey} trueSum={trueSum} />}
    </StyledContainer>
  );
}

export default GossipContainer;
