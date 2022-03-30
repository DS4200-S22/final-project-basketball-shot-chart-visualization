
//margins
const margin = { top: 50, right: 50, bottom: 50, left: 200 };
const width = 900; //- margin.left - margin.right;
const height = 650; //- margin.top - margin.bottom;




//creating scatter plot
const svg1 = d3.select("#vis-container")
    .append("svg")
    .attr("width", width - margin.left - margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);
//brush and circles for scatterplot
let brush1;
let myCircles1;

//bars svg
const svg2 = d3.select("#vis-container")
    .append("svg")
    .attr("width", width - margin.left - margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);

// bars
let myBar;
let brush2;

const color = d3.scaleOrdinal()
    .domain(["Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets",
        "Chicago Bulls", "Cleveland Cavaliers", "Dallas Mavericks", "Denver Nuggets",
        "Detroit Pistons", "Golden State Warriors", "Houston Rockets", "Indiana Pacers",
        "Los Angeles Clippers", "Los Angeles Lakers", "Memphis Grizzlies", "Miami Heat",
        "Milwaukee Bucks", "Minnesota Timberwolves", "New Orleans Pelicans", "New York Knicks",
        "Oklahoma City Thunder", "Orlando Magic", "Philadelphia 76ers", "Phoenix Suns",
        "Portland Trail Blazers", "Sacramento Kings", "San Antonio Spurs", "Toronto Raptors",
        "Utah Jazz", "Washington Wizards"])
    .range(["#201923", "#5fb526", "#fcff5d", "#7dfc00", "#0ec434", "#228c68", "#8ad8e8",
        "#235b54", "#29bdab", "#3998f5", "#37294f", "#277da7", "#3750db", "#f22020",
        "#991919", "#ffcba5", "#e68f66", "#c56133", "#96341c", "#632819", "#ffc413",
        "#f47a22", "#2f2aa0", "#b732cc", "#772b9d", "#f07cab", "#d30b94", "#798bd4",
        "#c3a5b4",
        "#946aa2"]);


d3.csv("data/efg_gameswon.csv").then((data) => {
    console.log(data);

    let x1, y1, x2, y2;
    let xKey1, yKey1, xKey2, yKey2;

    // Scatterplot for efg and wins
    {
        xKey1 = "EFG";
        yKey1 = "Games Won";

        // Find max x
        let maxX1 = d3.max(data, (d) => { return d[xKey1]; });

        // Create X scale
        x1 = d3.scaleLinear()
            .domain([0, maxX1])
            .range([margin.left, width - margin.right]);

        // Add x axis 
        svg1.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x1))
            .attr("font-size", '20px')
            .call((g) => g.append("text")
                .attr("x", width - margin.right)
                .attr("y", margin.bottom - 4)
                .attr("fill", "black")
                .attr("text-anchor", "end")
                .text(xKey1)
            );

        // Finx max y 
        let maxY1 = d3.max(data, (d) => { return d[yKey1]; });
        maxY1 = (Number(maxY1) + 5).toString()

        // Create Y scale
        y1 = d3.scaleLinear()
            .domain([0, maxY1])
            .range([height - margin.bottom, margin.top]);

        // Add y axis 
        svg1.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y1))
            .attr("font-size", '20px')
            .call((g) => g.append("text")
                .attr("x", 0)
                .attr("y", margin.top)
                .attr("fill", "black")
                .attr("text-anchor", "end")
                .text(yKey1)
            );

        // Add points to first scatterplot
        myCircles1 = svg1.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("id", (d) => d.id)
            .attr("cx", (d) => x1(d[xKey1]))
            .attr("cy", (d) => y1(d[yKey1]))
            .attr("r", 8)
            .style("fill", (d) => color(d.Team))
            .style("opacity", 0.5);
        //.on("mouseover", mouseOverScatter);

        brush1 = d3.brush().extent([[0, 0], [width, height]])

        svg1.call(brush1)
            .on("start", clear)
            .on("brush", updateChart1)

    }

    {

        //keys for simplicity sake
        xKey2 = "Team"
        yKey2 = "Games Won"


        // Create X scale
        x2 = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        // Add x axis 
        svg2.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`) 
            .call(d3.axisBottom(x2)
                .tickFormat(i => data[i][xKey2]))
            .attr("font-size", '4px')
            .call((g) => g.append("text") //rotation not workinng
                .attr("x", width - margin.right)
                .attr("y", margin.bottom - 4)
                .attr("fill", "black")
                .attr("text-anchor", "end")
                .text(xKey2)
                .attr("transform", "rotate(90)")
                
            );

        
        // Find max y 
        let maxY2 = d3.max(data, (d) => { return d[yKey2]; });

        // Create Y scale
        y2 = d3.scaleLinear()
            .domain([0, maxY2])
            .range([height - margin.bottom, margin.top]);

        // Add y axis 
        svg2.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y2))
            .attr("font-size", '20px')
            .call((g) => g.append("text")
                .attr("x", 0)
                .attr("y", margin.top)
                .attr("fill", "black")
                .attr("text-anchor", "end")
                .text(yKey2)
            );

        //add bars
        myBar = svg2.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => x2(i))
            .attr("y", (d) => y2(d[yKey2]))
            .attr("width", x2.bandwidth())
            .attr("height", (d) => (height - margin.bottom) - y2(d[yKey2]))
            .style("fill", (d) => color(d[xKey2]))
            .style("opacity", 0.5);







    }

});

// function mouseOverScatter(d, i) {
//     // Specify where to put label of text
//     svg1.append("text").attr({
//         id: "t" + d.xKey1 + "-" + d.yKey1 + "-" + i,  
//          x: function() { return x1(d.xKey1) - 30; },
//          y: function() { return y1(d.yKey1) - 15; }
//      })
//      .text(function() {
//        return [d.xKey1, d.yKey1];  // Value of the text
//      });
// }

//clear brushes
function clear() {
    svg1.call(brush1.move, null);

    //TODO: add code to clear existing brush from svg2
    svg2.call(brush2.move, null)
}

// Call when Scatterplot2 is brushed 
function updateChart1(brushEvent) {

    //Find coordinates of brushed region 
    let coords = d3.brushSelection(this);

    //Start an empty set that you can store names of selected species in 
    let selected_teams = new Set();

    //Give bold outline to all points within the brush region in Scatterplot2 & collected names of brushed species
    myCircles1.classed("brushed", function (d) {

      is_selected = isBrushed(coords, x1(d[xKey1]), y1(d[yKey1]));

      if (is_selected) {
        selected_teams.add(d[xKey2]);
      }
      return is_selected;
    })

    //Give bold outline to all points in Scatterplot1 corresponding to points within the brush region in Scatterplot2
    myCircles1.classed("brushed", function (d) {
      return isBrushed(coords, x1(d[xKey1]), y1(d[yKey1]));
    })

    //Give bold outline to all bars in bar chart with corresponding to species selected by Scatterplot2 brush
    myBar.classed("brushed", function (d) {
      return selected_teams.has(d[xKey2]);
    })

  }

//Finds dots within the brushed region
function isBrushed(brush_coords, cx, cy) {
    if (brush_coords === null) return;

    var x0 = brush_coords[0][0],
      x1 = brush_coords[1][0],
      y0 = brush_coords[0][1],
      y1 = brush_coords[1][1];
    return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1; // This return TRUE or FALSE depending on if the points is in the selected area
  }

