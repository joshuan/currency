export function saveToStorage(key: string, value: object): void {
    if (localStorage) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

export function getFromStorage<T extends object>(key: string, defaultValue: T): T {
    let value;

    if (localStorage) {
        value = localStorage.getItem(key);
    }

    return value ? JSON.parse(value) : defaultValue;
}
