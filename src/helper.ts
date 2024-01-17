import moment from "moment";
const convertDateToDays = (givenDate: string) => {
  const today = moment();
  const someday = moment(givenDate);

  const diff = today.diff(someday, "days");

  if (diff >= 7 && diff < 30) {
    return `${diff / 7} ${diff > 1 ? "week" : "weeks"} ago`;
  }
  if (diff >= 30 && diff <= 364) {
    return `${diff / 30} ${diff > 1 ? "month" : "months"} ago`;
  }

  if (diff >= 365) {
    return `${diff / 365} ${diff > 1 ? "year" : "years"} ago`;
  }
  if (diff < 7 && diff >= 2) {
    return `${diff} ${!(diff > 1) ? "day" : "days"} ago`;
  }
  if (diff < 2) {
    if (diff == 0) {
      return `today`;
    }
    if (diff == 1) {
      return `yesterday`;
    }
  }
};

export default convertDateToDays;
