Tinytest.add('NodeCSV - Stream test', function (test) {

    process.stdout.write('----------- Stream example ----------- \n');

    var generator = CSV.generate({seed: 1, columns: 2, length: 20});
    var parser = CSV.parse();
    var transformer = CSV.transform(function(data){
        return data.map(function(value){return value.toUpperCase()});
    });
    var stringifier = CSV.stringify();

    generator.on('readable', function(){
        while(data = generator.read()){
            parser.write(data);
        }
    });

    parser.on('readable', function(){
        while(data = parser.read()){
            transformer.write(data);
        }
    });

    transformer.on('readable', function(){
        while(data = transformer.read()){
            stringifier.write(data);
        }
    });

    stringifier.on('readable', function(){
        while(data = stringifier.read()){
            process.stdout.write(data);
        }
    });

});
