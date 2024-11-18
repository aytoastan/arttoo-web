// globals.d.ts
export { };

declare global {
  interface Window {
    THREE: typeof import('three');
  }
}

declare global {
  interface Window {
    innerHeight: number;
  }
}

declare module 'd3' {
  export * from 'd3';
}