// show more
(function () {
  function showMore(event) {
    event.preventDefault();
    const targets = document.querySelectorAll('.more-target.hidden');
    if (targets.length <= 1) {
      event.currentTarget.classList.add('hidden');
    }

    if (targets[0]) {
      targets[0].classList.remove('hidden');
    }
  }

  var triggers = document.getElementsByClassName('more-trigger');
  for (var i = 0; i < triggers.length; i++) {
    var trigger = triggers[i];
    trigger.addEventListener('click', showMore);
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
