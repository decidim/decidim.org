function langToggle() {
  document.querySelector("body").classList.add("is-lang-active");
  function toggleLangClass(e){
    e.preventDefault();
    document.querySelector(".lang-wrapper").classList.toggle("is-lang-open");
  }
  document.querySelector(".lang-trigger").addEventListener("click", toggleLangClass);
}

langToggle();
