export default class Filter {
  constructor (filterName, listToFilter, formTarget, dataFilter) {
    this.filterName = filterName;
    this.filterNameLower = filterName.toLowerCase();
    this.listToFilter = Array.from(listToFilter);
    this.formTarget = formTarget;
    this.displayMatches = this.displayMatches.bind(this);
    this.dataFilter = dataFilter;
  }

  createFilter () {
    const filterHTML =
    /* html */
    `
      <div id="${this.filterNameLower}-filter" class="w-full mb-4 lg:mb-0 rounded-xl font-manrope mr-16 relative">
        <label for="search-${this.filterNameLower}" class="flex justify-between bg-white p-3.5 w-full rounded-t-lg rounded-b-lg cursor-pointer">
          <span class="mr-24">${this.filterName}</span>
          <svg class="transition-all ease-in-out duration-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </label>
        <div id="${this.filterNameLower}-list" class="pointer-events-none transition-opacity ease-in-out duration-200 opacity-0 bg-white absolute w-full rounded-b-lg cursor-pointer z-10">
          <div class="px-3.5 relative">
            <input type="text" class="p-2 block border-2 border-silver px-3.5 w-full rounded mb-3" id="search-${this.filterNameLower}">
            <svg class="absolute right-5 top-1/2 -translate-y-1/2 stroke-silver" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <svg id="cleanSearch-${this.filterNameLower}" class="absolute right-10 top-1/2 -translate-y-1/2 stroke-slate-900" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </div>
          <ul id="${this.filterNameLower}-suggestions" class="block max-h-48 overflow-y-scroll no-scrollbar">
          </ul>
        </div>
      </div>
    `;

    this.formTarget.insertAdjacentHTML('afterbegin', filterHTML);
    this.generateListToFilter();

    const filterLabel = document.querySelector(`#${this.filterNameLower}-filter label`);
    const searchInput = document.querySelector(`#search-${this.filterNameLower}`);
    const cleanSearchBtn = document.querySelector(`#cleanSearch-${this.filterNameLower}`);

    filterLabel.addEventListener('click', (e) => this.toggleFilterDropdown(e));
    searchInput.addEventListener('change', (e) => this.displayMatches(e));
    searchInput.addEventListener('keyup', (e) => this.displayMatches(e));
    cleanSearchBtn.addEventListener('click', (e) => {
      if (searchInput.value === '') {
        this.toggleFilterDropdown();
      } else {
        this.generateListToFilter();
        searchInput.value = '';
      }
    });
  }

  toggleFilterDropdown () {
    const filterContainer = document.querySelector(`#${this.filterNameLower}-filter`);
    const filterLabel = document.querySelector(`#${this.filterNameLower}-filter label`);
    const filterChevron = document.querySelector(`#${this.filterNameLower}-filter svg`);
    const filterOptions = document.querySelector(`#${this.filterNameLower}-list`);
    const filterList = document.querySelector(`#${this.filterNameLower}-list`);

    filterOptions.classList.toggle('opacity-0');
    filterList.classList.toggle('pointer-events-none');
    filterLabel.classList.toggle('rounded-b-lg');
    filterChevron.classList.toggle('rotate-180');
    filterContainer.classList.toggle('isOpen');
  }

  generateListToFilter (arrayToDisplay = this.listToFilter) {
    const suggestionList = document.querySelector(`#${this.filterNameLower}-suggestions`);
    const html = arrayToDisplay.map(function (item) {
      return /* html */`
      <li class="suggestionItem p-3 cursor-pointer hover:bg-slate-900 hover:text-white">${item}</li>
      `;
    }).join('');
    suggestionList.innerHTML = html;
    const listItems = suggestionList.querySelectorAll('li');
    listItems.forEach(item => item.addEventListener('click', (e) => {
      this.updateDataFilter(item.textContent);
      this.toggleFilterDropdown(e);
    }));
  }

  findMatches (wordToMatch, list) {
    return list.filter(function (item) {
      const regex = new RegExp(wordToMatch, 'gi');
      return item.match(regex);
    });
  }

  displayMatches (e) {
    const list = this.listToFilter;
    const word = e.target.value;
    const matchArray = this.findMatches(word, list);
    this.generateListToFilter(matchArray);
  }

  updateDataFilter (tag) {
    switch (this.filterName) {
      case 'Ustensiles':
        this.dataFilter.ustensils = tag;
        this.dataFilter.getParseAndFilteredListBy('Ustensiles');
        break;
      case 'Appareils':
        this.dataFilter.appliances = tag;
        this.dataFilter.getParseAndFilteredListBy('Appareils');
        break;
      case 'Ingrédients':
        this.dataFilter.ingredients = tag;
        this.dataFilter.getParseAndFilteredListBy('Ingrédients');
        break;
      default:
        console.log('error');
    }

    this.dataFilter.displayTagFilter();
  }

  updateGenerateListToFilter (list) {
    this.generateListToFilter(list);
  }
}
