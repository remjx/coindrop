// Preferred should be at the top, sorted alphabetecally within this group
// Non preferred should be below, sorted alphabetically within this group
export function sortByAlphabeticalThenIsPreferred(arr) {
    return arr
    .sort((a, b) => {
        const { value: aValue, isPreferred: aIsPreferred } = a;
        const { value: bValue, isPreferred: bIsPreferred } = b;
        if (aIsPreferred && !bIsPreferred) {
            return -1;
        }
        if (bIsPreferred && !aIsPreferred) {
            return 1;
        }
        if (aValue < bValue) {
            return -1;
        }
        return 1;
    });
};
