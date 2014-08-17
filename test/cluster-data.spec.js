describe('Module: cluster-data', function(){
  var kmeans;
  var injector = angular.injector(['cluster-data', 'data-processing']);
      attachCoords = injector.get('attachCoords')
  attachCoords(kmeansData);
  attachCoords(testData);

  describe('factory: kmeans', function(){
    beforeEach(function(){
      kmeans = injector.get('kmeans');
      testKmeans = new kmeans(4, kmeansData, 'coords')
      smallKmeans = new kmeans(2, testData, 'coords')
    });
    it('should return an function', function(){
      console.log(testKmeans);
      console.log(smallKmeans);
      expect( typeof kmeans ).to.equal('function');
    });
    describe('.getDataExtremes', function(){
      it('should return and array of length 2', function(){
        expect( Array.isArray( testKmeans.getDataExtremes() ) ).to.be.true;
        expect( testKmeans.getDataExtremes().length ).to.equal(2);
      });
      it('should store getDataExtremes result in kmeans.extremes', function(){
        var extremes = testKmeans.getDataExtremes();
        expect( testKmeans.extremes ).to.deep.equal(extremes);
      });
      it('should have latitude min and max', function(){
        expect(testKmeans.extremes[0].min).to.be.defined
        expect(testKmeans.extremes[0].max).to.be.defined
      });
      it('should have longitude min and max', function(){
        expect(testKmeans.extremes[0].min).to.be.defined
        expect(testKmeans.extremes[0].max).to.be.defined
      });
      it('should have correct max and min for lat and long', function(){
        var correct = [{max: 0, min: -122.90416}, {max: 45.946314 , min: 31.258681} ]
        expect(smallKmeans.extremes).to.deep.equal(correct);
      });
    });

  });
});
