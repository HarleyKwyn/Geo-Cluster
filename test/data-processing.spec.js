var expect = chai.expect;

describe('Module: data-processing', function(){
  var dataFilter, attachCoords, filter, testData;
  var injector = angular.injector(['data-processing']);


  describe('Factory: dataFilter', function(){

    beforeEach(function(){
      testData = ['this', 'is', 'a', 'test'];
      dataFilter = injector.get('dataFilter');
      filter = new dataFilter(testData);
    });

    it('should exist', function(){
      expect( dataFilter ).to.be.ok
    });

    it('should have a data property with original data.', function(){
      expect( filter.origonalData ).to.equal(testData);
    });

    describe('.by to exist', function(){
      expect()
    });

    describe('.byModule',function(){

    });
    describe('.byTimeRange', function(){
      xit('should filter by time_purchased and update dataFilter.filteredData', function(){

      });
    });

    describe('.invalidZip', function(){
      xit('should generate error list for unknown zipcodes', function(){

      });
    });

  });

  describe('Factory: attachCoords', function(){
    var testData;

    beforeEach(function(){
      attachCoords = injector.get('attachCoords');
      var invalidZipUser = {username:'invalid', zipcode:'invalid'}
      var validZipUser = {username:'valid', zipcode:'94089'}
      testData = [invalidZipUser, validZipUser];
    });

    it('should exist', function(){
      expect( attachCoords ).to.be.ok
    });
    it('should set coords as null if invalid zip', function(){
      attachCoords(testData);
      expect( testData[0].coords).to.equal(null);
    });

    it('should define coordinates for valid zip', function(){
      attachCoords(testData);
      expect( Array.isArray(testData[1].coords) ).to.equal(true);
      expect( testData[1].coords.length).to.equal(2);
    });
  });  
});