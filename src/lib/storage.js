export function saveToStorage(key, value) {
    if (localStorage) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

export function getFromStorage(key, defaultValue) {
    let value;

    if (localStorage) {
        value = localStorage.getItem(key);
    }

    return value ? JSON.parse(value) : defaultValue;
}
