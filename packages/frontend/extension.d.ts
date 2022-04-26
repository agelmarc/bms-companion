declare module React {
  export interface ComponentClass<P = {}> {
    Layout?: ComponentType<P>;
  }
  export interface FunctionComponent {
    Layout?: ComponentType<import("types").LayoutProps>;
  }
}
