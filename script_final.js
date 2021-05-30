class Carousel extends HTMLElement {
  connectedCallback() {
    this.moveClass = '';
    this.items = this.querySelectorAll('.carousel li');
    this.carousel = this.querySelector('.carousel');
    this.nextButton = this.querySelector('.next');
    this.prevButton = this.querySelector('.prev');
    this.animationEndListener = this.handleAnimationEnd.bind(this);
    
    document.documentElement.style.setProperty('--num', this.items.length);
    this.carousel.addEventListener('animationend', this.animationEndListener);
    this.nextButton.addEventListener('click', () => this.setMoveClass('prev'));
    this.prevButton.addEventListener('click', () => this.setMoveClass('next'));
  }
  
  setMoveClass(classStr) {
    if(this.carousel.classList.contains(this.moveClass) && this.moveClass !== '') this.carousel.classList.remove(this.moveClass);
    this.moveClass = classStr;
    if(this.moveClass !== '') this.carousel.classList.add(this.moveClass);
  }
  
  setCarouselItems(copy) {
    this.items = copy;
    this.items.forEach(item => {
      this.carousel.append(item);
    });
    
  }
  handleAnimationEnd() {
    if(this.moveClass === 'prev'){
      this.shiftNext([...this.items]);
    }else if(this.moveClass === 'next'){
      this.shiftPrev([...this.items]);
    }
    this.setMoveClass('')
  }
  
  shiftPrev(copy) {
    let lastcard = copy.pop();
    copy.splice(0, 0, lastcard);
    this.setCarouselItems(copy);
  }
  
  shiftNext(copy) {
    let firstcard = copy.shift();
    copy.splice(copy.length, 0, firstcard);
    this.setCarouselItems(copy);
  }
}

customElements.define('simple-carousel', Carousel);