import ContentLoader from 'react-content-loader';

const CategoryCardLoader = (props: any) => (
    <ContentLoader
        speed={2}
        width={160}
        height={160}
        viewBox="0 0 160 160"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="6" y="112" rx="3" ry="3" width="410" height="6" />
        <rect x="6" y="128" rx="3" ry="3" width="380" height="6" />
        <circle cx="80" cy="50" r="50" />
    </ContentLoader>
);

export default CategoryCardLoader;
