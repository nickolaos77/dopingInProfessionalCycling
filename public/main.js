'use strict'          
            fetch('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
                .then(function(response) { 
// Convert to JSON
	           return response.json();
               }).then(function(j) {//j is the returned JavaScript object                
                const w = 800;
                const h = 600;
                const padding = 100;
                const svg = d3.select("#container")
                              .append("svg")
                              .attr("width",w)
                              .attr("height",h)
                
//Scales              
                  const xScale = d3.scaleTime()
                                   .domain( [new Date(2020,0,1,2,39,55), new Date(2020,0,1,2,36,40)])
                                   .range([padding, w - padding])
                
                  const yScale = d3.scaleLinear()
                                 .domain([36, 1 ])
                                 .range([h - padding, padding])
//Convert to Date object                 
                  
                  var i = 0
                  function formatTime (t){
                      i++
                      var mins = t.slice(0,2);
                      var secs = t.slice(3,5);
                      return( new Date (2020,0,1,2,mins,secs)  )
                  } 
//Tooltip        
               const gCont = svg.append('g').attr('transform', "translate(0,0)")
                
               const tooltip =  gCont.append("rect")					
                                     .attr('fill','black').attr('width',380).attr('height',55)
                                     .attr('x',350)
                                     .attr('y',300).style('opacity','0');
                 
                
//Circles  
                svg.selectAll("circle")
                   .data(j)
                   .enter()
                   .append("circle")
                   .attr("cx" , (d, i) => xScale(formatTime( (d.Time) ) )  )
                   .attr("cy" , (d, i) => yScale(i+1))
                   .attr("r", 5.5)
                   .attr("class","circle")
                   .attr("fill", (d,i)=> d.Doping ? "red" : "green"   )
                   .on('mouseover', (element)=> {
                    let nameCountry = element.Name + ' : ' + element.Nationality;
                    let yearTime    = 'Year:' + element.Year +  ' , ' + 'Time:' + element.Time;
                    let reason      = element.Doping;
                    tooltip.style('opacity','1');
                    //name:country
                    gCont.append('text').attr('id','nameCountry').text(nameCountry).attr('x',540).attr('y', 315)
                          .attr('text-anchor','middle').attr("fill","white").style('font-size','13px');                    
                    //Year:time
                    gCont.append('text').attr('id','yearTime').text(yearTime).attr('x',540).attr('y', 330)
                          .attr('text-anchor','middle').attr("fill","white").style('font-size','13px'); 
                    //Reason 
                    gCont.append('text').attr('id','reason').text(reason).attr('x',540).attr('y', 350)
                          .attr('text-anchor','middle').attr("fill","white").style('font-size','13px');
                } )
                    .on('mouseout', (event)=>{ 
                    tooltip.style('opacity','0');
                    document.getElementById('nameCountry').remove();
                    document.getElementById('yearTime').remove()
                    document.getElementById('reason').remove();  
                
                })
                
              

//Labels Bug this block of code works in this position alhtough it does not works lower      
                 svg.selectAll('text')
                     .data(j)
                     .enter()
                     .append('text')
                     .text( d=>d.Name + '' )
                     .attr('x', (d, l) =>  xScale(formatTime( (d.Time) ) ) +10  )
                     .attr('y', (d, m) => yScale(m+1) + 5)
                     .style('font-size','14px');               
                      
//Axes
                 const yAxis = d3.axisLeft(yScale);
                 svg.append("g").attr("transform", "translate(100," + (0) + ")").call(yAxis);
                
                 const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%M%:%S")).ticks(10); ;
                 svg.append("g").attr("transform",  "translate(0," + (h - padding) + ")").call(xAxis);  

//Labels Bug this block of code does not work in this position alhtough it works higher      
//                 svg.selectAll('text')
//                     .data(j)
//                     .enter()
//                     .append('text')
//                     .text( d=>d.Name + '' )
//                     .attr('x', (d, l) =>  xScale(formatTime( (d.Time) ) ) +'20px'  )
//                     .attr('y', (d, m) => yScale(m+1))
       
//Graph Texts
                 svg.append('text').html('Doping in Professional Bicycle Racing')
                     .style("font-size","28px").style("font-weight","600") 
                     .attr('text-anchor','middle').attr('x',w/2).attr('y',40);
                
                 svg.append('text').html("35 Fastest times up Alpe d'Huez")
                     .style("font-size","20px").style("font-weight","500") 
                     .attr('text-anchor','middle').attr('x',w/2).attr('y',65);
                
                 svg.append('text').html("Normalized to 13.8km distance")
                     .style("font-size","13px").style("font-weight","300") 
                     .attr('text-anchor','middle').attr('x',w/2).attr('y',82);                
                
                svg.append("text")
                    .attr("transform","rotate(-90)").attr("y",padding+15).attr("x",-100)
                    .style("text-anchor", "end")
                    .text("Ranking");
                
                svg.append("text")
                      .attr( "x" , w-padding).attr("y", h-padding -2)
                      .style("text-anchor","end")
                      .text("Time");
                //Legend with text and circles
                svg.append("text")
                      .attr( "x" , w-padding-200).attr("y", h/2 -26)
                      .style("text-anchor","start").style('font-size', '14px')
                      .text("Riders with dopping allegations"); 
                
                svg.append('circle')
                   .attr('cx', w-padding-210).attr("cy", h/2 -30).attr("r" , 5).attr('fill','red');                
                
                svg.append("text")
                      .attr( "x" , w-padding-200).attr("y", h/2-10)
                      .style("text-anchor","start").style('font-size', '14px')
                      .text("Riders without dopping allegations");

                svg.append('circle')
                   .attr('cx', w-padding-210).attr("cy", h/2 -14).attr("r" , 5).attr('fill','green');      
});
            