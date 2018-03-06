module.exports = {
    currentData: function(JSONCurrently)
    {
        return{
            summary: JSONCurrently.summary,
            icon: getIconLocation(JSONCurrently.icon),
            temperature: JSONCurrently.temperature,
            apparentTemperature: JSONCurrently.apparentTemperature,
            humidity: JSONCurrently.humidity,
            pressure: JSONCurrently.pressure,
            windSpeed: JSONCurrently.windSpeed,
            uvIndex: JSONCurrently.uvIndex,
            visibility: JSONCurrently.uvIndex
        }
    },

    hourlyData: function(JSONData, numOfHours){
        let hours = [];
        for(let hr = 0 ; hr < numOfHours ; hr++){
            let hrData = JSONData.data[hr];
            hours.push(new HourForecast(getTime(hrData.time).hour, hrData.icon, hrData.temperature));
        }
        return hours;
    },

    dailyData: function(JSONData, numOfDays)
    {
        let days = [];
        for(let day = 0 ; day < numOfDays ; day++)
        {
            let today = JSONData.data[day];
            days.push(new dayForecast(getTime(today.time).day, today.icon, today.temperatureLow, today.temperatureHigh));
        }

        return days;
    }
}

let dayForecast = function(day, icon, low, high)
{
    this.day = day;
    this.icon = getIconLocation(icon);
    this.low = low;
    this.high = high;
}

let HourForecast = function (time, icon, temperature) {
    this.time = time;
    this.icon = getIconLocation(icon);
    this.temperature = temperature;
}

const formattedDay = function formattedDay(day) {
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


const getTime = function(timeStamp) {
    let date = new Date(timeStamp * 1000);
    let day = formattedDay(date.getDay());
    let hour = (date.getHours() === 12 ? 12 : date.getHours() % 12) + " " + (parseInt(date.getHours() / 12) === 1 ? "PM" : "AM");
    return {
        day: day,
        hour: hour
    }
}

const getIconLocation = function(icon)
{
    let location = '../img/icon/';
    return location += icon + '.png';
};