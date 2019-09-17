export default (date) => new Date(date).toLocaleString('default', { day: 'numeric', month: 'short' });
