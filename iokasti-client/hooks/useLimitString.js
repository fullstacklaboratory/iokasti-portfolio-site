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
