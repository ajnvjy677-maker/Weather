const weathericon = {
    '01d': 'fa-sun',
    '01n': 'fa-moon',
    '02d': 'fa-cloud-sun',
    '02n': 'fa-cloud-moon',
    '03d': 'fa-cloud',
    '03n': 'fa-cloud',
    '04d': 'fa-cloud',
    '04n': 'fa-cloud',
    '09d': 'fa-cloud-rain',
    '09n': 'fa-cloud-rain',
    '10d': 'fa-cloud-sun-rain',
    '10n': 'fa-cloud-moon-rain',
    '11d': 'fa-bolt',
    '11n': 'fa-bolt',
    '13d': 'fa-snowflake',
    '13n': 'fa-snowflake',
    '50d': 'fa-smog',
    '50n': 'fa-smog'
}
const loading = document.getElementById('loading')
const img = document.getElementById('image')
const btn = document.getElementById('btn')
const ico = document.getElementById('icon')
const error = document.getElementById('error')
const city = document.getElementById("input")


const display = (data) => {
    const temp = Math.round(data.main.temp)
    const icon = weathericon[data.weather[0].icon] || 'fa-sun'

    const hdt = Math.round(data.main.humidity)
    const ws = Math.round(data.wind.speed)

    document.getElementById('cityname').textContent = `${data.name}`
    document.getElementById('hum').textContent = `${hdt}%`
    document.getElementById('windSpeed').textContent = `${ws}km/h`

    document.getElementById('tempreture').textContent = `${temp}C`
    ico.classList = `fa-solid ${icon} text-9xl`

}



const getweatherdata = async () => {
    try {
        const city = document.getElementById("input").value
        loading.classList.remove("invisible")
        img.classList.add('invisible')
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=790d02c4de6e1df3e8047fd9a0587b4b&units=metric`)
        loading.classList.add("invisible")
        img.classList.remove('invisible')

        if (!response.ok) {
            throw new Error('City not found')
        }
        const data = await response.json()
        display(data)
    }
    catch (err) {
        img.classList.add('invisible')
        error.textContent = err.message === 'City not found ' ? ' City not found. try another city' : 'failed to fetch data , Refrech page and try again'
        error.classList.remove('invisible')
    }

}
city.addEventListener("click", (event) => {
    city.value= ""
    const icon = weathericon["02d"]
    document.getElementById('cityname').textContent = `--`
    document.getElementById('hum').textContent = `--%`
    document.getElementById('windSpeed').textContent = `--km/h`

    document.getElementById('tempreture').textContent = `--C`
    ico.classList = `fa-solid ${icon} text-9xl`
    
        });
