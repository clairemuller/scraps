function getArtist(el) {
  const artistElement = el.querySelector('.chartlist-artist');
  return artistElement && artistElement.textContent.replace(/\s+/g, ' ').trim();
}

function getTitle(el) {
  const nameElement = el.querySelector('.chartlist-name');
  return nameElement && nameElement.textContent.replace(/\s+/g, ' ').trim();
}

function deleteSong(el) {
  const deleteButton = el.querySelector('[data-ajax-form-sets-state="deleted"]');
  if (deleteButton) {
    deleteButton.click();
    return true;
  }
  return false;
}

const artistsToRemove = [
  'The NPR Politics Podcast',
  'NPR News Now',
  'Bachelor Party'
]

const elements = Array.from(document.querySelectorAll('.js-focus-controls-container'));
let count = 0;

elements.forEach((el, i) => {
  const artist = getArtist(el);

  if (artist && artistsToRemove.includes(artist)) {
    if (deleteSong(el)) {
      count += 1;
      return;
    }
  }

  const nextEl = elements[i+1];
  if (!nextEl) return;
  
  const title = getTitle(el);
  const nextTitle = getTitle(nextEl);
  if (title !== nextTitle) return;
  if (deleteSong(el)) count += 1;
})

console.log(count);
