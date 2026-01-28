const nav = document.getElementById("main-nav");
const btn = document.querySelector(".nav-toggle");
const backdrop = document.querySelector(".nav-backdrop");
const readBtn = document.getElementById("read-btn");

const mqDesktop = window.matchMedia("(min-width: 1260px)");
const mqReadLabel = window.matchMedia("(min-width: 680px)");

function setOpen(open) {
  nav.hidden = !open;
  backdrop.hidden = !open;

  btn.setAttribute("aria-expanded", String(open));
  btn.classList.toggle("is-open", open);
}

function syncNav(e) {
  if (e.matches) {
    // Desktop: nav always visible, overlay/backdrop off
    nav.hidden = false;
    backdrop.hidden = true;

    btn.setAttribute("aria-expanded", "false");
    btn.classList.remove("is-open");
    return;
  }

  // Mobile: closed by default
  setOpen(false);
}

function syncRead(e) {
  readBtn.textContent = e.matches ? "Read more" : "Read";
}

// init
mqReadLabel.addEventListener("change", syncRead);
syncRead(mqReadLabel);

mqDesktop.addEventListener("change", syncNav);
syncNav(mqDesktop);

// toggle button
btn.addEventListener("click", () => {
  if (mqDesktop.matches) return;

  const isOpen = !nav.hidden;
  setOpen(!isOpen);
});


backdrop.addEventListener("click", () => {
  if (mqDesktop.matches) return;
  setOpen(false);
});


document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (mqDesktop.matches) return;
  if (nav.hidden) return;
  setOpen(false);
  btn.focus();
});
