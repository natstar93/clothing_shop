clothingShop.factory('OrderProducts', function() {

  var factory = {};
  var orderedItems = [];
  var fiveOffVoucherApplied = false;
  var tenOffVoucherApplied = false;
  var fifteenOffVoucherApplied = false;

  factory.addItem = function(product, productsList) {
    removeFromStockList(product, productsList);
    addToOrder(product);
    return { 'o' : orderedItems,
             'p' : productsList };
  };

  function removeFromStockList(product, productsList) {
    var itemPosition = findItem(product, productsList);
    productsList[itemPosition].quantity--;
  };

  function addToOrder(product) {
    var itemPosition = findItem(product, orderedItems);
    if (itemPosition > -1) {
      orderedItems[itemPosition].quantity ++;
    }
    else {
      orderedItems.push( { "name" : product.name, "category" : product.category, "quantity" : 1, "price" : product.price } );
    }
  };

  factory.removeItem = function(item, productsList) {
    removeFromOrder(item);
    incremementStockList(item, productsList);

    return {'o' : orderedItems,
            'p' : productsList};
  };

  function removeFromOrder(item) {
    var itemPosition = findItem(item, orderedItems);
    orderedItems[itemPosition].quantity--;
    if (orderedItems[itemPosition].quantity === 0) {
      orderedItems.splice(itemPosition, 1);
    }
  };

  function findItem(item, list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].name === item.name) {
        return i;
      }
    }
    return -1;
  }

  function incremementStockList(item, productsList) {
    var itemPosition = findItem(item, productsList);
    productsList[itemPosition].quantity++;
  };

  factory.calculateSubtotal = function() {
    var basketTotal = 0;
    angular.forEach(orderedItems, function(item) {
      basketTotal += item.price * item.quantity;
    });
    return basketTotal;
  };

  factory.applyVoucher = function(voucherCode) {
    if (voucherCode === 'AWESOME5OFF') {
      fiveOffVoucherApplied = true;
      tenOffVoucherApplied = false;
      fifteenOffVoucherApplied = false;
      return true;
    }
    else if (voucherCode === 'AWESOME10OFF') {
      tenOffVoucherApplied = true;
      fiveOffVoucherApplied = false;
      fifteenOffVoucherApplied = false;
      return true;
    }
    else if ((voucherCode === 'AWESOME15SHOE') && isFootwearOrdered()) {
      fifteenOffVoucherApplied = true;
      tenOffVoucherApplied = false;
      fiveOffVoucherApplied = false;
      return true;
    }
    else {
      return false;
    }
  };

  function isFootwearOrdered() {
    for (var i = 0; i < orderedItems.length; i++) {
      if (orderedItems[i].category === "Women's Footwear" || orderedItems[i].category === "Men's Footwear") {
        return true;
      }
    }
  }

  factory.calculateTotal = function() {
    grandTotal = factory.calculateSubtotal();
    if (fiveOffVoucherApplied && grandTotal > 5) {
      grandTotal -= 5;
    }
    if(tenOffVoucherApplied && grandTotal > 50) {
      grandTotal -= 10;
    }
    if(fifteenOffVoucherApplied && grandTotal > 75) {
      grandTotal -= 15;
    }
    return grandTotal;
  };

  factory.isOutOfStock = function(item, productsList) {
    var itemPosition = findItem(item, productsList);
    return (productsList[itemPosition].quantity < 1);
  }

  return factory;
});
