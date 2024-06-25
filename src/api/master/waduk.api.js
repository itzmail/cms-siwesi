const url = process.env.REACT_APP_BASE_URL;
const listWadukUrl = 'waduk/all';

const getListWaduk = async () => {
    return new Promise(async (res, rej) => {
        try {
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };
    
            const response = await fetch(url + listWadukUrl, requestOptions);
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

export { getListWaduk }