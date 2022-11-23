/// <reference types="react-scripts" />
// declare module '*.css' {
//     const content: { [className: string]: string };
//     export default content;
// }

interface SvgrComponent extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
    const svgUrl: string;
    const svgComponent: SvgrComponent;
    export default svgUrl;
    export { svgComponent as ReactComponent }
}

declare module '*.webp';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.ico';
declare module '*.pdf';
declare module '*.json';
declare module '*.js';