
// Modal dinámico en services.html
const modal = document.getElementById('modalDetalle');
if (modal){
  modal.addEventListener('show.bs.modal', e => {
    const btn = e.relatedTarget;
    if(!btn) return;
    modal.querySelector('#modalTitle').textContent = btn.getAttribute('data-title');
    modal.querySelector('#modalPrice').textContent = btn.getAttribute('data-price');
  });
}

// Toast global
const toastTrigger = document.getElementById('toastBtn');
const toastLive = document.getElementById('liveToast');
if (toastTrigger && toastLive) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);
  toastTrigger.addEventListener('click', () => toastBootstrap.show());
}

// Validación Bootstrap para formulario
(() => {
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  const modalEl = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  if (!modalEl || !lightboxImage) return;
  const bsModal = new bootstrap.Modal(modalEl);

  document.querySelectorAll('.card-img-top').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      const full = img.getAttribute('data-full') || img.getAttribute('src');
      const alt = img.getAttribute('alt') || (img.closest('.card')?.querySelector('.card-title')?.textContent ?? '');
      lightboxImage.src = full;
      lightboxImage.alt = alt;
      lightboxCaption.textContent = alt;
      bsModal.show();
    });
  });

  modalEl.addEventListener('hidden.bs.modal', () => {
    lightboxImage.src = '';
  });
});
