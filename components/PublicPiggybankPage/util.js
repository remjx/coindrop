export function sortArrayByEntriesKeyAlphabetical(a, b) {
    const [aId] = a;
    const [bId] = b;
    return (aId < bId) ? -1 : 1;
}
