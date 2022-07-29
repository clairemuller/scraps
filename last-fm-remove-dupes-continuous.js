(function() {
  var LAST_PAGE = parseInt(sessionStorage.getItem("LFpage")) || 1;

  function loadNextPage(current) {
    window.location.href = `/user/clarabell02/library?page=${current + 1}`;
  }

  setTimeout(() => {
    // check that the current page is +1 of the last page
    // if not, load the last page + 1
    if (!window.location.search) {
      // there's no ?page=
      console.log("LASTFM-SCRIPT no query param");
      loadNextPage(LAST_PAGE);
    } else {
      var currentPage = parseInt(window.location.search.split('=')[1]);

      if (!currentPage || isNaN(currentPage)) {
        console.log("LASTFM-SCRIPT NaN encountered or no currentPage");
        return;
      }

      if (currentPage - 1 != LAST_PAGE) {
        console.log("LASTFM-SCRIPT wrong page");
        loadNextPage(LAST_PAGE);
      }
    }

    console.log(`LASTFM-SCRIPT current page ${currentPage}`);

    var elements = Array.from(document.querySelectorAll('.js-focus-controls-container'));
    var count = 0;

    var names = elements.map(element => {
      var nameElement = element.querySelector('.chartlist-name');
      return nameElement && nameElement.textContent.replace(/\s+/g, ' ').trim();
    });

    names.forEach((name, i) => {
      if (name !== names[i + 1]) return;
      var deleteButton = elements[i].querySelector('[data-ajax-form-sets-state="deleted"]');
      if (deleteButton) deleteButton.click();
      count += 1;
    })

    if (count > 0) {
      var newCount = count + (parseInt(sessionStorage.getItem("duplicate_count")) || 0);
      sessionStorage.setItem("duplicate_count", newCount);

      console.log(`LASTFM-SCRIPT success, ${newCount} total removed, reloading`);
      location.reload();
    } else {
      console.log("LASTFM-SCRIPT success, next page");
      sessionStorage.setItem("LFpage", currentPage);
      loadNextPage(currentPage);
    }
  }, 4000);
})()
