// Require the socialblade package and start a new SocialBladeClient
const SocialBladeClient = require("../lib" || "socialblade").SocialBladeClient;
const socialblade = new SocialBladeClient();

// Set our Email and Token.
const email = process.env.SOCIALBLADE_EMAIL;
const token = process.env.SOCIALBLADE_TOKEN;
// Start authentication request to make sure our key is valid.
const auth = socialblade.AuthAsUser(email, token);

// Wait until our auth request is finished
auth.then(data => {
	// Make sure we're authed
	if (!socialblade.isAuthed()) return;

	// Check Loserfruit's Stats
	const loserfruit = "UCIOrUVVyfoWnmcwG6IwCULQ";
	socialblade.StatsYouTube(loserfruit).then(stats => {
		console.log(stats)
	});
});
