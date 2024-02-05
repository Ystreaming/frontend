export interface IVideo {
    _id: number,
    title: string,
    createdAt: string,
    like: number,
    dislike: number,
    description: string,
    language: string,
    time: string,
    img: string,
    url: string,
    urllocal: string,
    idComment: [number],
    idChannel: number,
    idCategory: number
}