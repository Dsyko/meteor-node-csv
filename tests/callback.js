Tinytest.add('NodeCSV - Callback test', function (test) {

    process.stdout.write('----------- Callback example ----------- \n');

    CSV.generate({seed: 1, columns: 2, length: 20}, function(err, data){
        CSV.parse(data, function(err, data){
            CSV.transform(data, function(data){
                return data.map(function(value){return value.toUpperCase()});
            }, function(err, data){
                CSV.stringify(data, function(err, data){
                    process.stdout.write(data);
                });
            });
        });
    });

});
