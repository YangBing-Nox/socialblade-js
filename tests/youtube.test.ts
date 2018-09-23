import { expect } from 'chai';
import { describe, it } from 'mocha';

import { SocialBladeClient, IYouTubeStats } from '../src/index';

const testUser = "socialblade";

describe('Get YouTube stats as a User', () => {
	it('Should give back stats', async () => {
		const socialblade: SocialBladeClient = new SocialBladeClient();
		await socialblade.AuthAsUser(
			process.env.SOCIALBLADE_EMAIL,
			process.env.SOCIALBLADE_TOKEN
		);

		expect(socialblade.isAuthed()).to.be.true;

		const stats: IYouTubeStats = await socialblade.StatsYouTube(testUser);
		expect(stats.data_daily.length).to.be.greaterThan(50);
		expect(stats.id.channelid).to.be.equal("UCl6vWwMCjufI8OPtOInHf0g");
	});
});
