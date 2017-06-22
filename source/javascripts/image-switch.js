function imageSwitch(){
  var featureItem = document.querySelectorAll(".feature-item");
  if (!featureItem){
    return;
  }
  function changeImage(){
    var featureContainer = this.parentNode.parentNode,
        selectedImage = this.getAttribute("data-feature-image");
    featureContainer.querySelectorAll(".active").forEach(function(e){
      e.classList.remove("active");
    });
    this.classList.add("active");
    document.querySelector(selectedImage).classList.add("active");
  }

  featureItem.forEach(function(e){
    e.addEventListener("mouseover", changeImage);
  });
}

imageSwitch();
