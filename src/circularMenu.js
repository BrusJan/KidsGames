function handleClick() {
  if (document.getElementsByClassName('petal1circle')[0]) {
    document.getElementsByClassName('petal1circle')[0].classList = 'petal1top';
    document.getElementsByClassName('petal2circle')[0].classList = 'petal2top';
    document.getElementsByClassName('petal3circle')[0].classList = 'petal3top';
    document.getElementsByClassName('petal4circle')[0].classList = 'petal4top';
    document.getElementsByClassName('petal5circle')[0].classList = 'petal5top';
  } else {
    document.getElementsByClassName('petal1top')[0].classList = 'petal1circle';
    document.getElementsByClassName('petal2top')[0].classList = 'petal2circle';
    document.getElementsByClassName('petal3top')[0].classList = 'petal3circle';
    document.getElementsByClassName('petal4top')[0].classList = 'petal4circle';
    document.getElementsByClassName('petal5top')[0].classList = 'petal5circle';
  }
}