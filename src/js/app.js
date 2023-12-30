document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  navegacionFija();
  crearGaleria();
  scrollNav();
}

function navegacionFija() {
  const barra = document.querySelector(".header");
  const sobreFestival = document.querySelector(".sobre-festival");
  const body = document.querySelector("body");

  window.addEventListener("scroll", function () {
    /*     console.log(sobreFestival.getBoundingClientRect()) //getBounding es un metodo de JS */

    if (sobreFestival.getBoundingClientRect().top < 0) {
      //Si en ese caso el header deja de verse, se imprime que el header ya se pasó 
      barra.classList.add("fijo"); //agregara la clase fijo en el elemento header
      body.classList.add("body-scroll"); //agregara la clase fijo en el elemento header
    } else {
      barra.classList.remove("fijo");
      body.classList.remove("body-scroll");
    }
  });
}

function scrollNav() {
  const enlaces = document.querySelectorAll(".navegacion-principal a");

  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", function (e) {
      e.preventDefault(); //Previene la accion por default que te lleve de golpe a una seccion

      /* console.log(e.target.attributes.href.value); */

      //Luego de prevenir la accion por default, configuramos un nuevo comportamiento para el scroll
      const seccionScroll = e.target.attributes.href.value;
      const seccion = document.querySelector(seccionScroll);

      seccion.scrollIntoView({ behavior: "smooth" }); //Definimos el comportamiento del scroll que es suave
    });
  });
}

function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");

  for (let i = 1; i <= 12; i++) {
    const foto = document.createElement("picture");
    foto.innerHTML = `
       <source srcset="build/img/thumb/${i}.avif" type="image/avif" />
       <source srcset="build/img/thumb/${i}.webp" type="image/webp" />
       <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen_galeria ${i}" />
    `;

    foto.onclick = function () {
      mostrarImagen(i);
    };

    galeria.appendChild(foto);
  }
}

function mostrarImagen(id) {
  const foto = document.createElement("picture");
  foto.innerHTML = `
     <source srcset="build/img/grande/${id}.avif" type="image/avif" />
     <source srcset="build/img/grande/${id}.webp" type="image/webp" />
     <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen_galeria ${id}" />
  `;

  //Crea el overlay o superposicion de una imagen a la pagina html
  const overlay = document.createElement("div"); //Hara que al dar click a la imagen, se muestre la foto seleccionada en el body
  overlay.appendChild(foto);
  overlay.classList.add("overlay");
  overlay.onclick = function () {
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");
    overlay.remove();
  }; 

  // Boton para cerrar la ventana modal
  const cerrarFoto = document.createElement("p");
  cerrarFoto.textContent = "X";
  cerrarFoto.classList.add("btn-cerrar");
  cerrarFoto.onclick = function () {
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");
    overlay.remove();
  };
  overlay.appendChild(cerrarFoto);

  //Añade al HTML
  const body = document.querySelector("body");
  body.appendChild(overlay);
  body.classList.add("fijar-body");
}
