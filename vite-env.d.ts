/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PUBLIC_API_BASE_URL: string;
    // Add other environment variables here as needed
}

// global.d.ts
declare module "*.css" {
    const content: { [className: string]: string };
    export default content;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
