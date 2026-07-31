
(() => {
  const body = document.body;
  const toggle = document.querySelector('.mobile-toggle');
  const sidebar = document.querySelector('.sidebar');
  const backToTop = document.querySelector('.back-to-top');

  const closeNav = () => {
    body.classList.remove('nav-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '<i class="bi bi-list" aria-hidden="true"></i>';
    }
  };

  if (toggle) {
    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const open = body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.innerHTML = open
        ? '<i class="bi bi-x-lg" aria-hidden="true"></i>'
        : '<i class="bi bi-list" aria-hidden="true"></i>';
    });
  }

  document.addEventListener('click', (event) => {
    if (body.classList.contains('nav-open') && sidebar && !sidebar.contains(event.target) && event.target !== toggle) {
      closeNav();
    }
  });

  document.querySelectorAll('.side-nav a[href^="#"]').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  const updateBackToTop = () => {
    if (!backToTop) return;
    backToTop.classList.toggle('show', window.scrollY > 500);
  };
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();

  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();

/* ==========================================================================
   LIGHTBOX DEL CASO DE ESTUDIO
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const dialog = document.querySelector("#project-lightbox");
  const triggers = document.querySelectorAll(".lightbox-trigger");

  if (!dialog || triggers.length === 0) {
    return;
  }

  const image = dialog.querySelector("#lightbox-image");
  const title = dialog.querySelector("#lightbox-title");
  const description = dialog.querySelector("#lightbox-description");
  const closeButton = dialog.querySelector(".lightbox-close");
  const previousButton = dialog.querySelector(".lightbox-previous");
  const nextButton = dialog.querySelector(".lightbox-next");

  const items = [
    {
      src: "https://res.cloudinary.com/arawato666/image/upload/v1785256643/uro_sat_r0kgag.png",
      alt: "Cartografía preliminar del Sistema de Alerta Temprana del río Milla",
      title: "Cartografía preliminar del SAT",
      description:
        "Integración de información territorial, ambiental e hidrológica de la microcuenca."
    },
    {
      src: "https://res.cloudinary.com/arawato666/image/upload/v1785507172/output_cars7j.png",
      alt: "Resultado gráfico preliminar del análisis hidrometeorológico",
      title: "Análisis hidrometeorológico",
      description:
        "Producto gráfico derivado del procesamiento y evaluación de las series meteorológicas disponibles."
    }
  ];

  let currentIndex = 0;
  let lastTrigger = null;

  const showItem = (index) => {
    currentIndex = (index + items.length) % items.length;

    const item = items[currentIndex];

    image.src = item.src;
    image.alt = item.alt;
    title.textContent = item.title;
    description.textContent = item.description;
  };

  const openLightbox = (index, trigger) => {
    lastTrigger = trigger;
    showItem(index);
    dialog.showModal();
    document.body.style.overflow = "hidden";
    closeButton.focus();
  };

  const closeLightbox = () => {
    dialog.close();
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const index = Number(trigger.dataset.lightboxIndex);

      if (Number.isInteger(index)) {
        openLightbox(index, trigger);
      }
    });
  });

  previousButton.addEventListener("click", () => {
    showItem(currentIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    showItem(currentIndex + 1);
  });

  closeButton.addEventListener("click", closeLightbox);

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      closeLightbox();
    }
  });

  dialog.addEventListener("close", () => {
    document.body.style.overflow = "";

    if (lastTrigger) {
      lastTrigger.focus();
    }
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      showItem(currentIndex - 1);
    }

    if (event.key === "ArrowRight") {
      showItem(currentIndex + 1);
    }
  });
});