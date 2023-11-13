import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector(".gallery");
const markup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`
  )
  .join("");
gallery.insertAdjacentHTML("beforeend", markup);

gallery.addEventListener("click", onGalleryItemClick);

function onGalleryItemClick(e) {
  e.preventDefault();
  const clickedImage = e.target;

  if (!clickedImage.classList.contains("gallery__image")) {
    return;
  }
  const largeImageURL = clickedImage.dataset.source;
  const instance = basicLightbox.create(`
      <img src="${largeImageURL}" alt="${clickedImage.alt}" />
    `);
  instance.show();

  document.addEventListener("keydown", onKeyPress);
  function onKeyPress(e) {
    if (e.code === "Escape") {
      instance.close();
      document.removeEventListener("keydown", onKeyPress);
    }
  }
}
