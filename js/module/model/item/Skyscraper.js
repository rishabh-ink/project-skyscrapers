"use strict";

/**
 * Skyscraper
 * The Skyscraper module.
 * @author rishabhsrao
 */
define(["lib.use!lib.debug", "lib.knockoutjs", "model.item.Question", "util.Communication", "jquery", "lib.use!lib.select2", "util.Constants", "model.item.Owner", "model.item.TimelineEvent"], function(debug, ko, Question, Communication, jQuery, select2, Constants, Owner, TimelineEvent) {
	debug.log("model.item.Skyscraper", "Loading");
	var Module = function() {
		var self = this;

		self.site = ko.observable();
		self.isEnabled = ko.observable(false);
		self.isEditable = ko.observable(true);
		self.currentView = ko.observable(Constants.viewmodel.SkyscraperViewmodel.availableViews.questions);

		self.communication = Communication.getModule();

		self.content = {
			views: {
				common: {
					meta: {
						availableSites: ko.observableArray([]),
						availableViews: ko.observableArray([])
					}
				},
				questions: {
					params: {
						tags: ko.observableArray([]),
						sort: ko.observable(Constants.api.stackexchange.methods.questions.common.sort.value)
					},
					meta: {
						availableSorts: ko.observableArray([])
					},
					data: {
						questions: ko.observableArray([])
					}
				},

				timeline: {
					params: {
						userIds: ko.observableArray([])
					},
					data: {
						timelineEvents: ko.observableArray([])
					}
				}
			}
		};

		self.toggleEnabled = function() {
			self.isEnabled(!self.isEnabled());
		};

		self.toggleEditable = function() {
			self.isEditable(!self.isEditable());
		};

		self.initialize = function() {
			debug.log("model.item.Skyscraper", "initialize", "Fetching sites data");

			// debug.log("model.item.Skyscraper", "initialize", "Populating availableSorts");
			// ko.utils.arrayForEach(Constants.api.stackexchange.methods.questions.common.sort.values, function(value) {
			// self.content.views.questions.meta.availableSorts.push(value);
			// });

			debug.log("model.item.Skyscraper", "initialize", "Populating availableViews");
			ko.utils.arrayForEach(Constants.viewmodel.SkyscraperViewmodel.availableViewsArray, function(value) {
				self.content.views.common.meta.availableViews.push(value);
			});

			self.querySites();
		};

		self.querySites = function() {
			debug.log("model.item.Skyscraper", "querySites", "Querying for sites");
			var sites = self.communication.ajaxSites();
			debug.log("model.item.Skyscraper", "initialize", "Recieved sites data", sites);

			debug.log("model.item.Skyscraper", "initialize", "Setting self.availableSites to", sites.items);
			self.content.views.common.meta.availableSites = sites.items;
		};

		self.queryTags = function(query) {
			debug.log("model.item.Skyscraper", "queryTags", "Querying for tags", query);

			var rawTags = self.communication.ajaxTags(self.site(), query.term);
			var processedTags = {
				results: []
			};

			debug.log("model.item.Skyscraper", "queryTags", "Processing raw tags", rawTags);
			ko.utils.arrayForEach(rawTags.items, function(item) {
				processedTags.results.push({
					id: item.name,
					text: item.name
				});
			});

      query.callback(processedTags);
		};

		self.queryUsers = function(query) {
			debug.log("model.item.Skyscraper", "queryUsers", "Querying for users", query);

			var rawUsers = self.communication.ajaxUsers(self.site(), query.term);
			var processedUsers = {
				results: []
			};

			debug.log("model.item.Skyscraper", "queryUsers", "Processing raw users", rawUsers);
			ko.utils.arrayForEach(rawUsers.items, function(item) {
				processedUsers.results.push({
					id: item.user_id,
					text: item.display_name
				});
			});

      query.callback(processedUsers);
		};

		self.queryQuestions = function() {
			debug.log("model.item.Skyscraper", "queryQuestions", "Querying for questions", self.site(), self.content.views.questions.params.tags());

			jQuery(".context-help").addClass("hide");
			var rawQuestions = self.communication.ajaxQuestions(self.site(), self.content.views.questions.params.tags(), self.content.views.questions.params.sort());

			debug.log("model.item.Skyscraper", "queryQuestions", "Processing raw questions", rawQuestions);


			debug.log("model.item.Skyscraper", "queryQuestions", "Replacing old questions with new ones.");
			self.content.views.questions.data.questions.removeAll();

			ko.utils.arrayForEach(rawQuestions.items, function(item) {
				var newQuestion = Question.getModule();

				newQuestion.applyMappings(item);

				self.content.views.questions.data.questions.push(newQuestion);
			});
		};

		self.queryUserTimeline = function() {
			debug.log("model.item.Skyscraper", "queryUserTimeline", "Querying for user timeline events");

			var rawTimelineEvents = self.communication.ajaxUserTimeline(self.site(), self.content.views.timeline.params.userIds());

			debug.log("model.item.Skyscraper", "queryUserTimeline", "Processing raw timeline events", rawTimelineEvents);


			debug.log("model.item.Skyscraper", "queryUserTimeline", "Replacing old timeline events with new ones.");
			self.content.views.questions.data.questions.removeAll();

			ko.utils.arrayForEach(rawTimelineEvents.items, function(item) {
				var newTimelineEvent = TimelineEvent.getModule();

				newTimelineEvent.applyMappings(item);

				self.content.views.timeline.data.timelineEvents.push(newTimelineEvent);
			});
		};

		self.refresh = function() {
			debug.info("Refreshing Skyscraper");
		};

		self.destroySkyscraper = function() {
			self.toggleEnabled();
			self.content.views.questions.data.questions.removeAll();
		};

		self.isViewQuestions = ko.computed(function() {
			debug.log("model.item.Skyscraper", "isViewQuestions", "currentView", self.currentView());
			if(self.currentView() === Constants.viewmodel.SkyscraperViewmodel.availableViews.questions) {
				return true;
			} else {
				return false;
			}
		});

		self.isViewTimeline = ko.computed(function() {
			debug.log("model.item.Skyscraper", "isViewTimeline", "currentView", self.currentView());
			if(self.currentView() === Constants.viewmodel.SkyscraperViewmodel.availableViews.timeline) {
				return true;
			} else {
				return false;
			}
		});

		self.setView = function(whichView, data) {
			debug.log("model.item.Skyscraper", "setView", { data: data, whichView: whichView, currentView: self.currentView() });
			self.currentView(whichView);
		};

		self.postProcess = function(data, el) {
			debug.log("model.item.Skyscraper", "postProcess", data, el);
		};

		debug.log("model.item.Skyscraper", "Calling initialize");
		self.initialize();

		return self;
	};

	return {
		getModule: function() {
			return new Module();
		}
	};
});