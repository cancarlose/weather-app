// Estado
let currCity = "London"
let units = "metric"

// Seletores
let city = document.querySelector(".weather_city")
let datetime = document.querySelector(".weather_datetime")
let weather_forecast = document.querySelector(".weather_forecast")
let weather_temperature = document.querySelector(".weather_temperature")
let weather_icon = document.querySelector(".weather_icon")
let weather_minmax = document.querySelector(".weather_minmax")
let weather_realfeel = document.querySelector(".weather_realfeel")
let weather_humidity = document.querySelector(".weather_humiduty")
let weather_wind = document.querySelector(".weather_wind")
let weather_pressure = document.querySelector(".weather_pressure")

// Procura
document.querySelector(".weather_search").addEventListener('Submit', e => {
    let search = document.querySelector(".weather_searchform")
    // Evitar ação padrão
    e.preventDefault()
    // Mudar a cidade
    currCity = search.value
    // Obter previsão do tempo
    getWeather()
    // Limpar form
    search.value = ""
})

// Unidades
document.querySelector(".weather_unit_celsius").addEventListener('click', () => {
    if(units !== "metric"){
        // muda para métrica
        units = "metric"
        // Obter previsão de tempo
        getWeather()
    }
})

document.querySelector(".weather_unit_farenheit").addEventListener('click', () => {
    if(units !== "imperial"){
        // muda para imperial
        units = "imperial"
        // Obter previsão do tempo
        getWeather()
    }
})

function convertTimeStamp(timestamp, timezone) {
    const convertTimeStamp = timezone / 3600 // converte segundos em horas

    const date = new Date(timestamp = 1000)

    const options = {
        weekday : "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timezone: `Ete/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
        hour12: true,
    }
    return date.toLocaleString("pt-BR", options)
}

// Converter CEP em nome
function convertCountryCode(country){
    let regionNames = new Intl.DisplayNames(["BR"], {type: "region"})
    return regionNames.of(country)
}

function getWeather(){
    const API_KEY = 'Your_API_key'
    
    fetch(`https://api.openweather.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`).then(res => res.json()).then(data => {
        console.log(data)
        city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`
        datetime.innerHTML = convertTimeStamp (data.dt, data.timezone)
        weather_forecast.innerHTML = `<p>${data.weather[0].main}`
        weather_temperature.innerHTML = `${data.main.temp.toFixed()}&#176`
        weather_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`
        weather_minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p>
        <p>Max: ${data.main.temp_max.toFixed()}&#176</p>`
        weather_realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`
        weather_humidity.innerHTML = `${data.main.humidity}%`
        weather_wind.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph": "m/s"}`
        weather_pressure.innerHTML = `${data.main.pressure} hPa`
    })
}