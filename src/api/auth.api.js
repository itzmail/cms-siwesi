import StorageUtil from "../utils/storage";

const loginUrl = 'auth/login';
const cekValidTokenUrl = 'auth/cekValidToken';

const login = async (email, pass) => {
    return new Promise(async (res, rej) => {
        if (email === '' || pass === '') {
            rej('Incorrect email or password.')
        }

        try {
            const formdata = new FormData();
            formdata.append("username", email);
            formdata.append("password", pass);

            const requestOptions = {
                method: "POST",
                body: formdata,
                redirect: "follow"
            };

            const response = await fetch(process.env.REACT_APP_API_BASE_URL + loginUrl, requestOptions);
            const json = await response.json();
            if (response.status === 200) {
                res(json['data']);
            } else {
                rej(json);
            }
        } catch (error) {
            rej(error);
        }
    })
}

const cekValidToken = async () => {
    return new Promise(async (res, rej) => {
        try {
            const token = StorageUtil.getToken();
            if (token === null) {
                rej('Token not found');
            }

            const requestOptions = {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                redirect: "follow"
            };

            const response = await fetch(process.env.REACT_APP_API_BASE_URL + cekValidTokenUrl, requestOptions);
            const json = await response.json();
            if (response.status === 200) {
                res(json['data']);
            } else {
                rej(json['data']);
            }
        } catch (error) {
            rej(error);
        }
    })
}

export { login, cekValidToken }