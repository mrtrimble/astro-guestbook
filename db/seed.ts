import { db, GuestBook } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(GuestBook).values([
		{
			id: 1,
			author: 'Test Testerson',
			content: 'Now this is some fuggin content!'
		},
		{
			id: 2,
			author: 'QA Steve',
			content: 'why did Tim Berners-Lee unleash this hellscape upon us, btw all the icons are fucked up.'
		}
	]);
	
}
