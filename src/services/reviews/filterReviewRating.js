import { todayMinusWhat } from "../../helpers/helper";


/**
 * Filter the data as per the time
 * @param {array} data raw data from the server
 * @param {string} timeFilter a string containing the time filter
 * @returns received data filtered as per time, with the timeFilter string received
 */
function filteredDataAsPerTime(data, timeFilter) {
  const todayMinus30Days = todayMinusWhat(30);
  const todayMinus7Days = todayMinusWhat(7);

  if (timeFilter === "all-time") {
    return data;
  }
  if (timeFilter === "30-day-time") {
    return data.filter((data) => new Date(data.created_at) >= todayMinus30Days);
  }
  if (timeFilter === "7-day-time") {
    return data.filter((data) => new Date(data.created_at) >= todayMinus7Days);
  }
  throw Error("Given Argument is wrong");
}

/**
 * Filters the received data as the ratingFilter received
 * @param {Array} allTimeData all time data of the ratings
 * @param {number} ratingFilter a desired rating filter range b/w 1 to 5
 * @param {string} timeFilter existing time filter to filter it ratingwise accordingly
 * @returns an Array of object filtered as the rating filter provied
 */
export function filterReviewRating(allTimeData, ratingFilter, timeFilter) {
  const filteredDataOnTime = filteredDataAsPerTime(allTimeData, timeFilter);
  if (ratingFilter === 'All Stars') {
    return filteredDataOnTime;
  }
  const filterAsPerRating = filteredDataOnTime.filter(
    (data) => data.rating === ratingFilter
  );
  return filterAsPerRating;
}
