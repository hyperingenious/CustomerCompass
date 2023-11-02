import { todayMinusWhat } from "../../helpers/helper";

/**
 * @param {object[]} allTimeData recives JSON object of all time data
 * @param {number} ratingFilter which is existing, 'All Stars' | 1 | 2 | 3 | 4 | 5
 * @returns {object[]} all time review data on basis of the rating number
 */
export function filterAllTimeData(allTimeData, ratingFilter) {
  // 'All Stars' means include all stars(fibonacchi of 1,2,3,4,5)
  if (ratingFilter === "All Stars") return allTimeData;

  const filterOnStarNumber = allTimeData.filter(
    (data) => data.rating === ratingFilter
  );

  return filterOnStarNumber;
}

/**
 * @param {object[]} allTimeData array of objects all-time-data
 * @param {Number} ratingFilter star rating 'All Stars' | 2 | 3 | 4 | 5
 * @returns {object[]} filtered data on last30Days with the ratingFilter
 */
export function filterLast30DayData(allTimeData, ratingFilter) {
  const todayMinus30Days = todayMinusWhat(30);

  const dataTodayMinus30Days = allTimeData.filter(
    (data) => new Date(data.created_at) >= todayMinus30Days
  );

  // 'All Stars' means include all stars(fibonacchi of 1,2,3,4,5)
  if (ratingFilter === "All Stars") return dataTodayMinus30Days;

  const dataAsPerRatingFilter = dataTodayMinus30Days.filter(
    (data) => data.rating === ratingFilter
  );

  return dataAsPerRatingFilter;
}

/**
 * @param {object[]} allTimeData array of objects all-time-data
 * @param {Number} ratingFilter star rating 'All Stars' | 2 | 3 | 4 | 5
 * @returns {object[]} filtered data on last7Days with the ratingFilter
 */
export function filterLast7DayData(allTimeData, ratingFilter) {
  const todayMinus7Days = todayMinusWhat(7);

  const dataTodayMinus7Days = allTimeData.filter(
    (data) => new Date(data.created_at) >= todayMinus7Days
  );

  // 'All Stars' means include all stars(fibonacchi of 1,2,3,4,5)
  if (ratingFilter === "All Stars") return dataTodayMinus7Days;

  const dataAsPerRatingFilter = dataTodayMinus7Days.filter(
    (data) => data.rating === ratingFilter
  );

  return dataAsPerRatingFilter;
}
