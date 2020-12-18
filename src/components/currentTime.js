let date = new Date();
let dateArray = date.toString().split(" ");
let currentDate = dateArray[2] + " " + dateArray[1] + ", " + dateArray[3];

export {date, dateArray, currentDate};