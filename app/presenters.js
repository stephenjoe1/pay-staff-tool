function render_money(amount) {
  var decimalAmount = parseFloat(amount).toFixed(2).toString();
  return "£" + decimalAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

presenters = {
  "amount" : render_money
}

module.exports = presenters;
