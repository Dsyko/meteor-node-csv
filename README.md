meteor-node-csv
===============

[node-csv npm](http://www.adaltas.com/projects/node-csv/) wrapped for meteor

Add like so: `meteor add dsyko:meteor-node-csv`. This package exports the global `CSV`.

Adding this mrt package is equivalent to:

installing the node package
```
npm install csv
```

and including it in your project as CSV
```javascript
var CSV = require('csv');
```

This is useful for parsing CSV files to and from javascript arrays/objects.

A future is necessary for this streaming to work correctly. See: [Here](https://gist.github.com/possibilities/3443021)

Here is an example of using it to parse a User collection to a csv file.

```javascript

//Using the Router package to create a route, passing the response stream to our function
Meteor.Router.add('/exportUsers/:filename', function() {
	// curl http://localhost:3000/exportUsers/Users.csv
	// Should get a .csv file
	return exportCSV(this.response);
});

var exportCSV = function(responseStream){

   var userStream = createStream();
	// Set up a future, Stream doesn't work properly without it.
	var fut = new Future();
	var users = {};

	//Here this Package is used to parse a stream from an array to a string of CSVs.
   CSV().from(userStream)
	.to(responseStream)
	.transform(function(user, index){
	if(user._id){
	    var dateCreated = new Date(user.createdAt);
	    return [user.profile.name, user.emails[0].address, dateCreated.toString()];
	}else
	    return user;
	})
	.on('error', function(error){
		console.error('Error streaming CSV export: ', error.message);
	})
	.on('end', function(count){
		responseStream.end();
		fut.return();
	});

	//Write table headings for CSV to stream.
    userStream.write(["Name", "Email", "Date Created"]);

	users = Users.find({})

    //Pushing each user into the stream, If we could access the MongoDB driver we could
    //convert the Cursor into a stream directly, making this a lot cleaner.
    users.forEach(function (user) {
        userStream.write(user); //Stream transform takes care of cleanup and formatting.
        count += 1;
        if(count >= users.count())
            userStream.end();
    });

    return fut.wait();
};

//Creates and returns a Duplex(Read/Write) Node stream
//Used to pipe users from .find() Cursor into our CSV stream parser.
var createStream = function(){
	var stream = Npm.require('stream');
	var myStream = new stream.Stream();
	myStream.readable = true;
	myStream.writable = true;

	myStream.write = function (data) {
		myStream.emit('data', data);
		return true; // true means 'yes i am ready for more data now'
		// OR return false and emit('drain') when ready later
	};

	myStream.end = function (data) {
		//Node convention to emit last data with end
		if (arguments.length)
			myStream.write(data);

		// no more writes after end
		myStream.writable = false;
		myStream.emit('end');
	};

	myStream.destroy = function () {
		myStream.writable = false;
	};

	return myStream;
};

```
