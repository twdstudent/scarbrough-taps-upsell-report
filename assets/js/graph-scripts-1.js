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
     show_single_v_doubles(ndx);
//    show_single_v_double_selector(ndx);
    
    dc.renderAll();
//must be called or charts wont render.   
console.log('upsellData'); 
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

//Pie chart
//function show_single_v_double_selector(ndx) {
//    var dim = ndx.dimension(dc.pluck('double'));
//    var group = dim.group().reduceSum(dc.pluck('single'));
//    dc.pieChart('#double-percentage')
//        .width(700)
//        .height(360)
//       .radius(180)
//        .legend(dc.legend().x(50).y(30).itemHeight(15).gap(5))
//        .transitionDuration(1500)
//        .dimension(dim)
//        .group(group);
//}

function show_single_v_doubles(ndx) {
    var ndx = crossfilter(upsellData);
        var name_dim = ndx.dimension(dc.pluck('employee'));
        var spendByNameStoreA = name_dim.group().reduceSum(function (d) {
                if (d.double === 'A') {
                    return +d.total;
                } else {
                    return 0;
                }
            });
        var spendByNameStoreB = name_dim.group().reduceSum(function (d) {
                if (d.single === 'B') {
                    return +d.total;
                } else {
                    return 0;
                }
            });
        var stackedChart = dc.barChart("#stacked-chart-here");
        stackedChart
            .width(500)
            .height(400)
            .dimension(name_dim)
            .group(spendByNameStoreA, "double")
            .stack(spendByNameStoreB, "single")
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .legend(dc.legend().x(420).y(0).itemHeight(15).gap(5));
        stackedChart.margins().right = 100;
        dc.renderAll();
}