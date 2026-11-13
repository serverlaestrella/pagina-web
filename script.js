const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Cerrar menú" : "Abrir menú",
    );
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
    });
  });
}

document.querySelectorAll(".service-link").forEach((link) => {
  link.addEventListener("click", () => {
    const serviceSelect = document.querySelector("#servicio");
    if (serviceSelect) {
      serviceSelect.value = link.dataset.service || "";
    }
  });
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// Envío estático vía FormSubmit (AJAX) para GitHub Pages
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector(".submit-button");
    if (submitBtn) submitBtn.disabled = true;
    formStatus.textContent = "Enviando tu consulta…";

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(
        "https://formsubmit.co/ajax/serverlaestrella@gmail.com",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        formStatus.textContent =
          "Consulta enviada con éxito. Te responderé a la brevedad.";
        contactForm.reset();
      } else {
        formStatus.textContent =
          "No se pudo enviar el mensaje. Por favor, escríbeme directo por WhatsApp.";
      }
    } catch (error) {
      formStatus.textContent =
        "Error de conexión al enviar. Inténtalo nuevamente o contáctame por WhatsApp.";
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}
