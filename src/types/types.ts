export type UserResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}

export type ChangeNameType = {
    updatedUser: UserResponseType
    error?: string
}

export type BaseResponseType = {
    info: string
    error: string;
}
export type SingInType = {
    addedUser: any
    error?: string;
}