type Author = {
    avatar: string
}

type Authors = {
    [key: string]: Author;
}

export const authors: Authors = {
    "Mark Jackson": {
        avatar: "/authors/mark-jackson.jpg",
    },
};
