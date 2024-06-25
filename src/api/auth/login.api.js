const loginUrl = 'auth/login';

const login = async (email, pass) => {
    return new Promise(async (res, rej) => {
        if (email === '' || pass === '') {
            rej('Incorrect email or password.')
        }

        const formdata = new FormData();
        formdata.append("username", email);
        formdata.append("password", pass);

        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        const response = await fetch(process.env.REACT_APP_BASE_URL + loginUrl, requestOptions);
        const json = await response.json();
        if (response.status === 200) {
            res(json['data']);
        } else {
            rej(json);
        }
    })
}

export { login }