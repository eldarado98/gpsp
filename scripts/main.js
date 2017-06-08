// toggle nav button
(function () {
  function toggle(event) {
    var classList = event.currentTarget.classList;
    classList[classList.contains('nav-hidden') ? 'remove' : 'add']('nav-hidden');
  }
  document.getElementsByClassName('nav-trigger')[0].addEventListener('click', toggle);
})();

// sliders
(function () {
  function Slider(el) {
    this.currentIndex = 0;
    this.prevIndex = 0;
    this.timeout = null;
    this.el = el;
    this.elSlides = el.getElementsByClassName('slider-slides')[0];
    this.slides = Array.prototype.slice.call(this.elSlides.getElementsByClassName('slider-slide'));
    this.elPrev = el.getElementsByClassName('slider-prev')[0];
    this.elNext = el.getElementsByClassName('slider-next')[0];
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.clearPrev = this.clearPrev.bind(this);
    this.elPrev.addEventListener('click', this.prev);
    this.elNext.addEventListener('click', this.next);
  }

  Slider.prototype.prev = function () {
    this.setSlide(this.currentIndex - 1);
  };

  Slider.prototype.next = function () {
    this.setSlide(this.currentIndex + 1);
  };

  Slider.prototype.clearPrev = function () {
    this.slides[this.prevIndex].classList.remove('prev');
  };

  Slider.prototype.setSlide = function (index) {
    window.clearTimeout(this.timeout);
    if (index >= this.slides.length) {
      index = 0;
    }
    if (index < 0) {
      index = this.slides.length - 1;
    }
    if (index !== this.currentIndex) {
      this.slides[this.prevIndex].classList.remove('prev');
      this.slides[this.currentIndex].classList.add('prev');
      this.slides[this.currentIndex].classList.remove('active');
      this.prevIndex = this.currentIndex;
      this.currentIndex = index;
      this.slides[this.currentIndex].classList.add('active');
      this.timeout = window.setTimeout(this.clearPrev, 300);
    }
  };

  var sliders = document.getElementsByClassName('slider');
  for (var i = 0; i < sliders.length; i++) {
    new Slider(sliders[i]);
  }
})();

// show more buttons
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
    this.setSlide = this.setSlide.bind(this);
    this.elControls.addEventListener('click', this.setSlide);
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
        modal.setAttribute('aria-hidden', 'false');
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
      modal.setAttribute('aria-hidden', 'true');
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

// map
function initMap() {
  var center = { lat: 52.8973962, lng: 24.8398293 };
  var map = new google.maps.Map(document.getElementById('map'), {
    // https://developers.google.com/maps/documentation/javascript/reference?csw=1#MapOptions
    zoom: 12,
    center: center,
    mapTypeControl: false,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    },
    scaleControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    scrollwheel: false
  });
  var marker = new google.maps.Marker({
    // https://developers.google.com/maps/documentation/javascript/reference?csw=1#MarkerOptions
    position: center,
    map: map
  });

  if (window.innerWidth >= 1200) {
    map.panBy(400, 0);
  }
}

// gallery
(function () {
  function Gallery(el) {
    this.el = el;
    this.elSlides = el.getElementsByClassName('gallery-slides')[0];
    this.slides = Array.prototype.slice.call(this.elSlides.getElementsByClassName('gallery-slide'));
    this.images = [];
    this.elPrev = el.getElementsByClassName('gallery-prev')[0];
    this.elNext = el.getElementsByClassName('gallery-next')[0];
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.open = this.open.bind(this);
    this.getBounds = this.getBounds.bind(this);
    this.elPrev.addEventListener('click', this.prev);
    this.elNext.addEventListener('click', this.next);
    this.elSlides.addEventListener('click', this.open);
    el.parentNode.getElementsByClassName('projects-prev')[0].addEventListener('click', this.prev);
    el.parentNode.getElementsByClassName('projects-next')[0].addEventListener('click', this.next);
  }

  Gallery.prototype.prev = function () {
    var slide = this.slides[this.slides.length - 1];
    this.slides.pop();
    this.slides.unshift(slide);
    slide.parentNode.insertBefore(slide, slide.parentNode.firstChild);
  };

  Gallery.prototype.next = function () {
    var slide = this.slides[0];
    this.slides.shift();
    this.slides.push(slide);
    slide.parentNode.appendChild(slide);
  };

  Gallery.prototype.open = function (event) {
    if (event.target.tagName !== 'IMG') return;
    if (event.target.parentNode.previousElementSibling) return;
    this.images = Array.prototype.slice.call(event.target.parentNode.children);
    var index = this.images.indexOf(event.target);
    if (index === -1) return;

    var gallery = new PhotoSwipe(
      document.getElementsByClassName('pswp')[0],
      PhotoSwipeUI_Default,
      this.images.map(function (image) {
        return {
          msrc: image.src,
          src: image.src,
          w: image.getAttribute('width'),
          h: image.getAttribute('height')
        };
      }),
      {
        // http://photoswipe.com/documentation/options.html
        index: index,
        getThumbBoundsFn: this.getBounds,
        showHideOpacity: true,
        history: false,
        captionEl: false,
        fullscreenEl: false,
        shareEl: false
      }
    );
    gallery.init();
  };

  Gallery.prototype.getBounds = function (index) {
    var rect = this.images[index].getBoundingClientRect();
    return { x: rect.left, y: rect.top + window.pageYOffset, w: rect.width};
  };

  var gallery = document.getElementsByClassName('gallery');
  for (var i = 0; i < gallery.length; i++) {
    new Gallery(gallery[i]);
  }
})();

// smooth scroll
(function () {
  if ('scrollBehavior' in document.documentElement.style) return;
  window.addEventListener('click', function (event) {
    if (event.target.tagName !== 'A') return;
    var href = event.target.getAttribute('href');
    if (href.charAt(0) !== '#') return;
    var target = document.getElementById(href.substr(1));
    if (!target) return;
    event.preventDefault();
    var rect = target.getBoundingClientRect();
    if ('history' in window) {
      window.history.replaceState(undefined, undefined, href);
    }
    window.scroll({ top: window.pageYOffset + rect.top, left: 0, behavior: 'smooth' });
  });
})();
