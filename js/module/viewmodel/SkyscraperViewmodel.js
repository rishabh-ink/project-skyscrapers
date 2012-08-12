"use strict";

/**
 * SkyscraperViewmodel
 * The SkyscraperViewmodel module.
 * @author rishabhsrao
 */
define(["lib.use!lib.debug", "lib.knockoutjs", "model.item.Skyscraper", "jquery"], function(debug, ko, Skyscraper, jQuery) {
	debug.log("viewmodel.Skyscraper", "Loading");
	var Module = function() {
		var self = this;

		self.skyscrapers = ko.observableArray([]);

		self.initialize = function() {
			debug.log("viewmodel.Skyscraper", "initialize", "Creating fake skyscrapers");
			for (var i = 0; i <= 2; i++) {
				var newSkyscraper = Skyscraper.getModule();
				newSkyscraper.site();
				self.addSkyscraper(newSkyscraper);
				debug.log("viewmodel.Skyscraper", "initialize", "Added skyscraper", newSkyscraper);
			}

			debug.log("viewmodel.Skyscraper", "initialize", "Creating custom ko bindingHandlers");
			ko.bindingHandlers.select2 = {
				init: function(element, valueAccessor) {
					// debug.log("model.item.Skyscraper", "initialize", "bindingHandlers", "init", element, valueAccessor);
					jQuery(element).select2(valueAccessor());

					ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
						// debug.log("model.item.Skyscraper", "initialize", "bindingHandlers", "ko.utils.domNodeDisposal.addDisposeCallback");
						jQuery(element).select2('destroy');
					});
				},
				update: function(element) {
					// debug.log("model.item.Skyscraper", "initialize", "bindingHandlers", "update", element);
					jQuery(element).trigger('change');
				}
			};
		};

		self.addSkyscraper = function(value) {
			self.skyscrapers.push(value);
		};

		self.refreshSkyscraper = function() {
			var indexToRefresh = self.skyscrapers.indexOf(this);

			debug.log("viewmodel.Skyscraper", "initialize", "refreshSkyscraper", this, indexToRefresh);
			self.skyscrapers()[indexToRefresh].refresh();
		};

		self.getSkyscraper = function(value) {
			debug.log("getSkyscraper", this, value);
			return self.skyscrapers()[value];
		};

		self.setSkyscraper = function(value) {
			var index = self.skyscrapers.indexOf(this);
			debug.log("viewmodel.Skyscraper", "initialize", "setSkyscraper", this);
			self.skyscrapers()[index].site(value.site);
		};

		debug.log("viewmodel.Skyscraper", "Calling self.initialize()");
		self.initialize();

		return self;
	};

	return {
		getModule: function() {
			return new Module();
		}
	};
});