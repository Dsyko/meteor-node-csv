Tinytest.add('NodeCSV - Pipe test', function (test) {

    process.stdout.write('----------- Pipe example ----------- \n');

    CSV.generate({seed: 1, columns: 2, length: 20})
        .pipe(CSV.parse())
        .pipe(CSV.transform(function(record){
            return record.map(function(value){
                return value.toUpperCase()
            });
        }))
        .pipe(CSV.stringify ())
        .pipe(process.stdout);

});
