const token = 'token';
const isAuthenticated = 'is_authenticated';

class StorageUtil {
    static setToken(value) {
        localStorage.setItem(token, value);
    }

    static getToken() {
        return localStorage.getItem(token);
    }

    static setIsAuthenticated(value) {
        localStorage.setItem(isAuthenticated, value);
    }

    static getIsAuthenticated() {
        return JSON.parse(localStorage.getItem(isAuthenticated));
    }

    static clearStorage() {
        localStorage.clear();
    }
}

export default StorageUtil;