module.exports = {
    currentData: function(JSONCurrently)
    {
        // console.log("Data Received")
        // console.dir(JSONCurrently);
        return{
            summary: JSONCurrently.summary,
            icon: JSONCurrently.icon,
            temperature: JSONCurrently.temperature,
            apparentTemperature: JSONCurrently.apparentTemperature,
            humidity: JSONCurrently.humidity,
            pressure: JSONCurrently.pressure,
            windSpeed: JSONCurrently.windSpeed,
            uvIndex: JSONCurrently.uvIndex,
            visibility: JSONCurrently.uvIndex
        }
    },

    getTime: function(timeStamp) {
        let date = new Date(timeStamp * 1000);
        let day = formattedDay(date.getDay());
        let apm = (parseInt(date.getHours() / 12) == 1 ? "PM" : "AM");
        let hour = (date.getHours() == 12 ? 12 : date.getHours() % 12) + " " + apm;
        return {
            day: day,
            hour: hour
        }
    }
}

let formattedDay = function formattedDay(day) {
    switch (day) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
    }
    return day;
}

    // module.exports = currentData;
// module.exports = getTIme;

// console.dir(getTime(1519587127));

// module.exports.time = time();