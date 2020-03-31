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

    dc.renderAll();
//must be called or charts wont render.    
}