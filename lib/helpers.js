
module.exports.render_money = function() {
  return function (amountTemplate, ctx) {
    var key = /{{(.*)}}/.exec(amountTemplate)[1];
    var amount;
    if (key) {
      amount = parseFloat(ctx[0][key].toString());
    } else {
      amount = parseFloat(amountTemplate.toString());
    }
    return "£" + amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};
