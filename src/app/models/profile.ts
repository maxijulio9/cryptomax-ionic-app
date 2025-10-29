export interface Profile {
    id?: string;
    name: string;
    lastName: string;
    email: string;
    dni: string;
    country?: string;
    memberSince?: number;
    accountLevel?: 'basic' | 'verified';
    avatarUrl?: string;
}