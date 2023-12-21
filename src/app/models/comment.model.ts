export interface IComment {
    id: string,
    like: number,
    dislike: number,
    texte: string,
    createdAt: string,
    idUser: string,
    idVideo: string,
}