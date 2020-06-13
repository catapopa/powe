export interface User {
    uid: string;
    email: string;
    name: string;
    photoURL: string;
    emailVerified: boolean;
    following: string[];
    bio: string;
    location: string;
}
