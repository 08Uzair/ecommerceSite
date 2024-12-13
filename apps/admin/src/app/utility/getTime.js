export const getTime = (createdAt) => {
  const parsedDate = new Date(createdAt);
  const timeDifference = Date.now() - parsedDate;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  let formattedDate = "";

  if (timeDifference < minute) {
    formattedDate = "Just now";
  } else if (timeDifference < hour) {
    const minutesAgo = Math.floor(timeDifference / minute);
    formattedDate = `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
  } else if (timeDifference < day) {
    const hoursAgo = Math.floor(timeDifference / hour);
    formattedDate = `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
  } else if (timeDifference < week) {
    const daysAgo = Math.floor(timeDifference / day);
    formattedDate = `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
  } else if (timeDifference < month) {
    const weeksAgo = Math.floor(timeDifference / week);
    formattedDate = `${weeksAgo} week${weeksAgo > 1 ? "s" : ""} ago`;
  } else if (timeDifference < year) {
    const monthsAgo = Math.floor(timeDifference / month);
    formattedDate = `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
  } else {
    const yearsAgo = Math.floor(timeDifference / year);
    formattedDate = `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
  }

  return formattedDate;
};

export function convertToReadableDate(isoString) {
  // Parse the ISO string into a Date object
  const date = new Date(isoString);

  // Extract day, month, and year
  const day = String(date.getUTCDate()).padStart(2, "0"); // Ensure 2 digits
  const year = date.getUTCFullYear();

  // Array of month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[date.getUTCMonth()]; // Get month abbreviation

  // Return the formatted date
  return `${day} ${month} ${year}`;
}
