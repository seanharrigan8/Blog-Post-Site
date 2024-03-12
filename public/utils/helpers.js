const Handlebars = require('handlebars');

function formatDate(date) {
  return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
  // Your code for formatting the date goes here
}


Handlebars.registerHelper('formatDate', formatDate);

 module.exports = {
  formatDate
};


