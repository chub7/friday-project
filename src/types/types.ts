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

export type CardsPackType = {
    _id: string;
    user_id: string;
    name: string
    cardsCount: number
    created: string
    updated: string
    user_name: string;
    private: boolean;
    path: string;
    grade: number;
    shots: number;
    deckCover: string;
    type: string;
    rating: number;
    more_id: string;
    __v: number;
}

export type GetPacksCardsResponseType = {
    cardPacks: CardsPackType[]
    cardPacksTotalCount: number    // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number
}
export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}

export type GetCardOfPackResponseType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type UpdateCardResponseType = CRUDResponseType & {
    updatedCard: CardType
}

export type DeleteCardResponseType = CRUDResponseType & {
    deletedCard: CardType
}


export type AddCardResponseType = CRUDResponseType & {
    newCard: CardType
}

export type CRUDResponseType = {
    token: string
    tokenDeathTime: Date
}

export type AddPackResponseType = CRUDResponseType & {
    newCardsPack: CardsPackType
}

export type DeletePackResponseType = CRUDResponseType & {
    deletedCardsPack: CardsPackType
}

export type UpdatePackResponseType = CRUDResponseType & {
    updatedCardsPack: CardsPackType
}