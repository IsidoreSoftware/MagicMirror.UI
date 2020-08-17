import { Timespan } from "./timespan";

export class Widget {
    name: string;
    template: string;
    height: number;
    width: number;
    top: number;
    left: number;
    modelRefreshInterval: Timespan;
}