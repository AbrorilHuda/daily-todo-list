// src/routes/history/[slug]/+page.server.js
export async function load({ params }) {
	const slug = params.slug;

	return {
		slug
	};
}
