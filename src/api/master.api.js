import { BASE_URL } from "../constant";

const url = BASE_URL;
const mwilayahUrl = 'master/wilayah';
const mkecamatanUrl = 'master/kecamatan';
const mdesaUrl = 'master/desa';
const mbidangUrl = 'master/bidang';

const getWilayah = async () => {
    return new Promise(async (res, rej) => {
        try {
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };
    
            const response = await fetch(url + mwilayahUrl, requestOptions);
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

const getKecamatan = async () => {
    return new Promise(async (res, rej) => {
        try {
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };
    
            const response = await fetch(url + mkecamatanUrl, requestOptions);
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

const getDesa = async () => {
    return new Promise(async (res, rej) => {
        try {
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };
    
            const response = await fetch(url + mdesaUrl, requestOptions);
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

const getBidang = async () => {
    return new Promise(async (res, rej) => {
        try {
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };
    
            const response = await fetch(url + mbidangUrl, requestOptions);
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

export { getWilayah, getKecamatan, getDesa, getBidang }