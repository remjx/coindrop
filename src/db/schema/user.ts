export type EmailListIds =
    'newsletter'; // Main newsletter

export type UserData = {
    email_lists: EmailListIds[]
    email?: string
};

export const getDefaultUserData = (email: string): UserData => ({
    email,
    email_lists: ["newsletter"],
});
