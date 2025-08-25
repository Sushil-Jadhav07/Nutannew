import React from 'react';

// Define the metadata structure
const metadata = {
	title: {
		template: 'Umitex | %s',
		default: 'Multipurpose E-commerce template built with React, NextJS, TypeScript and Tailwind CSS.',
	},
};

// Component that applies metadata dynamically to the document head
export const HeadMetadata: React.FC<{ pageTitle?: string }> = ({ pageTitle }) => {
	const title = pageTitle
		? metadata.title.template.replace('%s', pageTitle)
		: metadata.title.default;
	
	// In React 18/19+ you can return a <title> element directly,
	// and frameworks (or custom code) may hoist it to the <head>.
	// Alternatively, use a library like react-helmet if needed.
	return <title>{title}</title>;
};
