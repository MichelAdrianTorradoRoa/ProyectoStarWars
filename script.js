const apiBaseUrl = 'https://swapi.py4e.com/api/';
const filtrosSection = document.getElementById('filtros');
const resultadosSection = document.getElementById('resultados');
const buttons = {
    people: document.getElementById('people-btn'),
    planets: document.getElementById('planets-btn'),
    starships: document.getElementById('starships-btn'),
    vehicles: document.getElementById('vehicles-btn'),
    species: document.getElementById('species-btn'),
    films: document.getElementById('films-btn')
};

const fetchData = async (resource) => {
    try {
        const response = await fetch(`${apiBaseUrl}${resource}/`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const displayData = (data, resource) => {
    resultadosSection.innerHTML = '';
    data.results.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${item.name || item.title}</h3>
            <p><strong>ID:</strong> ${item.url.split('/').slice(-2, -1)}</p>
            <p><strong>Details:</strong> ${JSON.stringify(item).slice(0, 100)}...</p>
        `;
        resultadosSection.appendChild(card);
    });
};

const setupFilters = (data, resource) => {
    filtrosSection.innerHTML = '<h2>Filtros</h2>';
    
    switch(resource) {
        case 'people':
            const names = [...new Set(data.results.map(person => person.name))];
            names.forEach(name => {
                const filterOption = document.createElement('button');
                filterOption.textContent = name;
                filterOption.onclick = () => {
                    const filteredData = data.results.filter(person => person.name === name);
                    displayData({ results: filteredData }, resource);
                };
                filtrosSection.appendChild(filterOption);
            });
            break;
        
        case 'planets':
            const climates = [...new Set(data.results.map(planet => planet.climate))];
            climates.forEach(climate => {
                const filterOption = document.createElement('button');
                filterOption.textContent = climate;
                filterOption.onclick = () => {
                    const filteredData = data.results.filter(planet => planet.climate === climate);
                    displayData({ results: filteredData }, resource);
                };
                filtrosSection.appendChild(filterOption);
            });
            break;

        case 'starships':
            const models = [...new Set(data.results.map(starship => starship.model))];
            models.forEach(model => {
                const filterOption = document.createElement('button');
                filterOption.textContent = model || 'Unknown';
                filterOption.onclick = () => {
                    const filteredData = data.results.filter(starship => starship.model === model);
                    displayData({ results: filteredData }, resource);
                };
                filtrosSection.appendChild(filterOption);
            });
            break;

        case 'vehicles':
            const types = [...new Set(data.results.map(vehicle => vehicle.vehicle_class))];
            types.forEach(type => {
                const filterOption = document.createElement('button');
                filterOption.textContent = type || 'Unknown';
                filterOption.onclick = () => {
                    const filteredData = data.results.filter(vehicle => vehicle.vehicle_class === type);
                    displayData({ results: filteredData }, resource);
                };
                filtrosSection.appendChild(filterOption);
            });
            break;

        case 'species':
            const classifications = [...new Set(data.results.map(species => species.classification))];
            classifications.forEach(classification => {
                const filterOption = document.createElement('button');
                filterOption.textContent = classification || 'Unknown';
                filterOption.onclick = () => {
                    const filteredData = data.results.filter(species => species.classification === classification);
                    displayData({ results: filteredData }, resource);
                };
                filtrosSection.appendChild(filterOption);
            });
            break;

        case 'films':
            const titles = [...new Set(data.results.map(film => film.title))];
            titles.forEach(title => {
                const filterOption = document.createElement('button');
                filterOption.textContent = title;
                filterOption.onclick = () => {
                    const filteredData = data.results.filter(film => film.title === title);
                    displayData({ results: filteredData }, resource);
                };
                filtrosSection.appendChild(filterOption);
            });
            break;
    }
    
    filtrosSection.classList.remove('oculto');
};

const handleButtonClick = async (resource) => {
    const data = await fetchData(resource);
    displayData(data, resource);
    setupFilters(data, resource);
};

buttons.people.addEventListener('click', () => handleButtonClick('people'));
buttons.planets.addEventListener('click', () => handleButtonClick('planets'));
buttons.starships.addEventListener('click', () => handleButtonClick('starships'));
buttons.vehicles.addEventListener('click', () => handleButtonClick('vehicles'));
buttons.species.addEventListener('click', () => handleButtonClick('species'));
buttons.films.addEventListener('click', () => handleButtonClick('films'));
