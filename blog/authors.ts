type Author = {
    avatar: string
    handle: string
    url: string
}

type Authors = {
    [key: string]: Author;
}

export const authors: Authors = {
    "Mark Jackson": {
        avatar: "/authors/mark-jackson.jpg",
        handle: "@remjxd",
        url: "https://twitter.com/remjxd",
    },
};
