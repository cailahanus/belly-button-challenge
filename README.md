# belly-button-challenge

This assignment involves building an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbial species present in human navels. The dataset indicates that a few microbial species are common in most individuals, while others are rare.

The main tasks outlined include:
- Use D3 library to read the samples.json file from the provided URL.
- Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in an individual's sample. Use sample_values for bar chart values, otu_ids for labels, and otu_labels for hovertext.
- Create a bubble chart displaying each sample, with otu_ids for x values, sample_values for y values, sample_values for marker size, otu_ids for marker colors, and otu_labels for text values.
- Display the sample metadata, including demographic information, by displaying each key-value pair from the metadata JSON object on the page.
- Update all plots when a new sample is selected
