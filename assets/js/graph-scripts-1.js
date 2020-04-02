queue()
    .defer(d3.csv, "data/data-test-1.csv")
    .await(makeGraphs);

//Call the defer() method, and this takes two arguments.
//The first is the format of the data that we want to load, in this case a CSV file.
//The second argument is the path to the CSV file.

//Call the await() method.
//The await method() takes 1 argument, which is the name of a function 
//that we want to call when the data is ready.

function makeGraphs(error, upsellData) {
    var ndx = crossfilter(upsellData);

     show_employee_selector(ndx);
     show_period_selector(ndx);
     show_percent_singles_doubles(ndx, "single", "#percenatage-single");
     show_percent_singles_doubles(ndx, "Double", "#percenatage-double");
    
    dc.renderAll();
//must be called or charts wont render.   
}

//selection boxes

function show_employee_selector(ndx) {
    var dim = ndx.dimension(dc.pluck('employee'));
    var group = dim.group();

    dc.selectMenu("#employee-selector")
        .dimension(dim)
        .group(group);
}

function show_period_selector(ndx) {
    var dim = ndx.dimension(dc.pluck('period'));
    var group = dim.group();

    dc.selectMenu("#period-selector")
        .dimension(dim)
        .group(group);
}

//percentage display



