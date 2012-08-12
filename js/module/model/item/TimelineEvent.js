"use strict";

/**
 * TimelineEvent
 * The TimelineEvent module.
 * @author rishabhsrao
 */
define(["lib.use!lib.debug", "lib.knockoutjs"], function(debug, ko) {
	debug.log("Loading model.item.TimelineEvent");
	var Module = function() {
		var self = this;

		self.badge_id = ko.observable();
		self.comment_id = ko.observable();
		self.creation_date = ko.observable();
		self.detail = ko.observable();
		self.post_id = ko.observable();
		self.link = ko.observable();
		self.post_type = ko.observable();
		self.suggested_edit_id = ko.observable();
		self.timeline_type = ko.observable();
		self.title = ko.observable();
		self.user_id = ko.observable();

		self.applyMappings = function(value) {
			if(typeof value.badge_id !== "undefined")						{	self.badge_id(value.badge_id);	}
			if(typeof value.comment_id !== "undefined")					{	self.comment_id(value.comment_id);	}
			if(typeof value.detail !== "undefined")							{	self.detail(value.detail);	}
			if(typeof value.creation_date !== "undefined")			{	self.creation_date(value.creation_date); }
			if(typeof value.reputation !== "undefined")					{	self.reputation(value.reputation); }
			if(typeof value.post_id !== "undefined")						{	self.post_id(value.post_id);	}
			if(typeof value.link !== "undefined")								{	self.link(value.link); }
			if(typeof value.post_type !== "undefined")					{	self.post_type(value.post_type); }
			if(typeof value.suggested_edit_id !== "undefined")	{	self.suggested_edit_id(value.suggested_edit_id);	}
			if(typeof value.timeline_type !== "undefined")			{	self.timeline_type(value.timeline_type); }
			if(typeof value.title !== "undefined")							{	self.title(value.title);	}
			if(typeof value.user_id !== "undefined")						{	self.user_id(value.user_id); }
		};

		return self;
	};

	return {
		getModule: function() {
			return new Module();
		}
	};
});