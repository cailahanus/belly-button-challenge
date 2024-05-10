// Get URL
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

var globalData = [];

// Fetch the JSON data
d3.json(url).then(function(data) {
  // Extract necessary information
  globalData.push(data);
  init();
});

function init(){

  let data = globalData[0];
  console.log(data)
  const samples = data.samples;
  console.log("samples",samples);
  let labelsOTU_IDS = samples[0].otu_ids;
  console.log("test",labelsOTU_IDS)
  let hovertext = samples[0].otu_labels;
  //console.log("hover",hovertext)

  createMenu();

  // by default render the first item in the array
  updateBarChart(data.names[0]);
  updateBubble(data.samples[0].id);
  updateMetadata(data.metadata[0].id);
}




function createMenu(){
    d3.select("select")
      .selectAll("options")
      .data(globalData[0].names)
      .enter()
      .append("option")
      .text(function (d) {return d;})
      .attr("value", function (d) {return d;})
};


// Initial chart rendering
function updateMetadata(selectedSampleId){
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then(function(data) {
    // Extract necessary information
    //globalData.push(data);
    //init();
  
  metadata3 = data.metadata;

  let selectedSample = metadata3.filter(sample => sample.id == selectedSampleId);
  
  // Select the container element to display metadata
  let metadataContainer = d3.select("#sample-metadata");
  
  // Clear any existing metadata content
  metadataContainer.html("");

  console.log("metadata")
  console.log(metadata3);
  console.log(selectedSample);
  console.log(selectedSample[0]);
  
  // Iterate through each key-value pair in metadata and display them
  // metadataContainer.append("p").text(`ID: ${selectedSample[0].id}`);
  // metadataContainer.append("p").text(`Ethnicity: ${selectedSample[0].ethnicity}`);
  // metadataContainer.append("p").text(`Gender: ${selectedSample[0].gender}`);
  // metadataContainer.append("p").text(`Age: ${selectedSample[0].age}`);
  // metadataContainer.append("p").text(`Location: ${selectedSample[0].location}`);
  // metadataContainer.append("p").text(`BBType: ${selectedSample[0].bbtype}`);
  // metadataContainer.append("p").text(`WFREQ: ${selectedSample[0].wfreq}`);

  metadataContainer.append("p").text(`ID: ${selectedSample[0].id}`);
  metadataContainer.append("p").text(`Ethnicity: ${selectedSample[0].ethnicity}`);
  metadataContainer.append("p").text(`Gender: ${selectedSample[0].gender}`);
  metadataContainer.append("p").text(`Age: ${selectedSample[0].age}`);
  metadataContainer.append("p").text(`Location: ${selectedSample[0].location}`);
  metadataContainer.append("p").text(`BBType: ${selectedSample[0].bbtype}`);
  metadataContainer.append("p").text(`WFREQ: ${selectedSample[0].wfreq}`);
  console.log(metadataContainer);
  });

}


function updateBubble(selectedSampleId){

  samples2 = globalData[0].samples;
  let selectedSample = samples2.filter(sample => sample.id === selectedSampleId);
  console.log("bubble")
  console.log(selectedSample[0]);
  // Create a trace for the bubble chart
  const trace1 = {
    x: selectedSample[0].otu_ids,
    y: selectedSample[0].sample_values,
    text: selectedSample[0].otu_labels,
    mode: 'markers',
    marker: {
      size: selectedSample[0].sample_values,
      color: selectedSample[0].otu_ids,
      colorscale: 'Earth', 
      opacity: 0.6
    }
  };

  // Define layout for the bubble chart
  const layout = {
    title: 'Bubble Chart of Samples',
    xaxis: { title: 'OTU ID' },
    yaxis: { title: 'Sample Values' },
    showlegend: false,
    height: 600 
  };

  // Create the bubble chart
  Plotly.newPlot("bubble", [trace1], layout);
}


function updateBarChart(selectedSampleId) {
    // Get selected sample

    samples = globalData[0].samples;

    console.log("hello")
    console.log(samples);

    //let selectedSampleId = dropdown.property("value");
    let selectedSample = samples.filter(sample => sample.id === selectedSampleId);
    //let dropdownMenu = d3.select("#selDataset");

    //console.log(selectedSample);

    let select_top10OtuIds = selectedSample[0].otu_ids.slice(0, 10).reverse();
    let select_top10SampleValues = selectedSample[0].sample_values.slice(0, 10).reverse();
    let select_top10OtuLabels = selectedSample[0].otu_labels.slice(0, 10).reverse();



  // Update data for the bar chart
  const dataForChart = [{
    x: select_top10SampleValues,
    y: select_top10OtuIds.map(id => `OTU ${id}`),
    text: select_top10OtuLabels,
    type: 'bar',
    orientation: 'h'
  }];

  // Define layout for the bar chart
  const layout = {
    title: 'Top 10 OTUs',
    xaxis: { title: 'Sample Values' },
    yaxis: { title: 'OTU ID' }
  };

  // Update the bar chart
  Plotly.newPlot("bar", dataForChart, layout);
  
}


function changeSubjectID(subjectID){
  console.log(subjectID);
  updateBarChart(subjectID);
  updateBubble(subjectID);
  updateMetadata(subjectID);
}

// init();



