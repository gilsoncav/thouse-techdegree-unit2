/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination

******************************************/

/***
 * GLOBAL VARIABLES
 */

// Array containing all students list items
const studentListItems = Array.from(
  document.querySelector('.student-list').children
);
// Number of items to show in each page
const kNumberItemsPerPage = 10;

/**
 * Shows just a particular page of the student list paginated by
 * `kNumberItemsPerPage` items per page.
 *
 * @param {Array<HTMLLIElement>} list the array with all students lines
 * @param {number} page the number os the pagination to show
 */
function showPage(list, page) {
  hideAll();
  const lastPage = page === totalPages();
  const startIndex = kNumberItemsPerPage * (page - 1);
  let endIndex = !lastPage
    ? startIndex + kNumberItemsPerPage - 1
    : startIndex + (list.length % kNumberItemsPerPage) - 1;

  for (let i = startIndex; i <= endIndex; i++) {
    studentListItems[i].style.display = '';
  }
}

/**
 * A helper function to hide all students list items
 */
function hideAll() {
  studentListItems.forEach(li => (li.style.display = 'none'));
}

/**
 * A helper funtion to calculate the total number of pagination pages
 */
function totalPages() {
  return Math.ceil(studentListItems.length / kNumberItemsPerPage);
}

/**
 * Generates the bottom screen element that allows the user to choose wich page
 * to display
 */
function appendPageLinks() {
  // creating the containers tags...
  const divPagination = document.createElement('div');
  divPagination.className = 'pagination';
  const ulPagesButtons = document.createElement('ul');
  divPagination.appendChild(ulPagesButtons);

  // creating the pages buttons...
  for (let i = 0; i < totalPages(); i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = i + 1;
    if (i === 0) a.className = 'active';
    li.appendChild(a);
    ulPagesButtons.appendChild(li);
  }
  document.querySelector('.page').appendChild(divPagination);

  ulPagesButtons.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      const allLinks = Array.from(
        e.target.parentNode.parentNode.querySelectorAll('a')
      );
      allLinks.forEach(a => (a.className = ''));
      e.target.className = 'active';
      showPage(studentListItems, parseInt(e.target.textContent));
    }
  });
}

// By default at the first load of the script, show the first page
showPage(studentListItems, 1);
appendPageLinks();
