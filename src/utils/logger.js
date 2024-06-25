const isDevelop = process.env.REACT_APP_ENV === 'dev';

class LoggerUtil {
    static log(message, any) {
        console.log(isDevelop ? message : '', any);
    }

    static error(message) {
        console.error(isDevelop ? message : '');
    }

    static warn(message) {
        console.warn(isDevelop ? message : '');
    }
}

export default LoggerUtil;