export interface User {
    id: number;
    username: string;
    password: string;
    profile: UserProfile;
    work: UserWork;
    contacts: UserContacts;
    social: UserSocial;
    settings: UserSettings;
}

export interface UserProfile {
    name: string;
    surname: string;
    birthday: Date | string;
    gender: string;
    image: string;
}

export interface UserWork {
    company: string;
    position: string;
    salary: number;
}

export interface UserContacts {
    email: string;
    phone: string;
    address: string;
}

export interface UserSocial {
    facebook: string;
    twitter: string;
    google: string;
}

export interface UserSettings {
    isActive: boolean;
    isDeleted: boolean;
    registrationDate: Date;
    joinedDate: Date;
}
