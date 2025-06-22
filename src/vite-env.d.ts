/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly OPEN_API_BASE: string;
  readonly API_SERVICE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}