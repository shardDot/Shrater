const input = document.querySelector('#city-input')
const mainInfo = document.querySelector('#main-info')

input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    mainInfo.style.opacity = 0
    fetch(
      `https://apis.scrimba.com/openweathermap/data/2.5/weather?q=${e.target.value}&units=metric`
    )
      .then(res => res.json())
      .then(data => {
        mainInfo.innerHTML = `
            <p id="location">${e.target.value}</p>
            <hr style="color: #2986e4" />
            <div class="temperature">
              <p id="temperature">${data.main.temp.toFixed(0)}°C</p>
              <div class="temp-info">
                <span id="temp-description">${data.weather[0].main}</span>
                <span id="temp-feels">
                  Feels like ${data.main.feels_like.toFixed(0)}°C
                </span>
              </div>
            </div> 
          `
        mainInfo.style.opacity = 1

        function formatTime(unix, timezone, locale = 'pt-BR') {
          return new Date((unix + timezone) * 1000).toLocaleTimeString(locale, {
            hour: '2-digit',
            minute: '2-digit',
          })
        }

        document.querySelector('#local-time').textContent = formatTime(
          data.dt,
          data.timezone
        )
      })
  }
})
