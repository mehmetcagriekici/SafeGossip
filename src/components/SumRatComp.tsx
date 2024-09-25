//src : https://recharts.org/en-US/examples/AreaChartFillByValue

//imports
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import styled from "styled-components";
import CustomToolTip from "./CustomToolTip";

//styles
const StyledRatings = styled.div`
  height: 40%;
  width: 100%;

  margin-bottom: 2rem;
`;

function SummaryRatingsComponent({ ratings }: { ratings: string[] }) {
  //all ratings are strings
  const numRatings = ratings.map((rating) => Number(rating));

  //edge values
  const max = Math.max(...numRatings);
  const min = Math.min(...numRatings);
  const avg =
    numRatings.reduce((sum, rating) => rating + sum) / numRatings.length;

  const ratingsChartData = numRatings.map((rating) => ({
    rating,
    max,
    min,
    avg,
  }));

  return (
    <StyledRatings>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={ratingsChartData}
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 10,
          }}
        >
          <Tooltip content={<CustomToolTip />} />
          <Line type="monotone" dot={false} dataKey="min" stroke="#440088" />
          <Line type="monotone" dot={false} dataKey="max" stroke="#440088" />
          <Line type="monotone" dot={false} dataKey="avg" stroke="#00ff88" />
          <Line type="bump" dataKey="rating" stroke="#0088ff" />
        </LineChart>
      </ResponsiveContainer>
    </StyledRatings>
  );
}

export default SummaryRatingsComponent;
