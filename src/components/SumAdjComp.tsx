//imports
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
import styled from "styled-components";
import CustomToolTip from "./CustomToolTip";
import { useState } from "react";

//styles
const StyledAdjectives = styled.div`
  position: relative;
  height: 50%;
  width: 100%;
`;

function SummaryAdjectiveComponent({
  adjectives,
}: {
  adjectives: [string, number][];
}) {
  //!!! DISCLAIMER FOR THE CUSTOM TOOL TIP POSITIONING !!!
  //tooltip position src: https://github.com/recharts/recharts/issues/1848 Garry14's answer
  const [tPos, setTPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const totalCount = adjectives.reduce((sum, curr) => sum + curr[1], 0);
  //[#adj#, num] -> adj structure
  const adjChartData = adjectives
    .filter((_, i) => i < 4)
    .map((count) => ({
      name: count[0].replace(/#/g, ""),
      value: count[1],
      diff: totalCount - count[1],
      total: totalCount,
    }));

  return (
    <StyledAdjectives>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={adjChartData}
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 10,
          }}
        >
          <Bar dataKey="value" stackId="s" fill="#853211" />
          <Bar
            dataKey="diff"
            stackId="s"
            fill="#13853211"
            onMouseOver={(data) => setTPos(data)}
          />
          <Tooltip
            position={{ x: tPos.x, y: tPos.y }}
            cursor={{ fill: "transparent" }}
            content={<CustomToolTip payload={adjChartData} />}
          />
        </BarChart>
      </ResponsiveContainer>
    </StyledAdjectives>
  );
}

export default SummaryAdjectiveComponent;
