document.querySelectorAll(".carousel").forEach(carousel => {
  const items = carousel.querySelectorAll(".carousel__item");
  const buttonsHTML = Array.from(items, () => {
    return `<span class="carousel__button"></span>`;
  });

  carousel.insertAdjacentHTML("beforeend", `
    <div class="carousel__nav">
      ${ buttonsHTML.join("") }
    </div>
  `);

  const buttons = carousel.querySelectorAll(".carousel__button");
  buttons.forEach((button, i) => {
    button.addEventListener("click", function(e) {
      buttons.forEach(buttonEl => buttonEl.classList.remove("carousel__button--select"));
      this.classList.add("carousel__button--select");

      items.forEach(itemEl => itemEl.classList.remove("carousel__item--select"));
      items[i].classList.add("carousel__item--select");
    });
  });
});