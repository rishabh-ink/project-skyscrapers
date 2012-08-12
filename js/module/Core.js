"use strict";

define([	"jquery", "lib.use!lib.debug",	"viewmodel.Skyscraper",	"lib.knockoutjs",	"lib.bootstrap", "lib.bootstrap.carousel", "lib.bootstrap.dropdown", "lib.timeago"],
function(	jQuery,		debug,								skyscraperViewmodel,		ko,								bootstrap) {
	debug.log("Core", "Loading");
	/**
	 * Initializes this view model.
	 */
	var initialize = function() {
		debug.info("Core", "Initializing Core.");

		debug.info("Core", "initialize", "Applying bindings...");
		ko.applyBindings(skyscraperViewmodel.getModule());

		jQuery("[title]").tooltip();
	};

	/**
	 * Returns a string representation of the <code>Root</code>
	 * class.
	 */
	var toString = function() {
		return {
			classname: "viewmodel.Core",
			members: {}
		};
	};

	return {
		toString: toString,
		initialize: initialize
	};
});