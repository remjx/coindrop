export type EmailListIds =
    'newsletter' // Main newsletter
    // | 'analytics'; // Analytics for the user's Coindrops

export type UserData = {
    email_lists: EmailListIds[]
    email: string
};
