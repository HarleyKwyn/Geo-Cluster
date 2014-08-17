describe('Module: data-processing', function(){
  var dataFilter, attachCoords, filter;
  var injector = angular.injector(['data-processing']),
      attachCoords = injector.get('attachCoords');
  
  before(function(){
    attachCoords(testData)
  });

  describe('Factory: attachCoords', function(){
    var test;

    beforeEach(function(){
      var invalidZipUser = {username:'invalid', zipcode:'invalid'}
      var validZipUser = {username:'valid', zipcode:'94089'}
      test = [invalidZipUser, validZipUser];
      attachCoords(test);
    });

    it('should exist', function(){
      expect( attachCoords ).to.be.ok
    });
    it('should set coords as null if invalid zip', function(){
      attachCoords(test);
      expect( test[0].coords).to.equal(null);
    });

    it('should define coordinates for valid zip', function(){
      attachCoords(test);
      expect( Array.isArray(test[1].coords) ).to.equal(true);
      expect( test[1].coords.length).to.equal(2);
    });
  });
  


  describe('Factory: dataFilter', function(){

    beforeEach(function(){
      dataFilter = injector.get('dataFilter');
      filter = new dataFilter(testData);
    });

    it('should exist', function(){
      expect( dataFilter ).to.be.ok
    });

    it('should have a data property with original data.', function(){
      expect( filter.origonalData ).to.equal(testData);
    });

    it('should have a .by method', function(){
      expect( filter.by ).to.be.ok
    });

    it('should have a .byModule method',function(){
      expect( filter.byModule ).to.be.ok
    });
    it('should have a .byTimeRange method', function(){
      expect( filter.byTimeRange ).to.be.ok
    });

    it('should have a .invalidZip method', function(){
      expect( filter.invalidZip ).to.be.ok    
    });

    describe('.by', function(){
      var comparator;

      beforeEach(function(){
        comparator = function(data, index){
          return index%2;
        };
      });

      it('should return an array', function(){
        expect( Array.isArray(filter.by(comparator)) ).to.be.true
      });
      it('should filter by a comparator callback an array', function(){
        var expectedResults = [testData[3], testData[1]]
        expect( filter.by(comparator) ).to.deep.equal(expectedResults)
      });
      it('should update dataFilter.filteredData', function(){
        var origonalFiltered = filter.filteredData;
        filter.by(comparator);
        var newFiltered = filter.filteredData;
        expect(origonalFiltered).to.not.equal(newFiltered)
      });
    });

    describe('.byModule', function(){
      var correctArray = [ testData[2], testData[0] ];

      it('should return empty array for invalid name', function(){
        expect( filter.byModule('Arduino').length ).to.equal(0);
      });
      it('should return correct array for valid name', function(){
        expect( filter.byModule('Tessel') ).to.deep.equal( correctArray );
      });
    });
    describe('.byTimeRange', function(){
      var begin = 1401810036000
      var end = 1404714491000
      var correctResults = [testData[3], testData[1], testData[0]];
      it('should filter by time range', function(){
        expect( filter.byTimeRange(begin, end) ).to.deep.equal(correctResults);
      });
    });

    describe('.invalidZip', function(){
      var invalid = [ testData[0] ];
      it('should generate error list for unknown zipcodes', function(){
        expect( filter.invalidZip() ).to.deep.equal(invalid);

      });

    });

  });
});