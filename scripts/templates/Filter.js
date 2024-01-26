export default class Filter {
  constructor (filterName, listToFilter, formTarget) {
    this.filterName = filterName;
    this.filterNameLower = filterName.toLowerCase();
    this.listToFilter = Array.from(listToFilter);
    this.formTarget = formTarget;
    this.displayMatches = this.displayMatches.bind(this);
  }

  createFilter () {
    const filterHTML =
    /* html */
    `
      <div id="${this.filterNameLower}-filter" class="rounded-xl font-manrope mr-16 relative">
        <label for="search-${this.filterNameLower}" class="flex justify-between bg-white p-3.5 w-full rounded-t-lg rounded-b-lg cursor-pointer">
          <span class="mr-24">${this.filterName}</span>
          <svg class="transition-all ease-in-out duration-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </label>
        <div id="${this.filterNameLower}-list" class="transition-opacity ease-in-out duration-200 opacity-0 bg-white absolute w-full rounded-b-lg px-3.5 cursor-pointer">
          <input type="text" class="p-2 block border-2 border-silver mb-3.5 w-full rounded" id="search-${this.filterNameLower}">
          <ul id="${this.filterNameLower}-suggestions" class="block h-48 overflow-y-scroll no-scrollbar pointer-events-none">
          </ul>
        </div>
      </div>
    `;

    this.formTarget.insertAdjacentHTML('beforeend', filterHTML);
    this.generateListToFilter();

    const filterLabel = document.querySelector(`#${this.filterNameLower}-filter label`);
    const filterChevron = document.querySelector(`#${this.filterNameLower}-filter svg`);
    const filterOptions = document.querySelector(`#${this.filterNameLower}-list`);
    const filterList = document.querySelector(`#${this.filterNameLower}-list ul`);
    const searchInput = document.querySelector(`#search-${this.filterNameLower}`);

    filterLabel.addEventListener('click', (e) => {
      filterOptions.classList.toggle('opacity-0');
      filterList.classList.toggle('pointer-events-none');
      filterLabel.classList.toggle('rounded-b-lg');
      filterChevron.classList.toggle('rotate-180');
    });

    searchInput.addEventListener('change', (e) => this.displayMatches(e));
    searchInput.addEventListener('keyup', (e) => this.displayMatches(e));
  }

  generateListToFilter (arrayToDisplay = this.listToFilter) {
    const suggestionList = document.querySelector(`#${this.filterNameLower}-suggestions`);
    const html = arrayToDisplay.map(function (item) {
      return /* html */`
      <li class="mb-3">${item}</li>
      `;
    }).join('');
    suggestionList.innerHTML = html;
  }

  findMatches (wordToMatch, list) {
    return list.filter(function (item) {
      const regex = new RegExp(wordToMatch, 'gi');
      return item.match(regex);
    });
  };

  displayMatches (e) {
    const list = this.listToFilter;
    const word = e.target.value;
    const matchArray = this.findMatches(word, list);
    this.generateListToFilter(matchArray);
  }
}
