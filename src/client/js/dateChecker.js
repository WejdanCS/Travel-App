var checkTripDate = (date) => {
    var parts = date.split('-');
    console.log(parts[0]);
    console.log(parts[1]);
    console.log(parts[2]);
    var tripDate = new Date(`${parts[0]}`, `${(parts[1] - 1)}`, `${parts[2]}`);
    var curr = new Date(); // get current date
    console.log(curr)
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));
    // var tripDate = new Date.parse(date);
    console.log(curr.getMonth() + 1)
    console.log(firstday.getDate())
    console.log(lastday.getDate())
    var inWeek = [firstday.getDate(), lastday.getDate()]
    console.log(firstday)
    console.log(tripDate)
    if (tripDate.getDate() >= firstday.getDate() & tripDate.getDate() <= lastday.getDate()) {
        // the trip date in the current week
        return true;

    } else {
        return false;
    }



}

export {
    checkTripDate
}