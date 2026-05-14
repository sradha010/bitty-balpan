declare module "*.css";
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.webp";
// src/declarations.d.ts
declare module '*.css?url' {
  const url: string;
  export default url;
}

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}