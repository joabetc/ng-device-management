export interface Adapter<T> {
  adaptFrom(item: any): T;
  adaptTo(result: T): any;
}