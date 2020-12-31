const currentDate = () => {
    let date = new Date();
    let dateArray = date.toString().split(" ");
    let final = dateArray[2] + " " + dateArray[1] + ", " + dateArray[3];
    return final;
}

export {currentDate};