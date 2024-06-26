import { BASE_URL } from '../constant';
import StorageUtil from '../utils/storage';

const url = BASE_URL;
const listWadukUrl = 'waduk/all';
const detailWadukUrl = 'waduk/detail';
const addWadukUrl = 'waduk/add';
const updateWadukUrl = 'waduk/update';
const deleteWadukUrl = 'waduk/delete';

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

const getDetailWaduk = async (id) => {
    return new Promise(async (res, rej) => {
        try {
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };

            const response = await fetch(url + `${detailWadukUrl}?idWaduk=${id}`, requestOptions);
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

const addWaduk = async ({data, foto}) => {
    return new Promise(async (res, rej) => {
        try {
            const token = StorageUtil.getToken();
            const formdata = new FormData();
            formdata.append("namaWaduk", data['namaWaduk']);
            formdata.append("idWilayah", data['idWilayah']);
            formdata.append("inlet", data['inlet']);
            formdata.append("outlet", data['outlet']);
            formdata.append("sistemDas", data['sistemDas']);
            formdata.append("jenis", data['jenis']);
            formdata.append("fungsional", data['fungsional']);
            formdata.append("statusKepemilikanAset", data['statusKepemilikanAset']);
            formdata.append("pompa", data['pompa']);
            formdata.append("keterangan", data['keterangan']);
            formdata.append("latitude", data['latitude']);
            formdata.append("longitude", data['longitude']);
            foto.map((item, index) => {
                formdata.append("foto", item);
            })
            formdata.append("luasRencana", data['luasRencana']);
            formdata.append("luasEksisting", data['luasEksisting']);
            formdata.append("luasBelumDibebaskan", data['luasBelumDibebaskan']);
            formdata.append("luasKering", data['luasKering']);
            formdata.append("luasBasah", data['luasBasah']);
            formdata.append("luasTotal", data['luasTotal']);
            formdata.append("kewenangan", data['kewenangan']);
            formdata.append("statusPembebasan", data['statusPembebasan']);
            formdata.append("statusPembangunan", data['statusPembangunan']);
            formdata.append("idKec", data['idKec']);
            formdata.append("idDes", data['idDes']);
            formdata.append("alamat", data['alamat']);
            formdata.append("fasilitas", data['fasilitas']);
            formdata.append("penggunaan", data['penggunaan']);
            formdata.append("luas", data['luas']);
            formdata.append("luasBadanAir", data['luasBadanAir']);
            formdata.append("volume", data['volume']);

            const requestOptions = {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                },
                body: formdata,
                redirect: "follow"
            };

            const response = await fetch(url + addWadukUrl, requestOptions);
            const json = await response.json();
            if (response.status === 200) {
                res(json);
            } else {
                rej(json);
            }
        } catch (error) {
            rej(error);
        }
    })
}

const updateWaduk = async ({data, foto, id}) => {
    return new Promise(async (res, rej) => {
        console.log(foto)
        try {
            const token = StorageUtil.getToken();
            const formdata = new FormData();
            formdata.append("namaWaduk", data['namaWaduk']);
            formdata.append("idWilayah", data['idWilayah']);
            formdata.append("inlet", data['inlet']);
            formdata.append("outlet", data['outlet']);
            formdata.append("sistemDas", data['sistemDas']);
            formdata.append("jenis", data['jenis']);
            formdata.append("fungsional", data['fungsional']);
            formdata.append("statusKepemilikanAset", data['statusKepemilikanAset']);
            formdata.append("pompa", data['pompa']);
            formdata.append("keterangan", data['keterangan']);
            formdata.append("latitude", data['latitude']);
            formdata.append("longitude", data['longitude']);
            foto.map((item, index) => {
                formdata.append("foto", item);
            })
            formdata.append("luasRencana", data['luasRencana']);
            formdata.append("luasEksisting", data['luasEksisting']);
            formdata.append("luasBelumDibebaskan", data['luasBelumDibebaskan']);
            formdata.append("luasKering", data['luasKering']);
            formdata.append("luasBasah", data['luasBasah']);
            formdata.append("luasTotal", data['luasTotal']);
            formdata.append("kewenangan", data['kewenangan']);
            formdata.append("statusPembebasan", data['statusPembebasan']);
            formdata.append("statusPembangunan", data['statusPembangunan']);
            formdata.append("idKec", data['idKec']);
            formdata.append("idDes", data['idDes']);
            formdata.append("alamat", data['alamat']);
            formdata.append("fasilitas", data['fasilitas']);
            formdata.append("penggunaan", data['penggunaan']);
            formdata.append("luas", data['luas']);
            formdata.append("luasBadanAir", data['luasBadanAir']);
            formdata.append("volume", data['volume']);

            const requestOptions = {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + token,
                },
                body: formdata,
                redirect: "follow"
            };

            const response = await fetch(`${url}${updateWadukUrl}?idWaduk=${id}`, requestOptions);
            const json = await response.json();
            if (response.status === 200) {
                res(json);
            } else {
                rej(json);
            }
            
        } catch (error) {
            rej(error);
        }
    })
}

const deleteWaduk = async (id) => {
    return new Promise(async (res, rej) => {
        try {
            const token = StorageUtil.getToken();
            const requestOptions = {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + token,
                },
                redirect: "follow"
            };

            const response = await fetch(url + `${deleteWadukUrl}?idWaduk=${id}`, requestOptions);
            const json = await response.json();
            if (response.status === 200) {
                res(json);
            } else {
                rej(json);
            }
        } catch (error) {
            rej(error);
        }
    })
}

export { getListWaduk, getDetailWaduk, addWaduk, deleteWaduk, updateWaduk }