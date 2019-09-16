/**
 * @name isEmpty
 * @param {Object} object object or array to check if empty
 * @returns {Boolean} true or false depending on whether object is empty
 */
const isEmpty = (object) => !Object.keys(object).length;

/**
 * @name dateFormatter
 * @param {Date} date date to be formatted
 * @returns {Date} date formatted to show day and year
 */
const dateFormatter = (date) => new Date(date).toString().slice(4, 15);

/**
 * @name getReadTime
 * @description find the reading time of an article
 * @param {String} article article text
 * @returns {Number} Rounded up nember describing article reading time
 */
const getReadTime = (article) => Math.ceil(article.split(' ').length / 200);

export { isEmpty, dateFormatter, getReadTime };
