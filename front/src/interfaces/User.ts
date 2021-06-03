export default interface IUser {
    _id: string,
    email: string,
    name: string,
    family_name: string,
    username: string,
    password?: string,
    emailConfirmationCode?: string | null,
    avatar: string | null,
    confirmed: boolean
    updatedAt: string,
}
export type IUserOptional = { [key in (keyof IUser)]?: IUser[key] }
