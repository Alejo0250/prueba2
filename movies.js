let peliculasData = [];

async function cargarPeliculas() {
  const response = await fetch("moviesdb.json");
  peliculasData = await response.json();
  mostrarPeliculas(peliculasData);
}

function mostrarPeliculas(peliculas) {
  const movieGrid = document.querySelector(".movie-grid");
  movieGrid.innerHTML = "";
  peliculas.forEach((pelicula) => {
    const movieItem = document.createElement("div");
    movieItem.className = "movie-item";

    movieItem.style.cursor = "pointer";
    movieItem.setAttribute("data-movie-id", pelicula.id);

    movieItem.innerHTML = `
      <img src="${pelicula.imagen}" alt="${pelicula.title}" />
      <div class="movie-info">
        <h3>${pelicula.nombre}</h3>
        <p>${pelicula.ciudad}</p>
        <div class="movie-details">
          <span class="categoria">⭐ ${pelicula.categoria}</span>
          <span class="precio_actual">⭐ ${pelicula.precio_actual}</span>
          <span class="precio_anterior"> ${pelicula.precio_anterior}</span>
        </div>
      </div>
    `;

    movieItem.addEventListener("click", () => {
      mostrarDetallesPelicula(pelicula.id);
    });

    movieGrid.appendChild(movieItem);
  });
}

function mostrarDetallesPelicula(peliculaId) {
  const pelicula = peliculasData.find((p) => p.id === peliculaId);

  // Rellenar el modal con los datos de la película

  document.getElementById("modalCiudad").textContent = pelicula.ciudad;
  document.getElementById("modalCategoria").textContent = pelicula.categoria;
  document.getElementById("modalPrecioActual").textContent =
    pelicula.precio_actual;
  document.getElementById("modalPrecioAnterior").textContent =
    pelicula.precio_anterior;

  // Mostrar el reparto
  const castContainer = document.getElementById("modalArea");
  castContainer.innerHTML = "";
  pelicula.cast.forEach((area) => {
    const castSpan = document.createElement("span");
    castSpan.className = "cast-member";
    castSpan.textContent = area;
    castContainer.appendChild(castSpan);
  });

  // Mostrar el modal
  document.getElementById("movieModal").classList.remove("hidden");
  document.body.style.overflow = "hidden"; // Prevenir scroll del body
}

// Función para cerrar el modal
function cerrarModal() {
  document.getElementById("movieModal").classList.add("hidden");
  document.body.style.overflow = "auto"; // Restaurar scroll del body
}

document.addEventListener("DOMContentLoaded", function () {
  // Cargar películas
  cargarPeliculas();

  // Evento para cerrar el modal al hacer clic en el botón de cerrar
  document.querySelector(".close-btn").addEventListener("click", cerrarModal);

  // Opcional: cerrar el modal al hacer clic fuera del contenido
  document.getElementById("movieModal").addEventListener("click", function (e) {
    if (e.target === this) {
      cerrarModal();
    }
  });
});
