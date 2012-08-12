"use strict";

/**
 * Answer
 * The Answer module.
 * @author rishabhsrao
 */
define(["lib.use!lib.debug", "lib.knockoutjs", "model.item.Owner", "model.item.Comment"], function(debug, ko, Owner, Comment) {
	debug.log("Loading model.item.Answer");
	var Module = function() {
		var self = this;

		self.question_id = ko.observable();
		self.creation_date = ko.observable();
		self.last_activity_date = ko.observable();
		self.last_edit_date = ko.observable();
		self.score = ko.observable();
		self.answer_count = ko.observable();
		self.body = ko.observable();
		self.up_count_vote = ko.observable();
		self.down_vote_count = ko.observable();
		self.favorite_count = ko.observable();
		self.view_count = ko.observable();
		self.is_accepted = ko.observable();
		self.title = ko.observable();
		self.owner = ko.observable();

		self.comments = ko.observableArray([]);

		self.answers = ko.observableArray([]);

		self.link = ko.observable();

		self.applyMappings = function(value) {
			debug.log("model.item.Answer", "applyMappings", value);
			self.question_id(value.question_id);
			self.creation_date(value.creation_date);
			self.last_activity_date(value.last_activity_date);
			self.last_edit_date(value.last_edit_date);
			self.score(value.score);
			self.answer_count(value.answer_count);
			self.body(value.body);
			self.up_count_vote(value.up_count_vote);
			self.down_vote_count(value.down_vote_count);
			self.favorite_count(value.favorite_count);
			self.view_count(value.view_count);
			self.is_accepted(value.is_accepted);
			self.title(value.title);
			self.link(value.link);

			var newOwner = Owner.getModule();
			newOwner.applyMappings(value.owner);
			self.owner(newOwner);

			if(typeof value.comments !== "undefined") {
				ko.utils.arrayForEach(value.comments, function(comment) {
					var newComment = Comment.getModule();
					newComment.applyMappings(comment);
					self.comments.push(newComment);
				});
			}
		};

		return self;
	};

	return {
		getModule: function() {
			return new Module();
		}
	};
});