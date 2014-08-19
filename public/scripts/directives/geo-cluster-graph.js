angular.module('geo-cluster-graph',[])
    .directive('clusterGraph', [function() {
      return {
        restrict: 'EA',
        scope: {
          data: "=",
          zoom: "=",
          centroids:"=",
          label: "@",
          onClick: "&",
        },
        link: function(scope, iElement, iAttrs) {
          var svg = d3.select(iElement[0])
              .append("svg")
              .attr("width", "100%")
              .attr("height", "100%");

          var height = iElement[0].clientHeight;
          var width = iElement[0].clientWidth;
          // on window resize, re-render d3 canvas
          window.onresize = function() {
            return scope.$apply();
          };

          scope.$watch(function(){
              return angular.element(window)[0].innerWidth;
            }, function(){
              return scope.render(scope.data, scope.zoom, scope.centroids );
            }
          );

          // watch for data changes and re-render
          scope.$watch('data', function(newVals, oldVals) {
              return scope.render(newVals, scope.zoom, scope.centroids);
          }, true);
          scope.$watch('zoom', function(newVal, oldVal) {
            return scope.render(scope.data, newVal, scope.centroids);
          }, true);
          scope.$watch('centroids', function(newVals, oldVals) {
            return scope.render(scope.data, scope.zoom, newVals);
          }, true);

          // define render function
          scope.render = function(data, zoom, centroids){
            if(!data) return;
            // remove all previous items before render
            svg.selectAll("*").remove();
            //resize hack
            svg.attr("width", width)
               .attr("height", height);
            var projection = d3.geo.mercator();

            var path = d3.geo.path()
                      .projection(projection);

            d3.json("/data/us.json", function(error, topo) { 
              states = topojson.feature(topo, topo.objects.states).features;
              // set projection parameters
              projection
                .scale(500)
                .center([-100, 40]);
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
                  .attr("class", "user")
                  .attr("cx", function (d) { return projection(d.coords)[0]; })
                  .attr("cy", function (d) { return projection(d.coords)[1]; })
                  .attr("r", "5px")
                  .attr("fill", "red");

                drawClusters();
            });

            function drawClusters(){
              var voronoi = d3.geom.voronoi()
               .clipExtent([[0, 0], [width, height]]);

              var centroidProjection = [];
              for (var i = 0; i < centroids.length; i++) {
                centroidProjection.push( projection(centroids[i]));
              }

              var voronoiPath = svg.append("g").selectAll("path");

              voronoiPath = voronoiPath
                    .data(voronoi(centroidProjection), polygon);

              voronoiPath.exit().remove();

              voronoiPath.enter().append("path")
                  .attr("class", function(d, i) { return "cluster" })
                  .on("mouseenter", scope.$parent.showCluster )
                  .attr("d", polygon)
                  .style("fill",function() {
                    return "hsl(" + Math.random() * 360 + ",100%,50%)";
                  })

              voronoiPath.order();
            };

            function polygon(d){
                return "M" + d.join("L") + "Z";
            };
          };
        }
      };
    }]);