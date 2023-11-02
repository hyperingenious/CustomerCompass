// import { rawFromServer } from "../../config/app-data";

export function starGrowthBarLast5Months(rawFromServer) {
  const initializeAccArray = () => [0, 0, 0, 0, 0];

  const accLastMonth = initializeAccArray();
  const accLastSecondMonth = initializeAccArray();
  const accLastThirdMonth = initializeAccArray();
  const accLastFourthMonth = initializeAccArray();
  const accLastFifthMonth = initializeAccArray();

  // We have to calculate this one first cuz calculating this earlier is little tricky
  const lastMonthStartingDate = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDate())
  );

  // takes the array of filtered month specific data, converts into presentable data
  function mapData(timeData) {
    return timeData.map((data, index) => {
      return { name: `${index + 1} Star`, rating: data };
    });
  }

  function getMonthStartingDate(lastMonthNumber) {
    return new Date(
      new Date().setDate(
        lastMonthStartingDate.getDate() -
          lastMonthStartingDate.getDate() -
          (lastMonthNumber - 1) * 30
      )
    );
  }

  function reduceAndFilter(ratingAcc, startDate, endDate) {
    return rawFromServer
      .filter((data) =>
        endDate
          ? new Date(data.created_at) >= startDate &&
            new Date(data.created_at) < endDate
          : new Date(data.created_at) >= startDate
      )
      .reduce((acc, curr) => {
        acc[curr.rating - 1]++;
        return acc;
      }, ratingAcc);
  }

  // Last Month
  const lastMonthData = reduceAndFilter(accLastMonth, lastMonthStartingDate);

  // Last 2nd Month
  const lastSecondMonthStartingDate = getMonthStartingDate(2);
  const lastSecondMonthData = reduceAndFilter(
    accLastSecondMonth,
    lastSecondMonthStartingDate,
    lastMonthStartingDate
  );

  // Last 3rd Month
  const lastThirdMonthStartingDate = getMonthStartingDate(3);
  const lastThirdMonthData = reduceAndFilter(
    accLastThirdMonth,
    lastThirdMonthStartingDate,
    lastSecondMonthStartingDate
  );

  // Last 4th Month
  const lastFourthMonthStartingDate = getMonthStartingDate(4);
  const lastFourthMonthData = reduceAndFilter(
    accLastFourthMonth,
    lastFourthMonthStartingDate,
    lastThirdMonthStartingDate
  );

  // Last 5th Month
  const lastFifthMonthStartingDate = getMonthStartingDate(5);
  const lastFifthMonthData = reduceAndFilter(
    accLastFifthMonth,
    lastFifthMonthStartingDate,
    lastFourthMonthStartingDate
  );

  const theFinalArray = [
    mapData(lastMonthData),
    mapData(lastSecondMonthData),
    mapData(lastThirdMonthData),
    mapData(lastFourthMonthData),
    mapData(lastFifthMonthData),
  ];

  return theFinalArray;
}

// export const growthDataHorizontalBarGraph5Months = starGrowthBarLast5Months();
