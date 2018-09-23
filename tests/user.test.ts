import { expect } from 'chai';
import { describe, it } from 'mocha';

import { SocialBladeClient, IUser } from '../src/index';

describe('Login with an Email and Token', () => {
	it('Should be Valid' , async () => {
		const socialblade: SocialBladeClient = new SocialBladeClient();
		const auth: IUser = await socialblade.AuthAsUser(
			process.env.SOCIALBLADE_EMAIL,
			process.env.SOCIALBLADE_TOKEN
		);

		expect(auth.status.error).to.be.undefined;
		expect(socialblade.isAuthed()).to.be.true;
	});
	
	it('Should be Invalid' , async () => {
		const socialblade: SocialBladeClient = new SocialBladeClient();
		const auth: IUser = await socialblade.AuthAsUser(
			process.env.SOCIALBLADE_EMAIL,
			"KappaPride"
		);
			
		expect(auth.status.error).to.be.true;
		expect(socialblade.isAuthed()).to.be.false;
	});
});
