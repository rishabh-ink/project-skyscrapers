/* Author: See /humans.txt

*/

"use strict";

require.config({
	paths: {
		// libraries
		'lib.use': "lib/requirejs/addons/use", // documentup.com/tbranyen/use.js
		'lib.domready': "lib/requirejs/addons/domReady", // requirejs.com/docs/download.html#domReady
		'jquery': "lib/jquery/jquery-1.7.2", // jquery.com,
		'lib.bootstrap': "lib/bootstrap/bootstrap", // twitter.github.com/bootstrap,
		'lib.bootstrap.carousel': "lib/bootstrap/carousel",
		'lib.bootstrap.dropdown': "lib/bootstrap/dropdown",
		'lib.bootstrap.tooltip': "lib/bootstrap/tooltip",
		'lib.debug': "lib/ba.debug/ba.debug", // benalman.com/code/projects/javascript-debug
		'lib.knockoutjs': "lib/knockoutjs/knockout-2.1.0.debug", // knockoutjs.com
		'lib.select2': "lib/select2/select2", // ivaynberg.github.com/select2
		'lib.qunit': "lib/qunit/qunit", // qunitjs.com
		// /libraries

		// application core
		'Core': "module/Core",
		// /application core

		// models
		'model.item.TimelineEvent': "module/model/item/TimelineEvent",
		'model.item.Answer': "module/model/item/Answer",
		'model.item.Comment': "module/model/item/Comment",
		'model.item.Owner': "module/model/item/Owner",
		'model.item.Question': "module/model/item/Question",
		'model.item.Skyscraper': "module/model/item/Skyscraper",
		// /models

		// viewmodels
		'viewmodel.Skyscraper': "module/viewmodel/SkyscraperViewmodel",
		// /viewmodels

		// utilities
		'util.Communication': "module/util/Communication",
		'util.ErrorHandler': "module/util/ErrorHandler",
		'util.Constants': "module/util/Constants",
		'util.Storage': "module/util/Storage",
		// /utilities

		// tests
		'test.Core': "test/Core",
		'test.model.item.QuestionTest': "test/model/item/QuestionTest",
		'test.viewmodel.Skyscraper': "test/viewmodel/SkyscraperViewmodelTest"
		// /tests
	},

	// use.js configuration for non-amd libraries
	use: {
		'lib.debug': {
			'attach': "debug"
		},
		'lib.bootstrap': {
			'attach': "bootstrap"
		},
		'lib.select2': {
			'attach': "Select2"
		}
	},
	// /use.js configuration for non-amd libraries

	// shim configuration
	shim: {
		'lib.bootstrap': {
			deps: [
				'jquery'
			]
		},


		'lib.bootstrap.tooltip': {
			deps: [
				'lib.bootstrap'
			]
		},

		'lib.bootstrap.dropdown': {
			deps: [
				'lib.bootstrap'
			]
		},

		'lib.bootstrap.carousel': {
			deps: [
				'lib.bootstrap'
			]
		},

		'lib.select2': {
			deps: [
				'jquery'
			]
		},

		'model.item.Answer': {
			deps: [
				'model.item.Comment',
				'model.item.Owner'
			]
		},

		'model.item.Comment': {
			deps: [
				'model.item.Owner'
			]
		},

		'model.item.Question': {
			deps: [
				'model.item.Comment',
				'model.item.Owner',
				'model.item.Answer'
			]
		},

		'model.item.Skyscraper': {
			deps: [
				'model.item.Question'
			]
		},

		'viewmodel.Skyscraper': {
			deps: [
				// 'lib.knockoutjs',
				// 'jquery',
				// 'lib.use!lib.select2',
				// 'lib.use!lib.debug',
				// 'util.Communication',
				'model.item.Skyscraper'
			]
		},

		'Core': {
			deps: [
				'lib.use!lib.debug',
				'jquery',
				'lib.use',
				'lib.domready',
				'lib.knockoutjs',
				'lib.use!lib.select2',
				'lib.use!lib.bootstrap',
				'lib.bootstrap.tooltip',
				'lib.bootstrap.dropdown',
				'util.Communication',
				'util.ErrorHandler',
				'util.Constants',
				'util.Storage',
				'viewmodel.Skyscraper'
			]
		}
	}
	// /shim configuration
});

require(["lib.domready",	"lib.use!lib.debug",	"Core"],
function(domReady,				debug,								core) {
	domReady(function() {
		debug.info("Starting application... Please stand by...");
		core.initialize();
	});
});





