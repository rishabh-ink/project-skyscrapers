"use strict";

/**
 * Constants
 * The Constants module stores global constants required in the application.
 * @author See /humans.txt
 */
define({
	api: {
		stackexchange: {
			baseUrl: "http://api.stackexchange.com/2.0",
			methods: {
				sites: {
					url: "/sites",
					common: {
						filter: {
							name: "filter",
							value: "!)5IYMJ7A6GskeFmsVn2*s8IPwtXu"
						}
					}
				},

				tags: {
					url: "/tags",
					common: {
						order: {
							name: "order",
							value: "desc"
						},
						sort: {
							name: "sort",
							value: "popular"
						},
						filter: {
							name: "filter",
							value: "!*MGhop)x.(p8aaP9"
						}
					}
				},

				questions: {
					url: "/questions",
					common: {
						order: {
							name: "order",
							value: "desc"
						},
						sort: {
							name: "sort",
							value: "hot"
						},
						filter: {
							name: "filter",
							value: "!G)hpINCD1izqKHj.hYPURM6-s3"
						}
					}
				},

				users: {
					url: "/users",
					common: {
						order: {
							name: "order",
							value: "desc"
						},
						sort: {
							name: "sort",
							value: "reputation"
						},
						filter: {
							name: "filter",
							value: "!9hnGsu85z"
						}
					}
				},

				timeline: {
					url: "/users/",
					common: {
						filter: {
							name: "filter",
							value: "!)*dkAa8"
						},
						suffix: {
							name: "timeline",
							value: "/timeline"
						}
					}
				}
			}
		},

		github: {
			baseUrl: "https://api.github.com/v3",
			methods: {
				events: {
					urlSuffix: "/events",
					repo: {
						url: "/repos"
					},
					user: {
						url: "/users"
					}
				}
			}
		}
	},

	viewmodel: {
		SkyscraperViewmodel: {
			availableViewsArray: ["Questions", "Timeline"],
			availableViews: {
				questions: "Questions",
				timeline: "Timeline"
			}
		}
	},

	keyring: {
		sites: "PROJECTSKYSCRAPERS_SITES"
	},

	refreshDuration: {
		sites: (30 * 24 * 60 * 60 * 1000) // 30 days in milliseconds.
	},

	errors: {
		storage: {
			NOT_AVAILABLE: {
				code: -5000,
				message: "localstorage not supported."
			},

			NOT_FOUND: {
				code: -5001,
				message: "key, value pair not found."
			}
		}
	}
});