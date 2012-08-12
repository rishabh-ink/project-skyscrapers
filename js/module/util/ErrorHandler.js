"use strict";

/**
 * ErrorHandler
 * The ErrorHandler module.
 * @author rishabhsrao
 */
define(["lib.use!lib.debug"], function(debug) {
	debug.log("Loading util.ErrorHandler");
	var Module = function() {
		var self = this;

		return self;
	};

	return {
		getModule: function() {
			return new Module();
		}
	};
});