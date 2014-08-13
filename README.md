Geo-Cluster
===========

Cluster data based on geo-location. Includes Filtering options.

##Technical Choices
    Chose to use angular for modularity purposes and I had the understanding the angular was used heavily internally.

##Angular Architecture.
    There's only a single view so I've decided to omit the use of a router for now. This single view can be ported to any other angular application if you just include the GeoCluster module. :)

# Feature Prioritization:
    In order of the specification actually works very well. So I will follow that and stick to the time constraints. 
##TODO:

 - X-Axis: Latitude
 - Y-Axis: Longitude
 - Number of Clusters: The user should be able to control an arbitrary number of clusters based on a slider

This means (no pun intended) We'll have to use a k-means clustering algorithm to be able to specify the number of clusters. Hierarchical Clustering is determined by the data. 

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
