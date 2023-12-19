/**
 * 
 * Accepts a string and a limit and returns a string with the limit of 
 * characters, and add '...' at the end if the string is longer than the limit.
 * Removes comma, if that would be the last character. 
 * 
 * */

export const useLimitString = (str, limit) => {
  if (str.length > limit) {
    let lastSpace = str.lastIndexOf(" ", limit);
    let limitedStr = str.substring(0, lastSpace);
    console.log(limitedStr);
    if (limitedStr.charAt(limitedStr.length - 1) === ",") {
      limitedStr = limitedStr.slice(0, -2);
    }
    return limitedStr + "...";
  } else {
    return str;
  }
};
