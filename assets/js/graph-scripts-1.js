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

    show_single_v_double_selector(ndx);
    show_employee_selector(ndx);
    show_period_selector(ndx);

    dc.renderAll();
//must be called or charts wont render.   
console.log('upsellData') 
}

//Pie chart
function show_single_v_double_selector(ndx) {
    var dim = ndx.dimension(dc.pluck('double'));
    var group = dim.group().reduceSum(dc.pluck('single'));
    dc.pieChart('#double-percentage')
        .width(700)
        .height(360)
        .radius(180)
        .legend(dc.legend().x(50).y(30).itemHeight(15).gap(5))
        .transitionDuration(1500)
        .dimension(dim)
        .group(group);
}