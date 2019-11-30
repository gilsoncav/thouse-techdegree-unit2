/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

/*** 
  Add your global variables that store the DOM elements you will 
  need to reference and/or manipulate. 

  But be mindful of which variables should be global and which 
  should be locally scoped to one of the two main functions you're 
  going to create. A good general rule of thumb is if the variable 
  will only be used inside of a function, then it can be locally 
  scoped to that function.
***/
const studentListItems = Array.from(
  document.querySelector('.student-list').children
);
const kNumberItemsPerPage = 10;

/***  
  Create the `showPage` function to hide all of the items in the 
  list except for the ten you want to show.

  Pro Tips: 
    - Keep in mind that with a list of 54 students, the last page 
    will only display four.
    - Remember that the first student has an index of 0.
    - Remember that a function `parameter` goes in the parens when 
    you initially define the function, and it acts as a variable 
    or a placeholder to represent the actual function `argument` 
    that will be passed into the parens later when you call or 
    "invoke" the function 
***/
function showPage(list, page) {
  const lastPage = page === totalPages();
  const startIndex = kNumberItemsPerPage * (page - 1);
  let endIndex = !lastPage
    ? startIndex + kNumberItemsPerPage - 1
    : startIndex + (list.length % kNumberItemsPerPage) - 1;

  for (let i = startIndex; i <= endIndex; i++) {
    studentListItems[i].style.display = '';
  }
}

const hideAll = list => {
  list.forEach(li => (li.style.display = 'none'));
};

function totalPages() {
  return Math.ceil(studentListItems.length / kNumberItemsPerPage);
}

/*** 
  Create the `appendPageLinks function` to generate, append, and add 
  functionality to the pagination buttons.
***/

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
    }
  });
}

// Remember to delete the comments that came with this file, and replace them with your own code comments.

hideAll(studentListItems);
showPage(studentListItems, 6);
appendPageLinks();
