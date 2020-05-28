
export interface Route {
    uid: string;
    name: string;
    photoURL: string;
    datetimeStart: Date;
    datetimeStop: Date;
    route: Array<{ lat: number, lng: number, alt: number }>;

    duration: string;
    distance: string;
    speed: string;

    difficulty?: string;
    title?: string;
    description?: string;
    location?: string;
    preview: string;
}
