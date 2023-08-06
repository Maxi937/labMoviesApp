import truncate from "lodash/truncate";
import moment from "moment";

export function excerpt(string) {
  return truncate(string, {    
    length: 400, // maximum 400 characters
    separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
  });
}

export function formatDate(date, format) {
  return moment(date).format(format)
}