import { useDispatch, useSelector } from "react-redux";
import { Bar, BarChart, Tooltip, XAxis, YAxis, LabelList } from "recharts";
import {
  changeHorizontalBarGraphMonth,
  setInitialData,
} from "../../redux/dashboard/filterHorizontalBarGraphSlice";
import { Dropdown } from "../ui/Dropdown";
import { Group, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { starGrowthBarLast5Months } from "../../services/dashboard/filterDataForBarGraph";

function HorizontalBarGraph({ reviewData }) {
  const { selectedMonthData, last5Months, selectedMonthIndex } = useSelector(
    (store) => store.horizontalBarGraphFilter
  );

  const dispatch = useDispatch();

  const [hBarDimensions, setHBarDimensions] = useState({
    width: 230,
    height: 180,
  });

  useEffect(
    function () {
      // Set initial data to fullData
      dispatch(setInitialData(starGrowthBarLast5Months(reviewData)));

      // can't use media queries instead, cuz dimensions only accepts props
      window.innerWidth < 600
        ? setHBarDimensions({ width: 290, height: 200 })
        : setHBarDimensions({ width: 230, height: 180 });
    },
    [setHBarDimensions, dispatch, reviewData]
  );

  return (
    <div>
      <Group justify="space-between" w={"100%"}>
        <Text c={"dimmed"}>BarGraph</Text>
        <Dropdown
          name={"Month"}
          dropdownOptions={last5Months}
          argOptions={[0, 1, 2, 3, 4]}
          onClick={(arg) => dispatch(changeHorizontalBarGraphMonth(arg))}
          valueType={last5Months[selectedMonthIndex]}
        />
      </Group>

      {selectedMonthData && (
        <BarChart
          width={hBarDimensions.width}
          height={hBarDimensions.height}
          data={selectedMonthData}
          layout="vertical"
          barCategoryGap={2}
          margin={{ top: 25, right: 20, bottom: 5, left: -16 }}
        >
          <XAxis
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            type="number"
          />
          <YAxis
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            dataKey="name"
            type="category"
          />
          <Tooltip />
          <Bar
            dataKey="rating"
            fill="#00b385"
            barSize={13}
            barGap={3}
            radius={15}
          ></Bar>{" "}
          <LabelList
            dataKey="rating"
            position="inside"
            style={{ fontSize: 12, color: "white" }}
          />
        </BarChart>
      )}
    </div>
  );
}

export default HorizontalBarGraph;
