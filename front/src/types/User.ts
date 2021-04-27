export default interface IUser {
    id: string,
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