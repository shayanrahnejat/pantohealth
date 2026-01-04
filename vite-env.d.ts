/// <reference types="vite/client" />

declare module 'vite' {
  interface UserConfig {
    test?: any; // allow Vitest config
  }
}
