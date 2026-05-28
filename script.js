const body = document.body;
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const revealItems = document.querySelectorAll(".reveal");
const year = document.querySelector("[data-year]");
const gallery = document.querySelector("[data-gallery]");
const dialog = document.querySelector("[data-dialog]");
const dialogImage = document.querySelector("[data-dialog-image]");
const dialogTitle = document.querySelector("[data-dialog-title]");
const dialogClose = document.querySelector("[data-dialog-close]");
const floatingWhatsapp = document.querySelector(".floating-whatsapp");
const finalCta = document.querySelector("#matricula");

if (year) {
  year.textContent = new Date().getFullYear();
}

const setMenuOpen = (open) => {
  menuToggle?.setAttribute("aria-expanded", String(open));
  nav?.classList.toggle("is-open", open);
  body.classList.toggle("menu-open", open);
};

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    setMenuOpen(false);
  }
});

const onScroll = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
  const finalCtaBox = finalCta?.getBoundingClientRect();
  const finalCtaVisible = finalCtaBox ? finalCtaBox.top < window.innerHeight && finalCtaBox.bottom > 0 : false;
  floatingWhatsapp?.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.7 && !finalCtaVisible);
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

gallery?.addEventListener("click", (event) => {
  const item = event.target instanceof Element ? event.target.closest(".gallery-item") : null;
  if (!(item instanceof HTMLButtonElement) || !dialog || !dialogImage || !dialogTitle) return;

  const src = item.dataset.img;
  const title = item.dataset.title || "Imagem do Centro de Formação Berbel";
  const img = item.querySelector("img");
  if (!src) return;

  dialogImage.src = src;
  dialogImage.alt = img?.getAttribute("alt") || title;
  dialogTitle.textContent = title;

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  }
});

dialogClose?.addEventListener("click", () => {
  dialog?.close();
});

dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});
