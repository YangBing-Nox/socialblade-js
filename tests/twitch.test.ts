import { expect } from 'chai';
import { describe, it } from 'mocha';

import { SocialBladeClient, ITwitchStats } from '../src/index';

const testUser = "loserfruit";

describe('Get Twitch stats as a User', () => {
	it('Should give back stats', async () => {
		const socialblade: SocialBladeClient = new SocialBladeClient();
		await socialblade.AuthAsUser(
			process.env.SOCIALBLADE_EMAIL,
			process.env.SOCIALBLADE_TOKEN
		);

		expect(socialblade.isAuthed()).to.be.true;

		const stats: ITwitchStats = await socialblade.StatsTwitch(testUser);
		expect(stats.data_daily.length).to.be.greaterThan(50);
		expect(stats.id.twitch_id).to.be.equal("41245072");
	});
});
