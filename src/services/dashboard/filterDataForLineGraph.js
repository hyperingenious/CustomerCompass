import { monthNames } from "../../config/app-data";

// average rating "all time" of all stars
export function starGrowthLineAllTime(rawFromServer) {
  let acc = [0, 0, 0, 0, 0];

  const growthRawData = rawFromServer.map((graph, index) => {
    if (graph.rating !== 0) acc[graph.rating - 1]++;

    // making date label for each rating like : Nov 23
    const label = `${monthNames[
      new Date(graph.created_at).getMonth()
    ].substring(0, 3)} ${new Date(graph.created_at)
      .getFullYear()
      .toString()
      .slice(-2)}`;
    return {
      label,
      avg_1: ((acc[0] / (index + 1)) * 100).toFixed(0),
      avg_2: ((acc[1] / (index + 1)) * 100).toFixed(0),
      avg_3: ((acc[2] / (index + 1)) * 100).toFixed(0),
      avg_4: ((acc[3] / (index + 1)) * 100).toFixed(0),
      avg_5: ((acc[4] / (index + 1)) * 100).toFixed(0),
      ...graph,
    };
  });

  // storing all the uniques objects
  const uniqueData = {};

  growthRawData.forEach((item) => {
    const uniqueId = `${new Date(item.created_at).getMonth()}-${new Date(
      item.created_at
    ).getFullYear()}`;
    if (!uniqueData[uniqueId]) uniqueData[uniqueId] = item;
  });

  // converting the uniques object in to an array
  return Object.values(uniqueData);
}

// average rating of last **7 days**
export function starGrowthLineLast7Days(rawFromServer) {
  const presentDateMinus7Days = new Date(
    new Date().setDate(new Date().getDate() - 7)
  );

  // filtering data of last 7 days
  const filteredRawData = rawFromServer.filter(
    (data) => new Date(data.created_at) >= presentDateMinus7Days
  );

  const acc = [0, 0, 0, 0, 0];

  const averageGrowthData7Days = filteredRawData.map((data, index) => {
    if (data.rating !== 0) acc[data.rating - 1]++;
    // making date label for each rating like : Nov 23
    const label = `${new Date(data.created_at).getDate()} ${monthNames[
      new Date(data.created_at).getMonth()
    ].substring(0, 3)}`;
    return {
      label,
      avg_1: ((acc[0] / (index + 1)) * 100).toFixed(0),
      avg_2: ((acc[1] / (index + 1)) * 100).toFixed(0),
      avg_3: ((acc[2] / (index + 1)) * 100).toFixed(0),
      avg_4: ((acc[3] / (index + 1)) * 100).toFixed(0),
      avg_5: ((acc[4] / (index + 1)) * 100).toFixed(0),
      ...data,
    };
  });

  const uniqueData = {};

  averageGrowthData7Days.forEach((filteredData) => {
    // Making a unqiue id
    const uniqueId = `${new Date(filteredData.created_at).getDate()}-${new Date(
      filteredData.created_at
    ).getMonth()}`;
    if (!uniqueData[uniqueId]) uniqueData[uniqueId] = filteredData;
  });

  return Object.values(uniqueData);
}

// average rating of last MONTH
export function starGrowthLineLastMonth(rawFromServer) {
  // Date of last 30th day
  const presentDateMinus30Days = new Date(
    new Date().setDate(new Date().getDate() - 30)
  );

  const filteredRawData = rawFromServer.filter(
    (piece) => new Date(piece.created_at) > presentDateMinus30Days
  );

  const acc = [0, 0, 0, 0, 0];

  const averageGrowthData30Days = filteredRawData.map((data, index) => {
    if (data.rating !== 0) acc[data.rating - 1]++;
    // making date label for each rating like : Nov 23
    const label = `${new Date(data.created_at).getDate()} ${monthNames[
      new Date(data.created_at).getMonth()
    ].substring(0, 3)}`;
    return {
      ...data,
      label,
      avg_1: ((acc[0] / (index + 1)) * 100).toFixed(0),
      avg_2: ((acc[1] / (index + 1)) * 100).toFixed(0),
      avg_3: ((acc[2] / (index + 1)) * 100).toFixed(0),
      avg_4: ((acc[3] / (index + 1)) * 100).toFixed(0),
      avg_5: ((acc[4] / (index + 1)) * 100).toFixed(0),
    };
  });

  const uniqueData = {};

  averageGrowthData30Days.forEach((item) => {
    const uniqueId = `${new Date(item.created_at).getDate()}-${new Date(
      item.created_at
    ).getMonth()}-${new Date(item.created_at).getFullYear()}`;
    if (!uniqueData[uniqueId]) uniqueData[uniqueId] = item;
  });

  const uniqueArrayByData = Object.values(uniqueData);
  const finalLastMonthData = [];
  const moduleValueForIteration =
    (uniqueArrayByData.length - (uniqueArrayByData.length % 5)) / 5;
  let moduleAccumulator = moduleValueForIteration;

  uniqueArrayByData.forEach((arr, index) => {
    if (index === moduleAccumulator - 1) {
      finalLastMonthData.push(arr);
      moduleAccumulator += moduleValueForIteration;
    }
  });

  return finalLastMonthData;
}
