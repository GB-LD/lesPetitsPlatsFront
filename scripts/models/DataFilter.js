export default class DataFilter {
  constructor () {
    this._ingredients = [];
    this._appliances = [];
    this._ustensils = [];
    this._tagList = [];
  }

  get ingredients () {
    return this._ingredients;
  }

  set ingredients (value) {
    if (!this._ingredients.includes(value)) {
      this._ingredients.push(value);
    }
  }

  get appliances () {
    return this._appliances;
  }

  set appliances (value) {
    if (!this._appliances.includes(value)) {
      this._appliances.push(value);
    }
  }

  get ustensils () {
    return this._ustensils;
  }

  set ustensils (value) {
    if (!this._ustensils.includes(value)) {
      this._ustensils.push(value);
    }
  }

  updateTagList () {
    this._tagList = [...this._ingredients, ...this._appliances, ...this._ustensils];
  }

  createTagFilter () {
    const tagsHtml = this._tagList.map(item => {
      return /* html */`
    <li class="p-4 mt-6 rounded min-w-9 bg-tanoi mr-9">
      <span class="inline mr-9">${item}</span>
      <svg class="cleanTag inline cursor-pointer" id="${item.split(' ').join('-')}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </li>
    `;
    }).join('');

    const tagList = document.querySelector('#tag-list');
    tagList.innerHTML = tagsHtml;

    const cleanTags = document.querySelectorAll('.cleanTag');
    cleanTags.forEach(tag => tag.addEventListener('click', (e) => {
      const reverseTagIdFormat = tag.id.split('-').join(' ');
      this.removeTag(reverseTagIdFormat);
    }));
  }

  displayTagFilter () {
    this.updateTagList();
    this.createTagFilter();
  }

  removeTag (tag) {
    if (this._ingredients.includes(tag)) {
      this._ingredients = this._ingredients.filter(item => item !== tag);
    } else if (this._appliances.includes(tag)) {
      this._appliances = this._appliances.filter(item => item !== tag);
    } else if (this._ustensils.includes(tag)) {
      this._ustensils = this._ustensils.filter(item => item !== tag);
    };
    this.displayTagFilter();
  }
}
