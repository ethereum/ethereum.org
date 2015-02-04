var resizeCB = function(){};

$(window).resize(function(){
  resizeCB();
});

Template.community.rendered = function(){
  var centered;

  var margin = {left: 10, right: 10},
      width = $('#meetupmap').outerWidth(),
      height = $('#meetupmap').outerHeight();

  var projection = d3.geo.mercator()
        .scale((width + 1) / 2 / Math.PI)
        .translate([width / 2, height / 2 + 50])
        .precision(0.1);

  var path = d3.geo.path()
        .projection(projection);

  var svg = d3.select("#meetupmap").append("svg")
        .attr("width", width + 'px')
        .attr("height", height + 'px');

  svg.append("rect")
    .attr("class", "mapbackground")
    .attr("width", width)
    .attr("height", height)
    .on("click", clicked);

  var g = svg.append("g");



  // load and display the world
  d3.json("/world.json", function(error, topology) {

    g.selectAll("path")
      .data(topojson.feature(topology, topology.objects.countries).features)
      .enter()
      .append("path")
      .attr("d", path)
      .on("click", clicked);

    g.selectAll(".point")
      .data(Meetups.find().fetch())
      .enter()
      .append("a")
      .attr("data-href", function(d){ return d.url; })//hackaround for iron:router link bug
      .attr("xlink:show", "new")
      .append("circle")
      .attr("cx", function(d) { return projection([d.lon, d.lat])[0]; })
      .attr("cy", function(d) { return projection([d.lon, d.lat])[1]; })
      .attr("r", 4)
      .style("stroke", "black")
      .style("stroke-width", 0.25)
      .style("fill", "#6691c0")
      .call(
        d3.helper.tooltip()
          .attr({'class': 'meetup-tooltip'})
          .text(function(d) { return d.city; })
      );
  });

  var x = width / 2,
      y = height / 2,
      k = 1;


  function clicked(d) {
    g.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")");
    
    if (d && centered !== d) {
      var centroid = path.centroid(d);
      x = centroid[0];
      y = centroid[1];
      k = 2;
      centered = d;
    } else {
      x = width / 2;
      y = height / 2;
      k = 1;
      centered = null;
    }

    g.selectAll("path")
      .classed("active", centered && function(d) { return d === centered; });

    g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
  }

  resizeCB = _.debounce(function () {
    console.log("resize");
    var width = $('#meetupmap').outerWidth(),
        height = $("#meetupmap").outerHeight(),
        projection = d3.geo.mercator()
          .scale((width + 1) / 2 / Math.PI)
          .translate([width / 2, height / 2 + 50])
          .precision(0.1);

    // resize the map container
    svg.style('width', width + 'px')
      .style('height', height + 'px');

    // resize the map
    g.selectAll("path").attr("d", path.projection(projection));
    g.selectAll("circle")
      .attr("cx", function(d) { return projection([d.lon, d.lat])[0]; })
      .attr("cy", function(d) { return projection([d.lon, d.lat])[1]; });
  }, 200);
  // responsive

};

Template.community.helpers({
  unfeaturedMeetupCount: function(){
    return Meetups.find({featured: {$not: true}}).count();
  }
});

Template.community.events({
  "click #meetupmap a": function(e){
    window.location = $(e.currentTarget).data("href");
  }
});



