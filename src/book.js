export default class Book {
  constructor(
    title,
    author,
    pages,
    isRead = false,
  ) {
    this.title = this.capitalizeTitle(title);
    this.author = this.capitalizeTitle(author);
    this.pages = pages;
    this.isRead = isRead;
  }
}

Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};

Book.prototype.capitalizeTitle = function (inputString) {
  const excludedWords = ['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from', 'by', 'as', 'in', 'of'];
  const words = inputString.toLowerCase().split(' ');

  for (let i = 0; i < words.length; i++) {
    if (!excludedWords.includes(words[i])) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
  }

  return words.join(' ');
};
