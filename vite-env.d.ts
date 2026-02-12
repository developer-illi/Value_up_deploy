/// <reference types="vite/client" />

declare module '@react-router/dev/vite' {
  import type { Plugin } from 'vite'
  export function reactRouter(): Plugin
}
