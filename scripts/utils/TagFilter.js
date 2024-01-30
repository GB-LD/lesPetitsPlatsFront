export default class TagFilter {
  constructor () {
    this.tagList = [];
  }

  updateTagList (newTagList) {
    this.tagList = newTagList;
    this.createTagFilter();
  }

  getTagList () {
    return this.tagList;
  }

  createTagFilter () {
    const tagsHtml = this.tagList.map(item => {
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
      const tagListUpdated = this.tagList.filter(tag => tag !== reverseTagIdFormat);
      this.updateTagList(tagListUpdated);
    }));
  }
}
