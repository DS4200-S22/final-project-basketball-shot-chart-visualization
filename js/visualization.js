
//margins
const margin = { top: 50, right: 50, bottom: 50, left: 200 };
const width = 800; //- margin.left - margin.right;
const height = 650; //- margin.top - margin.bottom;
const yToolTipOffset = 10;




//creating scatter plot
const svg1 = d3.select("#league-outlook")
    .append("svg")
    .attr("width", width - margin.left - margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);
//brush and circles for scatterplot
let brush1;
let myCircles1;

//winns  per team ssvg
const svg2 = d3.select("#league-outlook")
    .append("svg")
    .attr("width", width - margin.left - margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);

// bars
let myBar;

//creating scatter plot
const svg_scatter2 = d3.select("#league-outlook")
    .append("svg")
    .attr("width", width - margin.left - margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);
//brush and circles for scatterplot
let brush_scatter2;
let myCircles_scatter;

//fgpct per team svg
const svg_bar2 = d3.select("#shooting-pct")
    .append("svg")
    .attr("width", width - margin.left - margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);

// bars
let myBar2;

//ftpct per team svg
const svg_bar3 = d3.select("#shooting-pct")
    .append("svg")
    .attr("width", width - margin.left - margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);

// bars
let myBar3;

//fg3pct per team svg
const svg_bar4 = d3.select("#shooting-pct")
    .append("svg")
    .attr("width", width - margin.left - margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);

// bars
let myBar4;

//playoff bars fg3 svg
const svg_bar5 = d3.select("#playoff-stats")
    .append("svg")
    .attr("width", 350)
    .attr("height", 350)
    .attr("viewBox", [0, 0, width, height]);

// bars
let myBar5;

//playoff bars efg svg
const svg_bar6 = d3.select("#playoff-stats")
    .append("svg")
    .attr("width", 350)
    .attr("height", 350)
    .attr("viewBox", [0, 0, width, height]);

// bars
let myBar6;

//playoff bars wins svg
const svg_bar7 = d3.select("#playoff-stats")
    .append("svg")
    .attr("width", 350)
    .attr("height", 350)
    .attr("viewBox", [0, 0, width, height]);

// bars
let myBar7;

//playoff bars field goal svg
const svg_bar8 = d3.select("#playoff-stats")
    .append("svg")
    .attr("width", 350)
    .attr("height", 350)
    .attr("viewBox", [0, 0, width, height]);

// bars
let myBar8;

//playoff bars free throw svg
const svg_bar9 = d3.select("#playoff-stats")
    .append("svg")
    .attr("width", 350)
    .attr("height", 350)
    .attr("viewBox", [0, 0, width, height]);

// bars
let myBar9;


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

const color2 = d3.scaleOrdinal()
    .domain(["Made Playoffs", "Missed Playoffs"])
    .range(["#00FF3A", "#EF1D0C"]);


