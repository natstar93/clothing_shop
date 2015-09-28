clothingShop.factory('DataService', function($http) {

  var factory = {};
  self = this;
  self.prodData = {};

  factory.getData = function() {
    factory.prodData = $http.get('js/awesomeclothing.json')
      .success(function(response) {
        self.prodData = response.data;
      })
    return factory.prodData;
  }
  return factory;
});
