Package.describe({
	summary: "node-csv npm packaged for meteor."
});

Package.on_use(function (api) {
	api.add_files([
		'lib/node-csv.js'
	], 'server'
	);
	if (typeof api.export !== 'undefined') {
		api.export("CSV", "server");
	}

});
Npm.depends({'csv':"0.3.6"});
