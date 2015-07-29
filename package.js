Package.describe({
	summary: "node-csv npm packaged for meteor.",
	version: "0.4.5",
	git: "https://github.com/Dsyko/meteor-node-csv.git",
	name: "dsyko:node-csv-npm"
});

Npm.depends({"csv":"0.4.5"});

function configure(api) {
    api.versionsFrom("1.0");
}

Package.onUse(function (api) {
    configure(api);

	api.addFiles(["lib/node-csv.js"], "server");

	api.export("CSV", "server");

});


Package.onTest(function (api) {
    configure(api);

    api.use("tinytest@1.0.0");
    api.use("test-helpers@1.0.0");
    api.use("dsyko:node-csv-npm");

    api.addFiles([
        "tests/callback.js",
        "tests/stream.js",
        "tests/pipe.js"
    ], "server");
});