d3.csv("data/final_data_ds42.csv").then((data) => {

    const tooltip2 = d3.select('#shooting-pct')
            .append('div')
            .attr('id', 'tooltip')
            .style('opacity', 0)
            .style('border', 'solid')
            .style('border-color', 'black')
            .style('text-align', 'center')
            .attr('class', 'tooltip');

    const tooltip3 = d3.select('#playoff-stats')
            .append('div')
            .attr('id', 'tooltip')
            .style('opacity', 0)
            .style('border', 'solid')
            .style('border-color', 'black')
            .style('text-align', 'center')
            .attr('class', 'tooltip');

    let x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, x7, y7, x8, y8, x9, y9, x10, y10, x11, y11;
    let xKey1, yKey1, xKey2, yKey2, xKey3, yKey3, xKey4, yKey4, xKey5, yKey5, xKey6, yKey6, xKey7, yKey7, xKey8, yKey8, xKey9, yKey9, xKey10, yKey10, xKey11, yKey11;


    // Scatterplot for efg and wins
    {
        xKey1 = "EFG";
        yKey1 = "W";

        // Find max x
        let maxX1 = d3.max(data, (d) => { return d[xKey1]; });

        // Create X scale
        x1 = d3.scaleLinear()
            .domain([.48, maxX1])
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

        //adding title
        svg1.append('text')
            .attr('x', width /2)
            .attr('y', 0 - (margin.top / 2))
            .attr('text-anchor', 'middle')
            .style('font-size', '24px')
            .style('fill', 'black')
            .attr("font-weight", 700)
            .text('Wins (W) vs. Effective Field Goal Percentage (EFG%)');

        

        // Add points to first scatterplot
        myCircles1 = svg1.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("id", (d) => d.id)
            .attr("cx", (d) => x1(d[xKey1]))
            .attr("cy", (d) => y1(d[yKey1]))
            .attr("r", 8)
            .style("fill", (d) => color(d.TEAM_NAME))
            .style("opacity", 0.5)
            

        //.on("mouseover", mouseOverScatter);

        brush1 = d3.brush().extent([[0, 0], [width, height]])

        svg1.call(brush1
            .on("start", clear)
            .on("brush", updateChart1))

    }

    {

        //keys for simplicity sake
        xKey2 = "TEAM_NAME"
        yKey2 = "W"


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
            .attr("font-size", '10px')
            .selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start")
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
        maxY2 = (Number(maxY2) + 5).toString()

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

        //title
        svg2.append('text')
            .attr('x', width /2)
            .attr('y', 0 - (margin.top / 2))
            .attr('text-anchor', 'middle')
            .style('font-size', '24px')
            .style('fill', 'black')
            .attr("font-weight", 700)
            .text('Wins (W) per Team');

        const tooltip = d3.select('#league-outlook')
            .append('div')
            .attr('id', 'tooltip')
            .style('opacity', 0)
            .style('border', 'solid')
            .style('border-color', 'black')
            .style('text-align', 'center')
            .attr('class', 'tooltip');

        const mouseover = (event, d) => { 
            tooltip.html(
                `Team: ${ d.TEAM_NAME }
                <br> Wins: ${ d.W }
                <br> Effective Field Goal Percentage: ${ ((d.EFG) * 100).toFixed(2) }%
                <br> 3-Pointer Attempts: ${ d.FG3A }
                <br> 3-Point Percentage: ${ ((d.FG3_PCT) * 100).toFixed(2) }%`)
                    .style('opacity', 1);
              };

        const mouseleave = () => {
            tooltip.style('opacity', 0);
              };

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
            .style("opacity", 0.5)
            .on('mouseover', mouseover)
            .on('mouseleave', mouseleave);







    }



    // Scatterplot for fg3_pct and fg3q
    {

        xKey3 = "FG3A"
        yKey3 = "FG3_PCT";

        // Find max x
        let maxX3 = d3.max(data, (d) => { return d[xKey3]; });
       

        // Create X scale
        x3 = d3.scaleLinear()
            .domain([2000, maxX3])
            .range([margin.left, width - margin.right]);

        // Add x axis 
        svg_scatter2.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x3))
            .attr("font-size", '14px')
            .call((g) => g.append("text")
                .attr("x", width - margin.right)
                .attr("y", margin.bottom - 4)
                .attr("fill", "black")
                .attr("text-anchor", "end")
                .text(xKey3)
            );

        // Finx max y 
        let maxY3 = d3.max(data, (d) => { return d[yKey3]; });
        maxY3 = (Number(maxY3) + .02).toString()

        // Create Y scale
        y3 = d3.scaleLinear()
            .domain([.30, maxY3])
            .range([height - margin.bottom, margin.top]);

        // Add y axis 
        svg_scatter2.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y3))
            .attr("font-size", '20px')
            .call((g) => g.append("text")
                .attr("x", 0)
                .attr("y", margin.top)
                .attr("fill", "black")
                .attr("text-anchor", "end")
                .text(yKey3)
            );
        //title
        svg_scatter2.append('text')
            .attr('x', width /2)
            .attr('y', 0 - (margin.top / 2))
            .attr('text-anchor', 'middle')
            .style('font-size', '18px')
            .style('fill', 'black')
            .attr("font-weight", 700)
            .text('Three Point Field Goal Percentage (FG3_PCT) vs Three Point Field Goal Attempts (FG3A)');

        // Add points to first scatterplot
        myCircles_scatter = svg_scatter2.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("id", (d) => d.id)
            .attr("cx", (d) => x3(d[xKey3]))
            .attr("cy", (d) => y3(d[yKey3]))
            .attr("r", 8)
            .style("fill", (d) => color(d.TEAM_NAME))
            .style("opacity", 0.5);

        brush_scatter2 = d3.brush().extent([[0, 0], [width, height]])

        svg_scatter2.call(brush_scatter2
            .on("start", clear)
            .on("brush", updateChart2));

    }


    {

        //keys for simplicity sake
        xKey4 = "TEAM_NAME"
        yKey4 = "FG_PCT"
    
    
        // Create X scale
        x4 = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(0.1);
    
        // Add x axis 
        svg_bar2.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`) 
            .call(d3.axisBottom(x4)
                .tickFormat(i => data[i][xKey4]))
            .attr("font-size", '10px')
            .selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start")
            .call((g) => g.append("text") //rotation not workinng
                .attr("x", width - margin.right)
                .attr("y", margin.bottom - 4)
                .attr("fill", "black")
                .attr("text-anchor", "end")
                .text(xKey4)
                .attr("transform", "rotate(90)")
                
            );
    
        
        // Find max y 
        let maxY4 = d3.max(data, (d) => { return d[yKey4]; });
        maxY4 = (Number(maxY4) + .01).toString()
    
        // Create Y scale
        y4 = d3.scaleLinear()
            .domain([.40, maxY4])
            .range([height - margin.bottom, margin.top]);
    
        // Add y axis 
        svg_bar2.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y4))
            .attr("font-size", '20px')
            .call((g) => g.append("text")
                .attr("x", 0)
                .attr("y", margin.top)
                .attr("fill", "black")
                .attr("text-anchor", "end")
                .text(yKey4)
            );

        //title
        svg_bar2.append('text')
            .attr('x', width /2)
            .attr('y', 0 - (margin.top / 2))
            .attr('text-anchor', 'middle')
            .style('font-size', '24px')
            .style('fill', 'black')
            .attr("font-weight", 700)
            .text('Field Goal Percentage (FG_PCT) per Team');


        const mouseover = (event, d) => { 
            tooltip2.html(
                `Team: ${ d.TEAM_NAME }
                <br> Field Goal Percentage: ${ ((d.FG_PCT) * 100).toFixed(2) }% 
                <br> Free Throw Perentage: ${ ((d.FT_PCT) * 100).toFixed(2) }%
                <br> 3-Point Percentage: ${ ((d.FG3_PCT) * 100).toFixed(2) }%`)
                    .style('opacity', 1);
              };

        const mouseleave = () => {
            tooltip2.style('opacity', 0);
              };
    
        //add bars
        myBar2 = svg_bar2.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => x4(i))
            .attr("y", (d) => y4(d[yKey4]))
            .attr("width", x4.bandwidth())
            .attr("height", (d) => (height - margin.bottom) - y4(d[yKey4]))
            .style("fill", (d) => color(d[xKey4]))
            .style("opacity", 0.5)
            .on('mouseover', mouseover)
            .on('mouseleave', mouseleave);
    
    
    
    }

    {

        //keys for simplicity sake
        xKey5 = "TEAM_NAME"
        yKey5 = "FT_PCT"
    
    
        // Create X scale
        x5 = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(0.1);
    
        // Add x axis 
        svg_bar3.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`) 
            .call(d3.axisBottom(x5)
                .tickFormat(i => data[i][xKey5]))
            .attr("font-size", '10px')
            .selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start")
            .call((g) => g.append("text") //rotation not workinng
                .attr("x", width - margin.right)
                .attr("y", margin.bottom - 4)
                .attr("fill", "black")
                .attr("text-anchor", "end")
                .text(xKey5)
                .attr("transform", "rotate(90)")
                
            );
    
        
        // Find max y 
        let maxY5 = d3.max(data, (d) => { return d[yKey5]; });
        maxY5 = (Number(maxY5) + .02).toString()
    
        // Create Y scale
        y5 = d3.scaleLinear()
            .domain([.65, maxY5])
            .range([height - margin.bottom, margin.top]);
    
        // Add y axis 
        svg_bar3.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y5))
            .attr("font-size", '20px')
            .call((g) => g.append("text")
                .attr("x", 0)
                .attr("y", margin.top - 15)
                .attr("fill", "black")
                .attr("text-anchor", "end")
                .text(yKey5)
            );
    
        //title
        svg_bar3.append('text')
            .attr('x', width /2)
            .attr('y', 0 - (margin.top / 2))
            .attr('text-anchor', 'middle')
            .style('font-size', '24px')
            .style('fill', 'black')
            .attr("font-weight", 700)
            .text('Free Throw Percentage (FT_PCT) per Team');


        const mouseover = (event, d) => { 
            tooltip2.html(
                `Team: ${ d.TEAM_NAME }
                <br> Field Goal Percentage: ${ ((d.FG_PCT) * 100).toFixed(2) }% 
                <br> Free Throw Perentage: ${ ((d.FT_PCT) * 100).toFixed(2) }%
                <br> 3-Point Percentage: ${ ((d.FG3_PCT) * 100).toFixed(2) }%`)
                    .style('opacity', 1);
              };

        const mouseleave = () => {
            tooltip2.style('opacity', 0);
              };

        //add bars
        myBar3 = svg_bar3.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => x5(i))
            .attr("y", (d) => y5(d[yKey5]))
            .attr("width", x5.bandwidth())
            .attr("height", (d) => (height - margin.bottom) - y5(d[yKey5]))
            .style("fill", (d) => color(d[xKey5]))
            .style("opacity", 0.5)
            .on('mouseover', mouseover)
            .on('mouseleave', mouseleave);
    
    
    
    
    
    
    
    }

    {

        //keys for simplicity sake
        xKey6 = "TEAM_NAME"
        yKey6 = "FG3_PCT"
    
    
        // Create X scale
        x6 = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(0.1);
    
        // Add x axis 
        svg_bar4.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`) 
            .call(d3.axisBottom(x6)
                .tickFormat(i => data[i][xKey6]))
            .attr("font-size", '10px')
            .selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start")
            .call((g) => g.append("text") //rotation not workinng
                .attr("x", width - margin.right)
                .attr("y", margin.bottom - 4)
                .attr("fill", "black")
                .attr("text-anchor", "end")
                .text(xKey6)
                
            );
    
        
        // Find max y 
        let maxY6 = d3.max(data, (d) => { return d[yKey6]; });
        maxY6 = (Number(maxY6) + .013).toString()
    
        // Create Y scale
        y6 = d3.scaleLinear()
            .domain([0.30, maxY6])
            .range([height - margin.bottom, margin.top]);
    
        // Add y axis 
        svg_bar4.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y6))
            .attr("font-size", '20px')
            .call((g) => g.append("text")
                .attr("x", 0)
                .attr("y", margin.top)
                .attr("fill", "black")
                .attr("text-anchor", "end")
                .text(yKey6)
            );

        //title
        svg_bar4.append('text')
            .attr('x', width /2)
            .attr('y', 0 - (margin.top / 2))
            .attr('text-anchor', 'middle')
            .style('font-size', '24px')
            .style('fill', 'black')
            .attr("font-weight", 700)
            .text('Three Point Field Goal Percentage (FG3_PCT) per Team');


        const mouseover = (event, d) => { 
            tooltip2.html(
                `Team: ${ d.TEAM_NAME }
                <br> Field Goal Percentage: ${ ((d.FG_PCT) * 100).toFixed(2) }% 
                <br> Free Throw Perentage: ${ ((d.FT_PCT) * 100).toFixed(2) }%
                <br> 3-Point Percentage: ${ ((d.FG3_PCT) * 100).toFixed(2) }%`)
                    .style('opacity', 1);
              };

        const mouseleave = () => {
            tooltip2.style('opacity', 0);
              };
    
        //add bars
        myBar4 = svg_bar4.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => x6(i))
            .attr("y", (d) => y6(d[yKey6]))
            .attr("width", x6.bandwidth())
            .attr("height", (d) => (height - margin.bottom) - y6(d[yKey6]))
            .style("fill", (d) => color(d[xKey6]))
            .style("opacity", 0.5)
            .on('mouseover', mouseover)
            .on('mouseleave', mouseleave);
    
    
    }

    {

        //hard-coded data
        const data2 = [
          {Playoffs: 'Made Playoffs', FG3_PCT: .35895},
          {Playoffs: 'Missed Playoffs', FG3_PCT: .3412}
        ];
    
        //keys for simplicity sake
        xKey7 = "Playoffs"
        yKey7 = "FG3_PCT"
    
    
        // Create X scale
        x7 = d3.scaleBand()
                    .domain(d3.range(data2.length))
                    .range([margin.left, width - margin.right])
                    .padding(0.1); 
    
        // Add x axis 
        svg_bar5.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(x7)
                .tickFormat(i => data2[i][xKey7]))   
        .attr("font-size", '20px')
        .call((g) => g.append("text")
                      .attr("x", width - margin.right) 
                      .attr("y", margin.bottom - 4)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(xKey7)
      );
    
        // Find max y 
        let maxY7 = d3.max(data2, (d) => { return d[yKey7]; });
        maxY7 = (Number(maxY7) + .05).toString()
    
        // Create Y scale
        y7 = d3.scaleLinear()
                    .domain([0, maxY7])
                    .range([height - margin.bottom, margin.top]); 
    
        // Add y axis 
        svg_bar5.append("g")
            .attr("transform", `translate(${margin.left}, 0)`) 
            .call(d3.axisLeft(y7)) 
            .attr("font-size", '20px') 
            .call((g) => g.append("text")
                          .attr("x", 0)
                          .attr("y", margin.top)
                          .attr("fill", "black")
                          .attr("text-anchor", "end")
                          .text(yKey7)
          );

          //adding title
        svg_bar5.append('text')
            .attr('x', width /2)
            .attr('y', 0 - (margin.top / 2))
            .attr('text-anchor', 'middle')
            .style('font-size', '18px')
            .style('fill', 'black')
            .attr("font-weight", 700)
            .text('Average Three Point Field Goal Percentage For Teams that Made and Missed Playoffs');

        const mouseover = (event, d) => { 
            tooltip3.html(
                `Percentage: ${ ((d.FG3_PCT) * 100).toFixed(2) }%`)
                    .style('opacity', 1);
              };

        const mouseleave = () => {
            tooltip3.style('opacity', 0);
              };
    
    
        //add bars
        myBar5 = svg_bar5.selectAll("rect")
                                .data(data2)
                                .enter()
                                .append("rect")
                                  .attr("class", "bar")
                                  .attr("x", (d, i) => x7(i))
                                  .attr("y", (d) => y7(d[yKey7]))
                                  .attr("width", x7.bandwidth())
                                  .attr("height", (d) => (height - margin.bottom) - y7(d[yKey7]))
                                  .style("fill", (d) => color2(d[xKey7]))
                                  .style("opacity", 0.5)
                                  .on('mouseover', mouseover)
                                  .on('mouseleave', mouseleave);
    
    
      }

      {

        //hard-coded data
        const data2 = [
          {Playoffs: 'Made Playoffs', EFG: .5379},
          {Playoffs: 'Missed Playoffs', EFG: .5181}
        ];
    
        //keys for simplicity sake
        xKey8 = "Playoffs"
        yKey8 = "EFG"
    
    
        // Create X scale
        x8 = d3.scaleBand()
                    .domain(d3.range(data2.length))
                    .range([margin.left, width - margin.right])
                    .padding(0.1); 
    
        // Add x axis 
        svg_bar6.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(x8)
                .tickFormat(i => data2[i][xKey8]))   
        .attr("font-size", '20px')
        .call((g) => g.append("text")
                      .attr("x", width - margin.right) 
                      .attr("y", margin.bottom - 4)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(xKey8)
      );
    
        // Find max y 
        let maxY8 = d3.max(data2, (d) => { return d[yKey8]; });
        maxY8 = (Number(maxY8) + .05).toString()
    
        // Create Y scale
        y8 = d3.scaleLinear()
                    .domain([0, maxY8])
                    .range([height - margin.bottom, margin.top]); 
    
        // Add y axis 
        svg_bar6.append("g")
            .attr("transform", `translate(${margin.left}, 0)`) 
            .call(d3.axisLeft(y8)) 
            .attr("font-size", '20px') 
            .call((g) => g.append("text")
                          .attr("x", 0)
                          .attr("y", margin.top)
                          .attr("fill", "black")
                          .attr("text-anchor", "end")
                          .text(yKey8)
          );

          //adding title
        svg_bar6.append('text')
            .attr('x', width /2)
            .attr('y', 0 - (margin.top / 2))
            .attr('text-anchor', 'middle')
            .style('font-size', '18px')
            .style('fill', 'black')
            .attr("font-weight", 700)
            .text('Average Effective Field Goal Percentage For Teams that Made and Missed Playoffs');

        const mouseover = (event, d) => { 
            tooltip3.html(
                `Percentage: ${ ((d.EFG) * 100).toFixed(2) }%`)
                    .style('opacity', 1);
              };

        const mouseleave = () => {
            tooltip3.style('opacity', 0);
              };
    
    
        //add bars
        myBar6 = svg_bar6.selectAll("rect")
                                .data(data2)
                                .enter()
                                .append("rect")
                                  .attr("class", "bar")
                                  .attr("x", (d, i) => x8(i))
                                  .attr("y", (d) => y8(d[yKey8]))
                                  .attr("width", x8.bandwidth())
                                  .attr("height", (d) => (height - margin.bottom) - y8(d[yKey8]))
                                  .style("fill", (d) => color2(d[xKey8]))
                                  .style("opacity", 0.5)
                                  .on('mouseover', mouseover)
                                  .on('mouseleave', mouseleave);
    
    
      }

      {

        //hard-coded data
        const data2 = [
          {Playoffs: 'Made Playoffs', Wins: 45.95},
          {Playoffs: 'Missed Playoffs', Wins: 27.0}
        ];
    
        //keys for simplicity sake
        xKey9 = "Playoffs"
        yKey9 = "Wins"
    
    
        // Create X scale
        x9 = d3.scaleBand()
                    .domain(d3.range(data2.length))
                    .range([margin.left, width - margin.right])
                    .padding(0.1); 
    
        // Add x axis 
        svg_bar7.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(x7)
                .tickFormat(i => data2[i][xKey9]))   
        .attr("font-size", '20px')
        .call((g) => g.append("text")
                      .attr("x", width - margin.right) 
                      .attr("y", margin.bottom - 4)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(xKey9)
      );
    
        // Find max y 
        let maxY9 = d3.max(data2, (d) => { return d[yKey9]; });
        maxY9 = (Number(maxY9) + 5).toString()
    
        // Create Y scale
        y9 = d3.scaleLinear()
                    .domain([0, maxY9])
                    .range([height - margin.bottom, margin.top]); 
    
        // Add y axis 
        svg_bar7.append("g")
            .attr("transform", `translate(${margin.left}, 0)`) 
            .call(d3.axisLeft(y9)) 
            .attr("font-size", '20px') 
            .call((g) => g.append("text")
                          .attr("x", 0)
                          .attr("y", margin.top)
                          .attr("fill", "black")
                          .attr("text-anchor", "end")
                          .text(yKey9)
          );

          //adding title
        svg_bar7.append('text')
            .attr('x', width /2)
            .attr('y', 0 - (margin.top / 2))
            .attr('text-anchor', 'middle')
            .style('font-size', '18px')
            .style('fill', 'black')
            .attr("font-weight", 700)
            .text('Average Wins For Teams that Made and Missed Playoffs');

        const mouseover = (event, d) => { 
            tooltip3.html(
                `Wins: ${ d.Wins }`)
                    .style('opacity', 1);
              };

        const mouseleave = () => {
            tooltip3.style('opacity', 0);
              };
    
    
        //add bars
        myBar7 = svg_bar7.selectAll("rect")
                                .data(data2)
                                .enter()
                                .append("rect")
                                  .attr("class", "bar")
                                  .attr("x", (d, i) => x9(i))
                                  .attr("y", (d) => y9(d[yKey9]))
                                  .attr("width", x9.bandwidth())
                                  .attr("height", (d) => (height - margin.bottom) - y9(d[yKey9]))
                                  .style("fill", (d) => color2(d[xKey9]))
                                  .style("opacity", 0.5)
                                  .on('mouseover', mouseover)
                                  .on('mouseleave', mouseleave);
    
    
      }

      {

        //hard-coded data
        const data2 = [
          {Playoffs: 'Made Playoffs', FG_PCT: .4662},
          {Playoffs: 'Missed Playoffs', FG_PCT: .4490}
        ];
    
        //keys for simplicity sake
        xKey10 = "Playoffs"
        yKey10 = "FG_PCT"
    
    
        // Create X scale
        x10 = d3.scaleBand()
                    .domain(d3.range(data2.length))
                    .range([margin.left, width - margin.right])
                    .padding(0.1); 
    
        // Add x axis 
        svg_bar8.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(x10)
                .tickFormat(i => data2[i][xKey10]))   
        .attr("font-size", '20px')
        .call((g) => g.append("text")
                      .attr("x", width - margin.right) 
                      .attr("y", margin.bottom - 4)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(xKey10)
      );
    
        // Find max y 
        let maxY10 = d3.max(data2, (d) => { return d[yKey10]; });
        maxY10 = (Number(maxY10) + .05).toString()
    
        // Create Y scale
        y10 = d3.scaleLinear()
                    .domain([0, maxY10])
                    .range([height - margin.bottom, margin.top]); 
    
        // Add y axis 
        svg_bar8.append("g")
            .attr("transform", `translate(${margin.left}, 0)`) 
            .call(d3.axisLeft(y10)) 
            .attr("font-size", '20px') 
            .call((g) => g.append("text")
                          .attr("x", 0)
                          .attr("y", margin.top)
                          .attr("fill", "black")
                          .attr("text-anchor", "end")
                          .text(yKey10)
          );

          //adding title
        svg_bar8.append('text')
            .attr('x', width /2)
            .attr('y', 0 - (margin.top / 2))
            .attr('text-anchor', 'middle')
            .style('font-size', '18px')
            .style('fill', 'black')
            .attr("font-weight", 700)
            .text('Average Field Goal Percentage For Teams that Made and Missed Playoffs');

        const mouseover = (event, d) => { 
            tooltip3.html(
                `Percentage: ${ ((d.FG_PCT) * 100).toFixed(2) }%`)
                    .style('opacity', 1);
              };

        const mouseleave = () => {
            tooltip3.style('opacity', 0);
              };
    
    
        //add bars
        myBar8 = svg_bar8.selectAll("rect")
                                .data(data2)
                                .enter()
                                .append("rect")
                                  .attr("class", "bar")
                                  .attr("x", (d, i) => x10(i))
                                  .attr("y", (d) => y10(d[yKey10]))
                                  .attr("width", x10.bandwidth())
                                  .attr("height", (d) => (height - margin.bottom) - y10(d[yKey10]))
                                  .style("fill", (d) => color2(d[xKey10]))
                                  .style("opacity", 0.5)
                                  .on('mouseover', mouseover)
                                  .on('mouseleave', mouseleave);
    
    
      }

      {

        //hard-coded data
        const data2 = [
          {Playoffs: 'Made Playoffs', FT_PCT: .78235},
          {Playoffs: 'Missed Playoffs', FT_PCT: .7593}
        ];
    
        //keys for simplicity sake
        xKey11 = "Playoffs"
        yKey11 = "FT_PCT"
    
    
        // Create X scale
        x11 = d3.scaleBand()
                    .domain(d3.range(data2.length))
                    .range([margin.left, width - margin.right])
                    .padding(0.1); 
    
        // Add x axis 
        svg_bar9.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(x11)
                .tickFormat(i => data2[i][xKey11]))   
        .attr("font-size", '20px')
        .call((g) => g.append("text")
                      .attr("x", width - margin.right) 
                      .attr("y", margin.bottom - 4)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(xKey11)
      );
    
        // Find max y 
        let maxY11 = d3.max(data2, (d) => { return d[yKey11]; });
        maxY11 = (Number(maxY11) + .05).toString()
    
        // Create Y scale
        y11 = d3.scaleLinear()
                    .domain([0, maxY11])
                    .range([height - margin.bottom, margin.top]); 
    
        // Add y axis 
        svg_bar9.append("g")
            .attr("transform", `translate(${margin.left}, 0)`) 
            .call(d3.axisLeft(y11)) 
            .attr("font-size", '20px') 
            .call((g) => g.append("text")
                          .attr("x", 0)
                          .attr("y", margin.top)
                          .attr("fill", "black")
                          .attr("text-anchor", "end")
                          .text(yKey11)
          );

          //adding title
        svg_bar9.append('text')
            .attr('x', width /2)
            .attr('y', 0 - (margin.top / 2))
            .attr('text-anchor', 'middle')
            .style('font-size', '18px')
            .style('fill', 'black')
            .attr("font-weight", 700)
            .text('Average Free Throw Percentage For Teams that Made and Missed Playoffs');

        const mouseover = (event, d) => { 
            tooltip3.html(
                `Percentage: ${ ((d.FT_PCT) * 100).toFixed(2) }%`)
                    .style('opacity', 1);
              };

        const mouseleave = () => {
            tooltip3.style('opacity', 0);
              };
    
    
        //add bars
        myBar9 = svg_bar9.selectAll("rect")
                                .data(data2)
                                .enter()
                                .append("rect")
                                  .attr("class", "bar")
                                  .attr("x", (d, i) => x11(i))
                                  .attr("y", (d) => y11(d[yKey11]))
                                  .attr("width", x11.bandwidth())
                                  .attr("height", (d) => (height - margin.bottom) - y11(d[yKey11]))
                                  .style("fill", (d) => color2(d[xKey11]))
                                  .style("opacity", 0.5)
                                  .on('mouseover', mouseover)
                                  .on('mouseleave', mouseleave);
    
    
      }
    //clear brushes
    function clear() {
        svg1.call(brush1.move, null);

        svg_scatter2.call(brush_scatter2.move, null)
    }

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
        myCircles_scatter.classed("brushed", function (d) {
        return isBrushed(coords, x1(d[xKey1]), y1(d[yKey1]));
        })

        //Give bold outline to all bars in bar chart with corresponding to species selected by Scatterplot2 brush
        myBar.classed("brushed", function (d) {
        return selected_teams.has(d[xKey2]);
        })

        
        myBar.classed("brushed", function (d) {
        return selected_teams.has(d[xKey2]);
        })

        myBar2.classed("brushed", function (d) {
        return selected_teams.has(d[xKey4]);
        })      
        
        myBar3.classed("brushed", function (d) {
        return selected_teams.has(d[xKey5]);
        })

        myBar4.classed("brushed", function (d) {
        return selected_teams.has(d[xKey6]);
            })

        // //TODO: Find coorindates of brushed region
        // let coords = d3.brushSelection(this);



        // //giving each circle in first scatterplot the brushed classed attributes (in css file)
        // // these are giving it a black stroke (outline), and keeping the opacity consistent
        // myCircles1.classed("brushed", function (d) {
        //     return isBrushed(coords, x1(d[xKey1]), y1(d[yKey1]))

        
        // })

        // //same thing as above, outlines any items in the second scatter plot that are on the same
        // // row in the iris.csv dataset as the points that are being brushed in the first scatterplot
        // myCircles_scatter.classed("brushed", function (d) {
        // return isBrushed(coords, x1(d[xKey1]), y1(d[yKey1]))
        // })

    }
    // Call when Scatterplot2 is brushed 
    function updateChart2(brushEvent) {

        //Find coordinates of brushed region 
        let coords = d3.brushSelection(this);

        //Start an empty set that you can store names of selected species in 
        let selected_teams = new Set();

        //Give bold outline to all points within the brush region in Scatterplot2 & collected names of brushed species
        myCircles_scatter.classed("brushed", function (d) {

        is_selected = isBrushed(coords, x3(d[xKey3]), y3(d[yKey3]));

        if (is_selected) {
            selected_teams.add(d[xKey2]);
        }
        return is_selected;
        })

        //Give bold outline to all points in Scatterplot1 corresponding to points within the brush region in Scatterplot2
        myCircles1.classed("brushed", function (d) {
        return isBrushed(coords, x3(d[xKey3]), y3(d[yKey3]));
        })

        
        myBar.classed("brushed", function (d) {
        return selected_teams.has(d[xKey2]);
        })

        myBar2.classed("brushed", function (d) {
        return selected_teams.has(d[xKey4]);
        })      
        
        myBar3.classed("brushed", function (d) {
        return selected_teams.has(d[xKey5]);
        })

        myBar4.classed("brushed", function (d) {
        return selected_teams.has(d[xKey6]);
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



