"use strict";

/**
 * QuestionTest
 * The QuestionTest module.
 * @author rishabhsrao
 */
define(["lib.qunit", "model.item.Question", "lib.use!lib.debug"], function(qunit, question, debug) {
	debug.info("Running tests: model.item.Question");

	module("model.item.Question");
	test("question.getModule", function() {
		expect(2);

		var testQuestion = question.getModule();
		var testTitle = "lorem ipsum";
		var testAskedBy = "dolor";

		testQuestion.title(testTitle);
		testQuestion.askedBy(testAskedBy);

		ok((testTitle === testQuestion.title()), "title passed!");
		ok((testAskedBy === testQuestion.askedBy()), "askedBy passed!");
	});
});