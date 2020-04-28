export interface Route {
    uid: string;
    startTime: Date;
    stopTime: Date;
    distance: number;
    time: number;
    route: Array<{ lat: number, lng: number }>;
}
