Geo-Cluster
===========

Cluster data based on geo-location. Includes Filtering options.

##Technical Choices
    Chose to use angular for modularity purposes and I had the understanding the angular was used heavily internally.

    Used python script  to convert csv to usable json
    csvjson --lat "latitude" --lon "longitude" --k "zip" -i 2 src/zipcode.csv > zip.json

    Used k-means algorithm to allow user to determine number of clusters

##Angular Architecture.
    There's only a single view so I've decided to omit the use of a router for now. This single view can be ported to any other angular application if you just include the GeoCluster module. :)

# Feature Prioritization:
    In order of the specification actually works very well. So I will follow that and stick to the time constraints. 

 - X-Axis: Latitude  //deprecated as we have a map!
 - Y-Axis: Longitude //deprecated as we have a map!
 - Number of Clusters: The user should be able to control an arbitrary number of clusters based on a slider 

 - Cluster Hover Behavior: The user should be able to hover over a cluster to see which people fall in that cluster.
 - Data Format: The data will come in as a json object which matches the following format:
```
{
  name: “Foo Bar”,
  products: [“IR”, “Accelerometer”, “Tessel” …],  // things can appear twice in here, ex: 2 Tessels with 2 Accelerometers.
  zipcode: 00000,
  time_purchased: 1407785931566,
  user_id: 0
}
```
 - Filtering: The user should be able to filter the data based on modules and/or time purchased to find geographic clusters.

##TODO
 - Given more time it'd probably be better to use k-medians since there are some extreme data points such as Hawaii, Alaska and PuertoRico that throw off the averages and create odd clusters. Also a unsupervised algorithm may work better/

 -Architecture fix would be nice for the filter to be able to filter by both time and modules. For now can only filter by one unless you chain two different filters together or create a custom comparator.

##Running it Locally:

run `npm install`

run `npm start`

If there are issues be sure to have gulp installed globally `npm install -g gulp`
and then try running `gulp develop`
and go to `localhost:8000`

