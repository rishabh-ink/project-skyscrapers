"use strict";

/**
 * Question
 * The Question module.
 * @author rishabhsrao
 */
define(["lib.use!lib.debug", "lib.knockoutjs", "model.item.Owner", "model.item.Comment", "model.item.Answer"], function(debug, ko, Owner, Comment, Answer) {
	debug.log("Loading model.item.Question");
	var Module = function() {
		var self = this;

		self.question_id = ko.observable();
		self.creation_date = ko.observable();
		self.last_activity_date = ko.observable();
		self.score = ko.observable();
		self.answer_count = ko.observable();
		self.body = ko.observable();
		self.up_vote_count = ko.observable();
		self.down_vote_count = ko.observable();
		self.favorite_count = ko.observable();
		self.view_count = ko.observable();
		self.is_answered = ko.observable();
		self.title = ko.observable();
		self.owner = ko.observable();
		self.comments = ko.observableArray([]);
		self.answers = ko.observableArray([]);
		self.link = ko.observable();
		self.tags = ko.observableArray([]);

		self.applyMappings = function(value) {
			debug.log("model.item.Question", "applyMappings", value);
			self.question_id(value.question_id);
			self.creation_date(value.creation_date);
			self.last_activity_date(value.last_activity_date);
			self.score(value.score);
			self.answer_count(value.answer_count);
			self.body(value.body);
			self.up_vote_count(value.up_vote_count);
			self.down_vote_count(value.down_vote_count);
			self.favorite_count(value.favorite_count);
			self.view_count(value.view_count);
			self.is_answered(value.is_answered);
			self.title(value.title);
			self.link(value.link);

			if(typeof value.tags !== "undefined") {
				ko.utils.arrayForEach(value.tags, function(tag) {
					self.tags.push(tag);
				});
			}

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

			if(typeof value.answers !== "undefined") {
				ko.utils.arrayForEach(value.answers, function(answer) {
					var newAnswer = Answer.getModule();
					newAnswer.applyMappings(answer);
					self.answers.push(newAnswer);
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