describe('Module: cluster-data', function(){
  
  var kmeans;
  var injector = angular.injector(['cluster-data', 'data-processing']);
      attachCoords = injector.get('attachCoords')
  
  before(function(){
    attachCoords(kmeansData);
    attachCoords(testData);
  });

  describe('factory: kmeans', function(){

    beforeEach(function(){
      kmeans = injector.get('kmeans');
      testKmeans = new kmeans(kmeansData, 4, 100, 'coords');
      console.log(testKmeans);
    });

    it('should return an function', function(){
      expect( typeof kmeans ).to.equal('function');
    });

    describe('.getDataExtremes', function(){
      it('should return and array of length 2', function(){
        expect( Array.isArray( testKmeans.getDataExtremes() ) ).to.be.true;
        expect( testKmeans.getDataExtremes().length ).to.equal(2);
      });
      it('should have latitude min and max', function(){
        expect(testKmeans.extremes[0].min).to.be.defined
        expect(testKmeans.extremes[0].max).to.be.defined
      });
      it('should have longitude min and max', function(){
        expect(testKmeans.extremes[0].min).to.be.defined
        expect(testKmeans.extremes[0].max).to.be.defined
      });
    });

    describe('.getDataRanges', function(){
      it('should calculate ranges correctly', function(){
        var correct = testKmeans.extremes[0].max - testKmeans.extremes[0].min
        expect(testKmeans.ranges[0]).to.be.equal(correct);
      });
    });
    describe('.initMeans', function(){
      it('should return and array of length 4 with sub Arrays of length 2', function(){
        var result = testKmeans.initMeans() 
        console.log(result);
        expect( Array.isArray( result ) ).to.be.true;
        expect( result.length ).to.equal(4);
        for (var i = result.length - 1; i >= 0; i--) {
          expect( result[i].length ).to.equal(2);
        }
      });
      it('should generate random starting mean dimensions', function(){
        var first = testKmeans.initMeans();
        var second = testKmeans.initMeans();
        expect(first).to.not.deep.equal(second);
      });
    });
    describe('.assignCentroids', function(){
      it('should return an object with index keys and cluster assignments', function(){
        var results = testKmeans.assignCentroids();
        expect(Object.keys( testKmeans.assignments ).length ).to.equal(kmeansData.length);
      });
    });

    describe('.recalculate', function(){
      it('should store update values on Kmeans object', function(){
        var extremes = testKmeans.getDataExtremes();
        expect( testKmeans.extremes ).to.deep.equal(extremes);
      });  
    })

  });
});
