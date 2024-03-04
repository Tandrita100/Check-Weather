// weather of default city

async function fetchData(city = 'Delhi') {
    const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${encodeURIComponent(city)}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'YOUR-API-KEY',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);

        if (response.status === 429) {
            const retryAfter = response.headers.get('Retry-After');
            console.log(`Rate limited. Retry after ${retryAfter} seconds.`);
            
        } else {
            const result = await response.json();
            console.log(result);

            // Update HTML elements if they exist
            const updateElement = (id, value) => {
                const element = document.getElementById(id);
                if (element) {
                    element.innerHTML = value;
                } else {
                    console.warn(`Element with ID '${id}' not found.`);
                }
            };

            updateElement('cityName', city);
            updateElement('temp', result.temp);
            updateElement('feels_like', result.feels_like);
            updateElement('max_temp', result.max_temp);
            updateElement('min_temp', result.min_temp);
            updateElement('humidity', result.humidity);
            updateElement('humidity2', result.humidity);
            updateElement('Cloud_pct', result.cloud_pct);
            updateElement('Wind_speed', result.wind_speed);
            updateElement('Wind_speed2', result.wind_speed);
            updateElement('Wind_degrees', result.wind_degrees);
            updateElement('Sunrise', result.sunrise);
            updateElement('Sunset', result.sunset);
        }
    } catch (error) {
        console.error(error);
    }
}

// Initial load with default city (Delhi)
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
                'X-RapidAPI-Key': 'YOUR-API-KEY',
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
                'X-RapidAPI-Key': 'YOUR-API-KEY',
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










