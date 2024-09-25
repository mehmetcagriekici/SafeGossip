//imports
import styled from "styled-components";
import { getFromLocalStorage } from "../services/localStorage";
import {
  breakPoints,
  defaultColors,
  defaultFontValues,
} from "../styles/defaultValues";
import SummaryAdjectiveComponent from "./SumAdjComp";
import SummaryRatingsComponent from "./SumRatComp";

//stlyes
const StyledSum = styled.div`
  height: 92dvh;
  width: 100dvw;

  padding-left: 10%;

  overflow-y: auto;

  background-color: transparent;

  //start displaying horizontally
  @media ${breakPoints.medium} {
    overflow: hidden;

    padding: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 0.3dvw;
  }
`;

const StyledChartContainer = styled.div`
  height: 60rem;
  width: 40rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background-color: #11235813;

  border: 0.5rem solid #13853211;

  @media ${breakPoints.large} {
    height: 80rem;
  }
`;

const StyledHeading = styled.h3`
  color: ${defaultColors.light};
  font-size: ${defaultFontValues.fonstSize};

  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const StlyledInformation = styled.h4`
  color: ${defaultColors.light};
  font-size: 1.2rem;

  padding-top: 1rem;
  padding-bottom: 3rem;
`;

//helper functions
//function to find most repeated adjective in each of the attachments arrays
//attachments array of long strings (sentences).
//adjectives are wrapped between number signs (hash tags) (octothorpes) (#)
function findMostRepeatedAdjectives(attachments: string[]) {
  //counts
  const adjectiveCounts: { [key: string]: number } = {};
  //loop over the main array, array of sentences
  for (let i = 0; i < attachments.length; i++) {
    //loop over the sentence to find the adjectives
    const commentArray /*attachment*/ = attachments[i]
      .split(" ")
      .map((word) => word.replace(/[^a-zA-Z0-9#-]/g, ""));

    //find the adjectives
    //count
    for (let j = 0; j < commentArray.length; j++)
      if (commentArray[j].startsWith("#") && commentArray[j].endsWith("#"))
        if (adjectiveCounts[commentArray[j]])
          adjectiveCounts[commentArray[j]]++;
        else adjectiveCounts[commentArray[j]] = 1;
      else adjectiveCounts[commentArray[j]] = 0;
  }

  //sort the counts
  //filter adjectives (adj count atleast 1)
  const sortedCounts = Object.entries(adjectiveCounts)
    .sort((pair1, pair2) => pair2[1] - pair1[1])
    .filter((pair) => pair[1]);

  return sortedCounts;
}

function Sum({ currKey }: { currKey: string }) {
  //get data from the local storage
  const { keys: appData } = getFromLocalStorage();
  //current data
  const { visiual, intelligence, behavior, arbitraryAttachments } =
    appData[currKey];
  const { ratings: visualRatigns, attachments: visualAttachments } = visiual;
  const { ratings: intelligenceRatings, attachments: intelligenceAttachments } =
    intelligence;
  const { ratings: behaviorRatings, attachments: behaviorAttachments } =
    behavior;

  //[adjective, count]
  const visualCountsArray = findMostRepeatedAdjectives(visualAttachments);
  const intelligenceCountsArray = findMostRepeatedAdjectives(
    intelligenceAttachments
  );
  const behaviorCountsArray = findMostRepeatedAdjectives(behaviorAttachments);
  const arbitraryCountsArray = findMostRepeatedAdjectives(arbitraryAttachments);

  return (
    <StyledSum>
      <StyledChartContainer>
        <StyledHeading>Visual Charts</StyledHeading>
        <StlyledInformation>
          Most used visual definitons and past ratings.
        </StlyledInformation>
        <SummaryAdjectiveComponent adjectives={visualCountsArray} />
        <SummaryRatingsComponent ratings={visualRatigns} />
      </StyledChartContainer>
      <StyledChartContainer>
        <StyledHeading>Behavior Charts</StyledHeading>
        <StlyledInformation>
          Most used behavior definitons and past ratings.
        </StlyledInformation>
        <SummaryAdjectiveComponent adjectives={behaviorCountsArray} />
        <SummaryRatingsComponent ratings={behaviorRatings} />
      </StyledChartContainer>
      <StyledChartContainer>
        <StyledHeading>Intelligence Charts</StyledHeading>
        <StlyledInformation>
          Most used intelligence definitons and past ratings.
        </StlyledInformation>
        <SummaryAdjectiveComponent adjectives={intelligenceCountsArray} />
        <SummaryRatingsComponent ratings={intelligenceRatings} />
      </StyledChartContainer>
      <StyledChartContainer>
        <StyledHeading>User Comments Charts</StyledHeading>
        <StlyledInformation>Most used arbitrary definitons.</StlyledInformation>
        <SummaryAdjectiveComponent adjectives={arbitraryCountsArray} />
      </StyledChartContainer>
    </StyledSum>
  );
}

export default Sum;
