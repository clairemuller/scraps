var elements = Array.from(document.querySelectorAll('.js-focus-controls-container'));

var names = elements.map(function (element) {
  var nameElement = element.querySelector('.chartlist-name');
  return nameElement && nameElement.textContent.replace(/\s+/g, ' ').trim();
})

names.forEach(function (name, i) {
  if (name !== names[i + 1]) return;
  var deleteButton = elements[i].querySelector('[data-ajax-form-sets-state="deleted"]');
  if (deleteButton) deleteButton.click();
})