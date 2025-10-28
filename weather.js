let input_value = document.getElementById("userInput");
let options = {
    method:"GET"
}
let apikey = "d7562e54cae35a46c05841c6f4f47ff2";
let cityName = document.getElementById("city_name");
let wind_speed = document.getElementById("wind");
let humidity = document.getElementById("humidity");
let temp = document.getElementById("temparature");
let weatherCondition = document.getElementById("weather_condition");
function displayDetails(responseText)
{
    cityName.textContent = responseText.name;
    wind_speed.textContent = "💨 " +responseText.wind.speed + "m/s WIND SPEED";
    humidity.textContent = "💧 " +responseText.main.humidity + "% HUMIDITY";
    temp.textContent = "🌡 " + Math.round(responseText.main.temp)+ " °C";
    weatherCondition.textContent = responseText.weather[0].description;
    console.log(responseText);

}
function getResult(city)
{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    fetch(url,options)
        .then(function(response)
        {
            return response.json();
        })
        .then(function(responseText)
        {
            if(responseText.cod === 200)
            {
                displayDetails(responseText);
            }
            else
            {
                cityName.textContent = "CITY NOT FOUND";
                wind_speed.textContent = "---";
                humidity.textContent = "---";
                temp.textContent = "---";
                weatherCondition.textContent = "---";

            }
        })
}
function showMsg(event)
{
    if(event.key==="Enter")
    {
        city = input_value.value;
        getResult(city);
    }
}
window.addEventListener("load",function()
{
    getResult(input_value.value);
})
input_value.addEventListener('keydown',showMsg);