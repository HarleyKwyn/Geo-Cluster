angular.module('GeoClusterGraph',['d3','ZipcodeService'])
    .directive('clusterGraph', ['zipcoords',function(zipcoords) {
      return {
        restrict: 'EA',
        scope: {
          data: "=",
          label: "@",
          onClick: "&"
        },
        link: function(scope, iElement, iAttrs) {
          console.log(topojson)
          var svg = d3.select(iElement[0])
              .append("svg")
              .attr("width", "100%")
              .attr("height", "100%");

          // on window resize, re-render d3 canvas
          window.onresize = function() {
            return scope.$apply();
          };

          scope.$watch(function(){
              return angular.element(window)[0].innerWidth;
            }, function(){
              return scope.render(scope.data);
            }
          );

          // watch for data changes and re-render
          scope.$watch('data', function(newVals, oldVals) {
            return scope.render(newVals);
          }, true);

          // define render function
          scope.render = function(data){
            // remove all previous items before render
            svg.selectAll("*").remove();

            var projection = d3.geo.mercator();

            var path = d3.geo.path()
                      .projection(projection);

            d3.json("/data/us.json", function(error, topo) { 
              console.log(error, topo);
              states = topojson.feature(topo, topo.objects.states).features;
              // set projection parameters
              projection
                .scale(1000)
                .center([-106, 37.5]);

              // points
              aa = [-122.490402, 37.786453];
              bb = [-122.389809, 37.72728];

              console.log(projection(aa),projection(bb));

              // add states from topojson
              svg.selectAll("path")
                  .data(states).enter()
                  .append("path")
                  .attr("class", "feature")
                  .style("fill", "steelblue")
                  .attr("d", path);

                // put boarder around states 
                svg.append("path")
                  .datum(topojson.mesh(topo, topo.objects.states, function(a, b) { return a !== b; }))
                  .attr("class", "state")
                  .attr("d", path);

                // add circles to svg
                svg.selectAll("circle")
                  .data(data).enter()
                  .append("circle")
                  .attr("cx", function (d) { console.log(d); return projection(zipcoords[d.zipcode])[0]; })
                  .attr("cy", function (d) { return projection(zipcoords[d.zipcode])[1]; })
                  .attr("r", "8px")
                  .attr("fill", "red")

            });

          };
        }
      };
    }]);