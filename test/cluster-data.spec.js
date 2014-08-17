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
      testKmeans = new kmeans(4, kmeansData, 'coords')
      smallKmeans = new kmeans(2, testData, 'coords')
      console.log(testKmeans);
      console.log(smallKmeans);
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
      it('should have correct max and min for lat and long', function(){
        var correct = [{max: 0, min: -122.90416}, {max: 45.946314 , min: 31.258681} ]
        expect(smallKmeans.extremes).to.deep.equal(correct);
      });
    });

    describe('.getDataRanges', function(){
      it('should calculate ranges correctly', function(){
        var correct = smallKmeans.extremes[0].max - smallKmeans.extremes[0].min
        expect(smallKmeans.ranges[0]).to.be.equal(correct);
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
    describe('.calculate', function(){
      xit('should store getDataExtremes result in kmeans.extremes', function(){
        var extremes = testKmeans.getDataExtremes();
        expect( testKmeans.extremes ).to.deep.equal(extremes);
      });  
    })

  });
});
