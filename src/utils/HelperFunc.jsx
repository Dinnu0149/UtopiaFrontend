import React from "react";

function HelperFunc() {
  return <div>HelperFunc</div>;
}

export default HelperFunc;

export const convertDate = (givenDateString) => {
  const givenDate = new Date(givenDateString);

  const currentDate = givenDate.toLocaleDateString("en-GB", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return currentDate;
};

export const convertTime = (givenDateString) => {
  const givenDate = new Date(givenDateString);

  const currentTime = givenDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return currentTime;
};

export const convertDateTime = (givenDateString) => {
  const givenDate = new Date(givenDateString);

  const currentDate = givenDate.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const currentTime = givenDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return `${currentDate} ${currentTime}`;
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();

  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const truncateSentence = (sentence = "", wordCount) => {
  const words = sentence.split(" ");

  if (words.length > wordCount) {
    return words.slice(0, wordCount).join(" ") + "...";
  } else {
    return sentence;
  }
};

export const getFirstCharacters = (sentence = "", num) => {
  if (typeof sentence !== "string" || typeof num !== "number" || num < 0) {
    return "Invalid input";
  }

  return sentence.slice(0, num);
};

export const formatCurrency = (decimalNumber, inFigure = false) => {
  if (typeof decimalNumber !== "number") {
    throw new Error("The first parameter must be a number.");
  }

  if (inFigure) {
    return decimalNumber.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } else {
    if (decimalNumber >= 1_000_000) {
      return `${(decimalNumber / 1_000_000).toFixed(1).replace(/\.0$/, "")}m`;
    } else if (decimalNumber >= 1_000) {
      return `${(decimalNumber / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
    } else {
      return decimalNumber.toFixed(2);
    }
  }
};
