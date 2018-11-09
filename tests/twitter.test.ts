import { expect } from 'chai';
import { describe, it } from 'mocha';

import { SocialBladeClient, ITwitterStats } from '../src/index';

const testUser = "loserfruit";

describe('Get Twitch stats as a User', () => {
	it('Should give back stats', async () => {
		const socialblade: SocialBladeClient = new SocialBladeClient();
		await socialblade.AuthAsUser(
			process.env.SOCIALBLADE_EMAIL,
			process.env.SOCIALBLADE_TOKEN
		);

		expect(socialblade.isAuthed()).to.be.true;

		const stats: ITwitterStats = await socialblade.StatsTwitter(testUser);
		expect(stats.statistics.length).to.be.greaterThan(50);
		expect(stats.user.twitter_id).to.be.equal(1367124774);
	});
});
