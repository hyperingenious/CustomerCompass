import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  changeCombinationFilter,
  changeDataAsPerTime,
  changeIndividualStarFilter,
  setInitialData,
} from "../../redux/dashboard/filterLineGraphSlice";

import { colorArray, filterCombinations } from "../../config/app-data";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "../ui/Dropdown";
import { Box, Card, Text } from "@mantine/core";
import { useEffect, useState } from "react";

import SegmentedButton from "../ui/SegmentedButton";

function LineGraph({ reviewData }) {
  const dispatch = useDispatch();
  const { combinationFilter, dataAsPerTime, individualStarFilter } =
    useSelector((store) => store.lineGraphFilter);

  const [lineGraphDimensions, setLineGraphDimensions] = useState({
    width: "100%",
    height: 225,
  });

  useEffect(
    function () {
      window.innerWidth < 600
        ? setLineGraphDimensions({ width: "100%", height: 140 })
        : setLineGraphDimensions({ width: "100%", height: 225 });
    },
    [setLineGraphDimensions]
  );

  useEffect(
    function () {
      dispatch(setInitialData(reviewData));
    },
    [reviewData, dispatch]
  );

  return (
    <div>
      <LineGraphFilterBar
        dispatch={dispatch}
        individualStarFilter={individualStarFilter}
        combinationFilter={combinationFilter}
      />

      {dataAsPerTime && (
        <ResponsiveContainer
          height={lineGraphDimensions.height}
          width={lineGraphDimensions.width}
        >
          <AreaChart data={dataAsPerTime} margin={{ left: -19, right: -30 }}>
            <XAxis tick={{ fontSize: 12 }} dataKey={"label"} />
            <YAxis
              tick={{ fontSize: 12 }}
              unit={"%"}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
            />{" "}
            <CartesianGrid opacity={0.2} vertical={false} />
            <Tooltip content={<CustomTooltip />} />
            {combinationFilter &&
              combinationFilter.map((combi) => (
                <Area
                  key={combi}
                  name={`${combi} Star`}
                  dataKey={`avg_${combi}`}
                  type={"monotone"}
                  strokeWidth={2}
                  fill="url(#color)"
                  stroke={colorArray[combi - 1]}
                  unit={"%"}
                />
              ))}
            {individualStarFilter && (
              <>
                <defs>
                  <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={colorArray[individualStarFilter]}
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="75%"
                      stopColor={colorArray[individualStarFilter]}
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                </defs>
                <Area
                  name={`${individualStarFilter} Star`}
                  dataKey={`avg_${individualStarFilter}`}
                  type={"monotone"}
                  strokeWidth={2}
                  fill="url(#color)"
                  stroke={colorArray[individualStarFilter]}
                  unit={"%"}
                />
              </>
            )}
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

function LineGraphFilterBar({
  dispatch,
  combinationFilter,
  individualStarFilter,
}) {
  return (
    <div
      style={{
        marginBottom: "var(--mantine-spacing-xs)",
        display: "flex",
        gap: "var(--mantine-spacing-xs)",
      }}
    >
      <Dropdown
        name={"Mix"}
        dropdownOptions={filterCombinations}
        argOptions={filterCombinations}
        onClick={(arg) => dispatch(changeCombinationFilter(arg))}
        valueType={combinationFilter || ""}
      />
      <Dropdown
        name={"Star"}
        dropdownOptions={[1, 2, 3, 4, 5]}
        argOptions={[1, 2, 3, 4, 5]}
        onClick={(arg) => dispatch(changeIndividualStarFilter(arg))}
        valueType={individualStarFilter || ""}
      />
      <SegmentedButton
        onChange={(arg) => dispatch(changeDataAsPerTime(arg))}
        data={[
          { label: "All", value: "all-time" },
          { label: "1M", value: "30-day-time" },
          { label: "7D", value: "7-day-time" },
        ]}
      />
    </div>
  );
}

function CustomTooltip({ _, payload, label }) {
  console.log(payload);
  return (
    <Card padding="xs" radius="sm" withBorder>
      <Label label={label} />
      <StarAverage payload={payload} />
    </Card>
  );
}

function Label({ label }) {
  return (
    <Box align="flex-start" justify="flex-start" gap="xs">
      <Text size="sm">% {label}</Text>
    </Box>
  );
}

function StarAverage({ payload }) {
  return (
    <>
      {payload !== null ? (
        <Box align="flex-start" justify="flex-start" gap="xs">
          {payload.map((data) => (
            <Text
              key={data.value}
              size="xs"
              style={{ color: "var(--mantine-color-dark-2)" }}
            >
              {data.name}: {data.value}
              {data.unit}
            </Text>
          ))}
        </Box>
      ) : null}
    </>
  );
}

export default LineGraph;
