"use strict";

/**
 * Communication
 * The Communication module.
 * @author rishabhsrao
 */
define(["lib.use!lib.debug", "util.Constants", "jquery", "util.Storage"], function(debug, Constants, jQuery, Storage) {
	debug.log("Loading util.Communication");
	var Module = function() {
		var self = this;

		self.ajaxSites = function() {
			debug.info("util.Communication", "ajaxSites", "Fetching");

			var storage = Storage.getModule();
			var fetchFromServer = false;

			var siteData = {};

			if(true === storage.isAlreadyAvailable(Constants.keyring.sites)) {
				var value = storage.load(Constants.keyring.sites);
				debug.log("util.Communication", "ajaxSites", "Site data found in localStorage", value);

				// Refresh from server if our cache is stale i.e. older than say, 30 days.
				var now = new Date().getTime();
				var then = new Date(value.timestamp).getTime();
				if((now - then) > Constants.refreshDuration.sites) {
					debug.log("util.Communication", "ajaxSites", "Cache is stale by", (now - then), "ms; refreshing from server");
					fetchFromServer = true;
				} else {
					debug.log("util.Communication", "ajaxSites", "Cache is fresh at", (now - then), "ms", value.contents);
					siteData = value.contents;
				}
			} else {
				debug.warn("util.Communication", "ajaxSites", "Site data not found in localStorage; fetching from server");
				fetchFromServer = true;
			}

			if(true === fetchFromServer) {
				jQuery.ajax({
					url: Constants.api.stackexchange.baseUrl + Constants.api.stackexchange.methods.sites.url,
					type: "GET",
					dataType: "json",
					async: false,
					cache: true,
					data: {
						filter: Constants.api.stackexchange.methods.sites.common.filter.value
					},
					beforeSend: function(jqXHR, settings) {
						debug.log("util.Communication", "ajaxSites", "beforeSend", jqXHR, settings);
					},
					complete: function(jqXHR, settings) {
						debug.log("util.Communication", "ajaxSites", "complete", jqXHR, settings);
					},
					error: function(jqXHR, textStatus, errorThrown) {
						debug.error("util.Communication", "ajaxSites", "error", jqXHR, textStatus, errorThrown);
						throw errorThrown;
					},
					success: function(data, textStatus, jqXHR) {
						debug.info("util.Communication", "ajaxSites", "success", data, textStatus, jqXHR);

						var now = new Date();

						debug.log("util.Communication", "ajaxSites", "Creating container", now, data);
						var container = {
							timestamp: now.getTime(),
							contents: data
						};

						debug.log("util.Communication", "ajaxSites", "Saving to localstorage", storage);
						storage.save(Constants.keyring.sites, container);

						debug.log("util.Communication", "ajaxSites", "Returning data", data);
						siteData = data;
					}
				});
			}

			return siteData;
		};

		self.ajaxTags = function(querySite, queryInName) {
			debug.info("util.Communication", "ajaxTags", "Fetching", querySite, queryInName);

			var tagData = {};

			jQuery.ajax({
				url: Constants.api.stackexchange.baseUrl + Constants.api.stackexchange.methods.tags.url,
				type: "GET",
				dataType: "json",
				async: false,
				cache: true,
				data: {
					site: querySite,
					inname: queryInName,
					order: Constants.api.stackexchange.methods.tags.common.order.value,
					sort: Constants.api.stackexchange.methods.tags.common.sort.value,
					filter: Constants.api.stackexchange.methods.tags.common.filter.value
				},
				beforeSend: function(jqXHR, settings) {
					debug.log("util.Communication", "ajaxTags", "beforeSend", jqXHR, settings);

				},
				complete: function(jqXHR, settings) {
					debug.log("util.Communication", "ajaxTags", "complete", jqXHR, settings);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					debug.error("util.Communication", "ajaxTags", "error", jqXHR, textStatus, errorThrown);
					throw errorThrown;
				},
				success: function(data, textStatus, jqXHR) {
					debug.info("util.Communication", "ajaxTags", "success", data, textStatus, jqXHR);
					tagData = data;
				}
			});

			return tagData;
		};

		self.ajaxUsers = function(querySite, queryInName) {
			debug.info("util.Communication", "ajaxUsers", "Fetching", querySite, queryInName);

			var userData = {};

			jQuery.ajax({
				url: Constants.api.stackexchange.baseUrl + Constants.api.stackexchange.methods.users.url,
				type: "GET",
				dataType: "json",
				async: false,
				cache: true,
				data: {
					site: querySite,
					inname: queryInName,
					order: Constants.api.stackexchange.methods.users.common.order.value,
					sort: Constants.api.stackexchange.methods.users.common.sort.value,
					filter: Constants.api.stackexchange.methods.users.common.filter.value
				},
				beforeSend: function(jqXHR, settings) {
					debug.log("util.Communication", "ajaxUsers", "beforeSend", jqXHR, settings);

				},
				complete: function(jqXHR, settings) {
					debug.log("util.Communication", "ajaxUsers", "complete", jqXHR, settings);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					debug.error("util.Communication", "ajaxUsers", "error", jqXHR, textStatus, errorThrown);
					throw errorThrown;
				},
				success: function(data, textStatus, jqXHR) {
					debug.info("util.Communication", "ajaxUsers", "success", data, textStatus, jqXHR);
					userData = data;
				}
			});

			return userData;
		};

		self.ajaxQuestions = function(querySite, queryTags, querySort) {
			debug.info("util.Communication", "ajaxQuestions", "Fetching", querySite, queryTags, querySort);

			// Replace ,s with ;s because stackexchange requires the tags to be ; separated.
			// TODO Test for robustness of this replace. We don't want wrong replacements.
			queryTags = queryTags.replace(",", ";");

			var questionData = {};

			jQuery.ajax({
				url: Constants.api.stackexchange.baseUrl + Constants.api.stackexchange.methods.questions.url,
				type: "GET",
				dataType: "json",
				async: false,
				cache: true,
				data: {
					site: querySite,
					tagged: queryTags,
					order: Constants.api.stackexchange.methods.questions.common.order.value,
					sort: querySort,
					filter: Constants.api.stackexchange.methods.questions.common.filter.value
				},
				beforeSend: function(jqXHR, settings) {
					debug.log("util.Communication", "ajaxQuestions", "beforeSend", jqXHR, settings);
				},
				complete: function(jqXHR, settings) {
					debug.log("util.Communication", "ajaxQuestions", "complete", jqXHR, settings);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					debug.error("util.Communication", "ajaxQuestions", "error", jqXHR, textStatus, errorThrown);
					throw errorThrown;
				},
				success: function(data, textStatus, jqXHR) {
					debug.info("util.Communication", "ajaxQuestions", "success", data, textStatus, jqXHR);
					questionData = data;
				}
			});

			return questionData;
		};

		self.ajaxUserTimeline = function(querySite, userids) {
			debug.info("util.Communication", "ajaxUserTimeline", "Fetching", userids);

			var userTimelineData = {};

			userids = userids.replace(",", ";");

			jQuery.ajax({
				url: Constants.api.stackexchange.baseUrl + Constants.api.stackexchange.methods.timeline.url + userids + Constants.api.stackexchange.methods.timeline.common.suffix.value,
				type: "GET",
				dataType: "json",
				async: false,
				cache: true,
				data: {
					site: querySite,
					filter: Constants.api.stackexchange.methods.timeline.common.filter.value
				},
				beforeSend: function(jqXHR, settings) {
					debug.log("util.Communication", "ajaxUserTimeline", "beforeSend", jqXHR, settings);
				},
				complete: function(jqXHR, settings) {
					debug.log("util.Communication", "ajaxUserTimeline", "complete", jqXHR, settings);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					debug.error("util.Communication", "ajaxUserTimeline", "error", jqXHR, textStatus, errorThrown);
					throw errorThrown;
				},
				success: function(data, textStatus, jqXHR) {
					debug.info("util.Communication", "ajaxUserTimeline", "success", data, textStatus, jqXHR);
					userTimelineData = data;
				}
			});

			return userTimelineData;
		};

		return self;
	};

	return {
		getModule: function() {
			return new Module();
		}
	};
});