"use strict";

/**
 * Owner
 * The Owner module.
 * @author rishabhsrao
 */
define(["lib.use!lib.debug", "lib.knockoutjs"], function(debug, ko) {
	debug.log("Loading model.item.Owner");
	var Module = function() {
		var self = this;

		self.user_id = ko.observable();
		self.display_name = ko.observable();
		self.reputation = ko.observable();
		self.user_type = ko.observable();
		self.profile_image = ko.observable();
		self.link = ko.observable();
		self.accept_rate = ko.observable();


		self.applyMappings = function(value) {
			self.user_id(value.user_id);
			self.display_name(value.display_name);
			self.reputation(value.reputation);
			self.reputation(value.reputation);
			self.profile_image(value.profile_image);
			self.link(value.link);
			self.accept_rate(value.accept_rate);
		};

		return self;
	};

	return {
		getModule: function() {
			return new Module();
		}
	};
});