"use strict";

/**
 * Comment
 * The Comment module.
 * @author rishabhsrao
 */
define(["lib.use!lib.debug", "lib.knockoutjs", "model.item.Owner"], function(debug, ko, Owner) {
	debug.log("Loading model.item.Comment");
	var Module = function() {
		var self = this;

		self.comment_id = ko.observable();
		self.post_id = ko.observable();
		self.creation_date = ko.observable();
		self.post_type = ko.observable();
		self.score = ko.observable();
		self.link = ko.observable();
		self.edited = ko.observable();
		self.body = ko.observable();
		self.owner = ko.observable();

		self.applyMappings = function(value) {
			debug.log("model.item.Comment", "applyMappings", value);
			self.comment_id(value.comment_id);
			self.post_id(value.post_id);
			self.creation_date(value.creation_date);
			self.post_type(value.post_type);
			self.score(value.score);
			self.link(value.link);
			self.edited(value.edited);
			self.body(value.body);

			var newOwner = Owner.getModule();
			newOwner.applyMappings(value.owner);

			self.owner(newOwner);
		};

		return self;
	};

	return {
		getModule: function() {
			return new Module();
		}
	};
});