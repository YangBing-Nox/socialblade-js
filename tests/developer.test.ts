import { expect } from 'chai';
import { describe, it } from 'mocha';

import { SocialBladeClient, IDeveloper } from '../src/index';

describe('Login with an Developer Key', () => {
	it('Should be Valid', async () => {
		const socialblade: SocialBladeClient = new SocialBladeClient();
		const auth: IDeveloper = await socialblade.Auth(
			process.env.SOCIALBLADE_KEY
		);

		expect(auth.status.error).to.be.undefined;
		expect(socialblade.isAuthed()).to.be.true;
	});
	
	it('Should be Invalid', async () => {
		const socialblade: SocialBladeClient = new SocialBladeClient();
		const auth: IDeveloper = await socialblade.Auth(
			"KappaPride"
		);

		expect(auth.status.error).to.be.not.undefined;
		expect(socialblade.isAuthed()).to.be.false;
	});
});
