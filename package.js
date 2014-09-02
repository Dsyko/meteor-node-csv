Package.describe({
	summary: "node-csv npm packaged for meteor.",
	version: "0.3.7",
	git: "https://github.com/Dsyko/meteor-node-csv.git",
	name: "dsyko:node-csv-npm"
});

Package.on_use(function (api) {
	if (api.versionsFrom) {
		api.versionsFrom("METEOR@0.9.0");
	}

	api.addFiles(["lib/node-csv.js"], "server");

	if (typeof api.export !== "undefined") {
		api.export("CSV", "server");
	}
});

Npm.depends({"csv":"0.3.6"});