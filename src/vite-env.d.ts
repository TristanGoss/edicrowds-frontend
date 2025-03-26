/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly MODE: string; // 'development' | 'production' | 'test'
    readonly VITE_MAPTILER_KEY: string;
    readonly VITE_UMAMI_WEBSITE_ID: string;
  }
  
interface ImportMeta {
    readonly env: ImportMetaEnv;
}