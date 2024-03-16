import { db, GuestBook } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(GuestBook).values([
		{
			author: 'John Doe',
			content: 'You are so cool!'
		},
		{
			author: 'John Doe, The Second',
			content: 'I agree with my dad, John Doe, you are pretty cool!'
		}
	]);
}
