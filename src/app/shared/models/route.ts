
export interface Route {
    uid: string;
    name: string;
    photoURL: string;
    datetimeStart: Date;
    datetimeStop: Date;
    route: Array<{ lat: number, lng: number }>;

    duration: string;
    distance: number;
    speed: number;
}
