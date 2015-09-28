describe('service: DataService', function() {
  beforeEach(module('ClothingShop'));

  var scope, ctrl, httpBackend;

  beforeEach(inject(function(DataService, $rootScope, _$httpBackend_) {
    httpBackend = _$httpBackend_;
    dataService = DataService;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should have a getData function', function() {
    expect(angular.isFunction(dataService.getData)).toBe(true);
  });

  it('getData function should return promise object if http request is successful', function() {

    var expectedData = ['Flip Flops, Blue'];
    var actualResult;

    httpBackend.expectGET('js/awesomeclothing.json')
      .respond(expectedData);

    dataService.getData().then(function(response) {
      actualResult = response;
    });

    httpBackend.flush();
    
    expect(actualResult.data).toEqual(expectedData);

  });
});
