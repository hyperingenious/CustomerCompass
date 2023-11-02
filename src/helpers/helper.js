import { monthNames } from "../config/app-data";

/**
 * Calculates the name of the last 5 months
 * @returns Array containing names of the last 5 months inclusively
 */
export function getLast5Month() {
  let today = new Date();
  const last5Months = [];

  for (let i = 0; i < 5; i++) {
    // Pushing monthname to an array
    last5Months.push(monthNames[today.getMonth()].substring(0, 3));

    // Subtract 1 month from current month
    today.setMonth(today.getMonth() - 1);
  }

  return last5Months;
}

export function todayMinusWhat(daysBack) {
  const today = new Date();
  const pastDate = new Date(today.setDate(today.getDate() - daysBack));

  return pastDate;
}

/**
 * Initializes an array representing a star rating storage system.
 *
 * @returns {Array} An array of star objects with initial values.
 *
 * @example
 * const starStorage = initializeStarStorageArray();
 * // Returns:
 * // [
 * //   { name: '1 Star', value: 0 },
 * //   { name: '2 Star', value: 0 },
 * //   { name: '3 Star', value: 0 },
 * //   { name: '4 Star', value: 0 },
 * //   { name: '5 Star', value: 0 }
 * // ]
 */
export function initializeStarStorageArray() {
  return Array.from({ length: 5 }, (_, index) => {
    return { name: `${index + 1} Star`, value: 0 };
  });
}

/**
 * Date formater
 * @param date Javascript Date
 * @returns A formated date string eg: 12 November 2023
 */
export function formatDate(date) {
  const usableDate = new Date(date);

  const dateString = `${usableDate.getDate()} ${monthNames[
    usableDate.getMonth()
  ].substring(0, 3)} ${usableDate.getFullYear()}`;

  return dateString;
}
