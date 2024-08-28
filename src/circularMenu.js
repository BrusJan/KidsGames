function setPetalTop() {
  document.getElementById("flowerWrapper").classList = "flowerTop";
  document.getElementById("petal1").classList = "petal1top";
  document.getElementById("petal2").classList = "petal2top";
  document.getElementById("petal3").classList = "petal3top";
  document.getElementById("petal4").classList = "petal4top";
  document.getElementById("petal5").classList = "petal5top";  
}
function setPetalCircle() {
  document.getElementById("flowerWrapper").classList = "flowerCircle";
  document.getElementById("petal1").classList = "petal1circle";
  document.getElementById("petal2").classList = "petal2circle";
  document.getElementById("petal3").classList = "petal3circle";
  document.getElementById("petal4").classList = "petal4circle";
  document.getElementById("petal5").classList = "petal5circle"; 
}

window.onscroll = (event) => {
  let scroll = this.scrollY;
  console.log(scroll);
  let flowerElement = document.getElementById("flowerPositioner");

  if (scroll > flowerElement.offsetTop) {
    setPetalTop();
  } else {
    setPetalCircle();
  }
};
