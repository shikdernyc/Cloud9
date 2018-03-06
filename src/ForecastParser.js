module.exports = {
    /**
     * Get the current data from JSONData
     * @param JSONCurrently - Forecast.io JSON Currently Data
     * @returns {{summary: *|string, icon: *, temperature: *, apparentTemperature: *, humidity: *, pressure: *|number, windSpeed: *, uvIndex: *, visibility: *}}
     */
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

    /**
     * Get the hourly data from JSON Data
     * @param JSONData - Forecast.io JSON Hourly Data
     * @param numOfHours - The Number of hours data being received for
     * @returns {Array} - Hours with their time, icon and temp
     */
    hourlyData: function(JSONData, numOfHours){
        let hours = [];
        for(let hr = 0 ; hr < numOfHours ; hr++){
            let hrData = JSONData.data[hr];
            hours.push(new HourForecast(getTime(hrData.time).hour, hrData.icon, hrData.temperature));
        }
        return hours;
    },

    /**
     * Get Weather data for multiple days
     * @param JSONData - Forecast.io JSON Hourly Data
     * @param numOfDays - Number of Days being retrieved
     * @returns {Array} - Days with their name, icon, high and low temperature
     */
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
};

/**
 * Day Object
 * @param day - Name of the day
 * @param icon - Day's Weather Icon
 * @param low - Low Temp
 * @param high - High temp
 */
let dayForecast = function(day, icon, low, high)
{
    this.day = day;
    this.icon = getIconLocation(icon);
    this.low = low;
    this.high = high;
};

/**
 * Hour Object
 * @param time - Time of day
 * @param icon - Weather Icon
 * @param temperature - Hour's Temperature
 */
let HourForecast = function (time, icon, temperature) {
    this.time = time;
    this.icon = getIconLocation(icon);
    this.temperature = temperature;
};

/**
 * Returns Day from unix time day
 * @param day
 * @returns {*}
 */
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
};

/**
 * Get Day and Hour time from Unix Timestamp
 * @param timeStamp - Unix Time Stamp
 * @returns {{day: *, hour: string}}
 */
const getTime = function(timeStamp) {
    let date = new Date(timeStamp * 1000);
    let day = formattedDay(date.getDay());
    let hour = (date.getHours() === 12 ? 12 : date.getHours() % 12) + " " + (parseInt(date.getHours() / 12) === 1 ? "PM" : "AM");
    return {
        day: day,
        hour: hour
    }
};

/**
 * Get Weather Icon location from the img file
 * @param icon - Forecast.io icon
 * @returns {string} - Location of Icon
 */
const getIconLocation = function(icon)
{
    let location = '../img/icon/';
    return location += icon + '.png';
};