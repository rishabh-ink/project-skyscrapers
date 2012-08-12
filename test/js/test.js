/* Author: See /humans.txt

*/

"use strict";

require.config({
	paths: {
		// libraries
		'lib.use': "../../js/lib/requirejs/addons/use", // documentup.com/tbranyen/use.js
		'lib.jquery': "lib/jquery-1.7.2", // jquery.com,
		'lib.jquery-mobile': "../../js/lib/jquery-mobile/jquery.mobile-1.1.1.js", // jquerymobile.com
		'lib.bootstrap': "../../js/lib/bootstrap/bootstrap", // twitter.github.com/bootstrap
		'lib.debug': "../../js/lib/ba.debug/ba.debug", // benalman.com/code/projects/javascript-debug
		'lib.domready': "../../js/lib/requirejs/addons/domReady", // requirejs.com/docs/download.html#domReady
		'lib.knockoutjs': "../../js/lib/knockoutjs/knockout-2.1.0.debug", // knockoutjs.com
		// /libraries

		// test libraries
		'lib.qunit': "lib/qunit/qunit-1.9.0",
		// /test libraries

		// application core
		'Core': "../../js/module/Core",
		// /application core

		// models
		'model.Service': "../../js/model/Service",
		'model.Stat': "../../js/model/Stat",
		// /models

		// viewmodels
		'viewmodel.Home': "../../js/viewmodel/Home",
		'viewmodel.Report': "../../js/viewmodel/Report",
		'viewmodel.Services': "../../js/viewmodel/Services",
		'viewmodel.Stats': "../../js/viewmodel/Stats",
		'viewmodel.Thanks': "../../js/viewmodel/Thanks",
		// /viewmodels

		// utilities
		'util.ajax.Communication': "../../js/modules/util/ajax/Communication",
		'util.error.ErrorHandler': "../../js/modules/util/error/ErrorHandler",
		'util.data.Constants': "../../js/modules/util/data/Constants"
		// /utilities
	},

	// use.js configuration for non-amd libraries
	use: {
		'lib.debug': {
			attach: "debug"
		},
		'lib.bootstrap': {
			attach: "bootstrap"
		}
	}
	// /use.js configuration for non-amd libraries
});

require(["lib.domready", "Core", "lib.use!lib.debug", "lib.qunit"], function(domReady, core, debug) {
	domReady(function() {
		debug.info("Starting Qunit Tests...");
		test("model.Stat", function() {
			expect(0);

			define(["model.Stat"], function(modelStat) {
				// Test data
				var testWhen = new Date();
				var testWhere = {
					lat: 55.6,
					lon: 54.7
				};
				var testCount = {
					boy: 4,
					girl: 3
				};

				// Set the values.
				modelStat.when = testWhen;
				modelStat.where = testWhere;
				modelStat.count = testCount;

				// Perform test.
				debug.log(modelStat.serialize());
			});
		});

	});
});





