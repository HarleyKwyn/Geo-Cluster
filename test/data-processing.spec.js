var expect = chai.expect;

describe('Module: data-processing', function(){
  var dataFilter, attachCoords, filter;
  var injector = angular.injector(['data-processing']);


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
        var expectedResults = [
          {
              "name": "User 96",
              "user_id": 96,
              "time_purchased": 1402266354000,
              "zipcode": "71431",
              "products": [
                  "Accelerometer",
                  "Climate",
                  "IR",
                  "RFID"
              ]
          },
          {
              "name": "User 98",
              "user_id": 98,
              "time_purchased": 1401810136000,
              "zipcode": "97054",
              "products": [
                  "GPRS/SIM",
                  "GPS",
                  "BLE",
                  "RFID",
                  "Ambient",
                  "BLE"
              ]
          }
        ]

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
      var correctArray = [
        {
            "name": "User 97",
            "user_id": 97,
            "time_purchased": 1378874952000,
            "zipcode": "74023",
            "products": [
                "RFID",
                "Ambient",
                "Tessel"
            ]
        },
        {
            "name": "User 99",
            "user_id": 99,
            "time_purchased": 1404714391000,
            "zipcode": "MONW",
            "products": [
                "Climate",
                "GPS",
                "Tessel"
            ]
        }
      ]

      it('should return empty array for invalid name', function(){
        expect( filter.byModule('Arduino').length ).to.equal(0);
      });
      it('should return correct array for valid name', function(){
        expect( filter.byModule('Tessel') ).to.deep.equal( correctArray );
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