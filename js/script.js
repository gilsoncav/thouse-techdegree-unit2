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
  if (list && list.length > 0) {
    const lastPage = page === totalPages(list);
    const startIndex = kNumberItemsPerPage * (page - 1);
    let endIndex = !lastPage
      ? startIndex + kNumberItemsPerPage - 1
      : startIndex + (list.length % kNumberItemsPerPage) - 1;

    for (let i = startIndex; i <= endIndex; i++) {
      list[i].style.display = '';
    }
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
function totalPages(list) {
  return Math.ceil(list.length / kNumberItemsPerPage);
}

/**
 * Generates the bottom screen element that allows the user to choose wich page
 * to display
 *
 * @param {Array<HTMLLIElement>} list The list of students to be used
 */
function appendPageLinks(list) {
  let existingPageLinks = document.querySelector('.pagination');
  if (existingPageLinks)
    document.querySelector('.page').removeChild(existingPageLinks);

  if (list && list.length > 0) {
    // creating the containers tags...
    const divPagination = document.createElement('div');
    divPagination.className = 'pagination';
    const ulPagesButtons = document.createElement('ul');
    divPagination.appendChild(ulPagesButtons);

    // creating the pages buttons...
    for (let i = 0; i < totalPages(list); i++) {
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
        showPage(list, parseInt(e.target.textContent));
      }
    });
    const pNotFound = document.querySelector('.js-not-found');
    if (pNotFound) pNotFound.parentNode.removeChild(pNotFound);
  } else {
    //TODO add a refined treatment when nothing was found
    let pNotFound = document.createElement('p');
    pNotFound.className = 'js-not-found';
    pNotFound.textContent = 'No students found!  :(';
    document.querySelector('.page').appendChild(pNotFound);
  }
}

/**
 * Append search components on the screen
 */
function appendSearch() {
  // gets the target DIV
  const divPageHeader = document.querySelector('.page-header');

  // Creates a new DIV
  const divStudentSearch = document.createElement('div');
  divStudentSearch.className = 'student-search';

  // Creates the INPUT tag
  const inputTag = document.createElement('input');
  inputTag.placeholder = 'Search for students...';
  divStudentSearch.appendChild(inputTag);

  // Creates the search BUTTON
  const btnSearch = document.createElement('button');
  btnSearch.textContent = 'Search';
  divStudentSearch.appendChild(btnSearch);
  divPageHeader.appendChild(divStudentSearch);

  // Add listener for the user typing...
  inputTag.addEventListener('keyup', e => filterStudentsByName(inputTag.value));
  // add listener for the button click
  btnSearch.addEventListener('click', e =>
    filterStudentsByName(inputTag.value)
  );
}

/**
 * Filter the original array of students items on the screen using a
 * screen to match
 *
 * @param {string} nameSearched the name to match against the students names
 */
function filterStudentsByName(nameSearched) {
  if (nameSearched && nameSearched !== '') {
    resetOriginalH3HTML();
    // filter by the H3 tag content
    const filteredStudents = studentListItems.filter(li => {
      const studentName = li.querySelector('h3').textContent;
      const contains =
        studentName.search(new RegExp(`${nameSearched}+`, 'i')) !== -1;

      return contains;
    });

    showPage(filteredStudents, 1);
    applySearchedHighlight(nameSearched);
    appendPageLinks(filteredStudents);
  } else {
    resetOriginalH3HTML();
    showPage(studentListItems, 1);
    appendPageLinks(studentListItems);
  }
}

/**
 * Function to clean the H3 objects that contains the name of the students
 * the highlight function turn the H3 objects "dirty" editing their innerHTML
 * property.
 * So this function uses my custom property originalHTML (if it exists) to save
 * and restore the innerHTML state of the H3 object
 */
function resetOriginalH3HTML() {
  studentListItems.forEach(li => {
    const h3 = li.querySelector('h3');
    if (h3.originalHTML) h3.innerHTML = h3.originalHTML;
  });
}

function applySearchedHighlight(nameSearched) {
  const allH3 = Array.from(document.querySelectorAll('h3'));
  allH3.forEach(h3 => {
    currentInnerHTML = h3.innerHTML;
    // saves in the H3 object the original HTML to "clean" it later
    h3.originalHTML = currentInnerHTML;
    h3.innerHTML = currentInnerHTML.replace(
      new RegExp(`${nameSearched}+`, 'i'),
      `<span class="highlight">${nameSearched}</span>`
    );
  });
}

// By default at the first load of the script, show the first page
showPage(studentListItems, 1);
appendPageLinks(studentListItems);
appendSearch();
