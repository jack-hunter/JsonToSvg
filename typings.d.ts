declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

declare var BMap: {
  Map: new (arg0: string) => any;
  Polyline: new (
    arg0: any[],
    arg1: { strokeColor: string; strokeWeight: number; strokeOpacity: number },
  ) => any;
  Point: new (arg0: number, arg1: number) => any;
};