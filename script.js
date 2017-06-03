// show more
(function () {
  function showMore(event) {
    event.preventDefault();
    var trigger = event.currentTarget;
    var selector = trigger.getAttribute('data-target');
    var targets = document.querySelectorAll(selector);

    var max = parseInt(trigger.getAttribute('data-count'), 10) || 1;
    var len = targets.length;
    if (len > max) {
      len = max;
    } else {
      trigger.classList.add('hidden');
    }

    for (var i = 0; i < len; i++) {
      targets[i].classList.remove('hidden');
    }
  }

  var triggers = document.getElementsByClassName('more-trigger');
  for (var i = 0; i < triggers.length; i++) {
    var trigger = triggers[i];
    trigger.addEventListener('click', showMore);
  }
})();

// carousels
(function () {
  function Carousel(el) {
    this.currentIndex = 0;
    this.el = el;
    this.elSlides = el.getElementsByClassName('carousel-slides')[0];
    this.slides = Array.prototype.slice.call(this.elSlides.getElementsByClassName('carousel-slide'));
    this.elControls = el.getElementsByClassName('carousel-controls')[0];
    this.controls = Array.prototype.slice.call(this.elControls.getElementsByClassName('carousel-control'));
    this.elControls.addEventListener('click', this.setSlide.bind(this));
  }

  Carousel.prototype.setSlide = function (event) {
    var index = this.controls.indexOf(event.target);
    if (index === -1) return;
    if (index !== this.currentIndex) {
      this.controls[this.currentIndex].classList.remove('active');
      this.controls[index].classList.add('active');
      this.currentIndex = index;
      for (var i = 0; i < this.slides.length; i++) {
        this.slides[i].style.transform = 'translateX(-' + (index * 100) + '%)';
      }
    }
  };

  var carousels = document.getElementsByClassName('carousel');
  for (var i = 0; i < carousels.length; i++) {
    new Carousel(carousels[i]);
  }
})();

// modals
(function () {
  function openModal(event) {
    event.preventDefault();
    var target = event.currentTarget.getAttribute('data-target');
    if (target) {
      var modal = document.getElementById(target);
      if (modal) {
        modal.classList.remove('hidden');
        modal.focus();
      }
    }
  }

  function closeModal(event) {
    var target = event.target;
    var modal = event.currentTarget;
    if (target === modal ||
      target.classList.contains('modal-container') ||
      target.classList.contains('modal-content') ||
      target.classList.contains('modal-close')) {
      event.preventDefault();
      modal.classList.add('hidden');
      var trigger = document.querySelector('.modal-trigger[data-target=' + modal.id + ']');
      if (trigger) {
        trigger.focus();
      }
    }
  }

  function keyDown(event) {
    if (event.keyCode === 13 /* Enter */ ||
      event.keyCode === 27 /* Escape */ ||
      event.keyCode === 32 /* Space */) {
      closeModal(event);
    }
  }

  var triggers = document.getElementsByClassName('modal-trigger');
  for (var i = 0; i < triggers.length; i++) {
    var trigger = triggers[i];
    trigger.addEventListener('click', openModal);
  }

  var modals = document.getElementsByClassName('modal');
  for (var j = 0; j < modals.length; j++) {
    var modal = modals[j];
    modal.addEventListener('click', closeModal);
    modal.addEventListener('keydown', keyDown);
  }
})();
