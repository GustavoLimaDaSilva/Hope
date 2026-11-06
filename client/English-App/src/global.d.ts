declare module "*.css";
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RECAPTCHA_SITE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
