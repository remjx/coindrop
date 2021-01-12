export type EmailListIds =
    'newsletter' // Main newsletter
    // | 'analytics'; // Analytics for the user's Coindrops

export type UserData = {
    email_lists: EmailListIds[]
    email?: string
};

export const getDefaultUserData = (email: string): UserData => ({
    email,
    email_lists: ["newsletter"],
});
