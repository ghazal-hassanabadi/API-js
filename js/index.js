const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const statusMessage = document.getElementById('statusMessage');
const weatherResult = document.getElementById('weatherResult');

searchBtn.addEventListener('click', function() {
  const city = cityInput.value;

    if (city === '') {
    return;
  }

  console.log(city);
});