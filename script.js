// weather of default city

async function fetchData(city = 'Delhi') {
    const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${encodeURIComponent(city)}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2ebaf74ddfmsh38c6dea5d2eb7cdp10baebjsn2ca7beb9400f',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);

        if (response.status === 429) {
            const retryAfter = response.headers.get('Retry-After');
            console.log(`Rate limited. Retry after ${retryAfter} seconds.`);
            // Implement delay or other strategies here
        } else {
            const result = await response.json(); // Parse JSON from response text
            console.log(result);

            // Update HTML elements
            document.getElementById('cityName').innerHTML = city;
            document.getElementById('temp').innerHTML = result.temp;
            document.getElementById('feels_like').innerHTML = result.feels_like;
            document.getElementById('max_temp').innerHTML = result.max_temp;
            document.getElementById('min_temp').innerHTML = result.min_temp;
            document.getElementById('humidity').innerHTML = result.humidity;
            document.getElementById('humidity2').innerHTML = result.humidity;
            document.getElementById('Cloud_pct').innerHTML = result.cloud_pct;
            document.getElementById('Wind_speed').innerHTML = result.wind_speed;
            document.getElementById('Wind_speed2').innerHTML = result.wind_speed;
            document.getElementById('Wind_degrees').innerHTML = result.wind_degrees;
            document.getElementById('Sunrise').innerHTML = result.sunrise;
            document.getElementById('Sunset').innerHTML = result.sunset;
        }
    } catch (error) {
        console.error(error);
    }
}

// Initial load with default city (Rudrapur)
fetchData();

// Function to handle user searches
function searchCity() {
    const cityInput = document.getElementById('cityInput').value.trim();

    // Check if the input is not empty
    if (cityInput !== '') {
        // Call fetchData with the user-entered city
        fetchData(cityInput);
    }
}



//-------------------------------------------------Card portion------------------------------------------------

// Function to fetch data for Most Searched Places
async function fetchCommonPlacesData() {
    const commonPlaces = ['California', 'Jakarta', 'New Orleans'];

    const commonPlacesData = [];

    // Fetch data for each place
    for (const place of commonPlaces) {
        const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${encodeURIComponent(place)}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '2ebaf74ddfmsh38c6dea5d2eb7cdp10baebjsn2ca7beb9400f',
                'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();

            commonPlacesData.push({
                place,
                weatherData: result
            });
        } catch (error) {
            console.error(`Error fetching data for ${place}:`, error);
        }
    }

    return commonPlacesData;
}

// Function to update HTML elements for Most Searched Places
async function updateCommonPlacesUI() {
    const commonPlacesData = await fetchCommonPlacesData();

    // Update content for each place
    for (const data of commonPlacesData) {
        // Update temperature content for each place
        document.getElementById(`${data.place}-temp`).innerHTML = data.weatherData.temp;
    }
}

// Initial load for Most Searched Places
updateCommonPlacesUI();





//----------------------------------------------------------------------------------------------


// Function to fetch data for Weather Across the World
async function fetchOtherCommonPlacesData() {
    const otherCommonPlaces = ['Tokyo', 'Bangalore', 'Sao Paulo', 'Mumbai', 'Shanghai', 'Los Angeles','Berlin','Mexico','Brazil','London','Paris','Bangkok','Japan','Korea'];

    const otherCommonPlacesData = [];

    // Fetch data for each place
    for (const place of otherCommonPlaces) {
        const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${encodeURIComponent(place)}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '2ebaf74ddfmsh38c6dea5d2eb7cdp10baebjsn2ca7beb9400f',
                'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();

            otherCommonPlacesData.push({
                place,
                weatherData: result
            });
        } catch (error) {
            console.error(`Error fetching data for ${place}:`, error);
        }
    }

    return otherCommonPlacesData;
}

// Function to update HTML elements for Weather Across the World table
async function updateOtherCommonPlacesTable() {
    const otherCommonPlacesData = await fetchOtherCommonPlacesData();

    // Update content for each place
    for (const data of otherCommonPlacesData) {
        // Get the existing table row element by place name
        const tableRowElement = document.getElementById(`row-${data.place}`);

        // Update content if the table row element exists
        if (tableRowElement) {
            tableRowElement.innerHTML = `
                <th scope="row" class="text-start">${data.place}</th>
                <td>${data.weatherData.cloud_pct}</td>
                <td>${data.weatherData.temp}</td>
                <td>${data.weatherData.humidity}</td>
                <td>${data.weatherData.min_temp}</td>
                <td>${data.weatherData.max_temp}</td>
                <td>${data.weatherData.wind_speed}</td>
                <td>${data.weatherData.wind_degrees}</td>
                <td>${data.weatherData.sunrise}</td>
                <td>${data.weatherData.sunset}</td>
            `;
        }
    }
}

// Initial load for Weather Across the World table
updateOtherCommonPlacesTable();










