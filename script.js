
const inputCiudad = document.querySelector("#input-ciudad");
const botonBuscar = document.querySelector("#btn-buscar");

const spanCiudad = document.querySelector("#ciudad");
const spanTemperatura = document.querySelector("#temperatura");
const imgIcono = document.querySelector("#icono");
const spanDescripcion = document.querySelector("#descripcion");

const apiKey = "fdd533266e28101881f610f2b8f1ebe1";

function cargarCiudad() {
    const ciudad = inputCiudad.value.trim();

    if (ciudad === "") {
        alert("Por favor, escribí el nombre de una ciudad.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se encontró la ciudad");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            document.querySelector(".container").style.visibility = "visible";

            spanCiudad.textContent = data.name;

            const tempRedondeada = Math.round(data.main.temp);
            spanTemperatura.innerHTML = `${tempRedondeada} <sup>°C</sup>`;

            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            imgIcono.setAttribute("src", iconUrl);

            spanDescripcion.textContent = data.weather[0].description;
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Ciudad no encontrada o error en la conexión. Verificá el nombre.");
        });
}

botonBuscar.addEventListener("click", cargarCiudad);

inputCiudad.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        cargarCiudad();
    }
});