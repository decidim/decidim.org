function langToggle() {
  document.querySelector("body").classList.add("is-lang-active");
  function toggleLangClass(e){
    e.preventDefault();
    document.querySelector(".lang-wrapper").classList.toggle("is-lang-open");
  }

  function langToggleClickOut(e) {
		var targetElements,
				targetTriggers,
			i;

		if (!e.target.closest(".lang-wrapper")) {
			targetElements = document.querySelector(".lang-wrapper").classList.remove("is-lang-open");
		}
	}

  document.querySelector(".lang-trigger").addEventListener("click", toggleLangClass);
  document.querySelector("body").addEventListener("click", langToggleClickOut);

}

langToggle();
