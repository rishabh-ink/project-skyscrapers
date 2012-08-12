"use strict";

/**
 * SkyscraperViewModelTest
 * The SkyscraperViewModelTest module.
 * @author rishabhsrao
 */
define(["lib.qunit", "viewmodel.Skyscraper", "model.item.Skyscraper", "lib.use!lib.debug"], function(qunit, skyscraperViewModel, skyscraper, debug) {
	debug.info("Running tests: viewmodel.Skyscraper");

	module("viewmodel.Skyscraper");
	test("addSkyscraper", function() {
		expect(3);
		var testSkyscraper = skyscraper.getModule();
		testSkyscraper.site("manhattan");

		debug.info("testing with", testSkyscraper);

		var testSkyscraperViewModel = skyscraperViewModel.getModule();
		testSkyscraperViewModel.addSkyscraper(testSkyscraper);

		ok(("manhattan" === testSkyscraper.site()), "Passed: \"manhattan\" === testSkyscraper.site()");
		ok((testSkyscraper.site() === testSkyscraperViewModel.getSkyscraper(0).site()), "Passed: testSkyscraper.site() === testSkyscraperViewModel.getSkyscraper(0).site()");
		ok(("manhattan" === testSkyscraperViewModel.getSkyscraper(0).site()), "Passed: \"manhattan\" === testSkyscraperViewModel.getSkyscraper(0).site()");
	});

	test("setSkyscraper", function() {
		expect(1);

		var testSkyscraper = skyscraper.getModule();
		testSkyscraper.site("stackoverflow");

		debug.info("testing with", testSkyscraper);

		var testSkyscraperViewModel = skyscraperViewModel.getModule();
		testSkyscraperViewModel.addSkyscraper(testSkyscraper);

		ok(("stackoverflow" === testSkyscraperViewModel.getSkyscraper(0).site()), "Passed: \"stackoverflow\" === testSkyscraperViewModel.getSkyscraper(0).site()");
	});

	test("refreshSkyscraper", function() {
		expect(1);

		var testSkyscraper = skyscraper.getModule();
		testSkyscraper.site("stackoverflow");

		debug.info("testing with", testSkyscraper);

		var testSkyscraperViewModel = skyscraperViewModel.getModule();
		testSkyscraperViewModel.addSkyscraper(testSkyscraper);

		ok(("stackoverflow" === testSkyscraperViewModel.getSkyscraper(0).site()), "Passed: \"stackoverflow\" === testSkyscraperViewModel.getSkyscraper(0).site()");
	});
});