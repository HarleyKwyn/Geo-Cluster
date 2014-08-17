describe('Module: cluster-data', function(){
  var kmeans;
  var injector = angular.injector(['cluster-data']);

  describe('factory: kmeans', function(){

    beforeEach(function(){
      kmeans = injector.get('kmeans');
    });

    it('should return an function', function(){
      expect( typeof kmeans ).to.equal('function');
    });

    xit('calculate should recalculate mean',function(){

    });

    xit('should',function(){

    });

  });
});
