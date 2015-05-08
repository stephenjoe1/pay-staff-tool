
module.exports.render_money = function() {
  return function (amountTemplate, ctx) {
    var key = /{{(.*)}}/.exec(amountTemplate)[1];
    var amount;
    if (key) {
      amount = ctx[0][key].toString();
    } else {
      amount = amountTemplate.toString();
    }
    return "£" + amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};
