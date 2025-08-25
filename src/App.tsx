import { RoutesMain } from "@/routes/routes";

// Define metadata structure (not exported like in Next.js)
const metadata = {
    title: {
        template: 'Nutan Overseas ',
        default: 'Multipurpose E-commerce template built with React, TypeScript and Tailwind CSS.',
    },
};

// Component to apply metadata dynamically
export const HeadMetadata: React.FC<{ pageTitle?: string }> = ({ pageTitle }) => {
    const title = pageTitle
        ? metadata.title.template.replace('%s', pageTitle)
        : metadata.title.default;
    
    return <title>{title}</title>; // React 19 hoists this to <head>
};


function App() {
    return <RoutesMain />;
}

export default App;
