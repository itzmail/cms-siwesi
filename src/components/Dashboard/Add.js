import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { getDesa, getKecamatan, getWilayah, addWaduk, getBidang } from '../../api';

const AddDataScreen = () => {
  const [dataWilayah, setDataWilayah] = useState([]);
  const [dataKecamatan, setDataKecamatan] = useState([]);
  const [dataDesa, setDataDesa] = useState([]);
  const [dataBidang, setDataBidang] = useState([]);
  const [dataJenis, setDataJenis] = useState([
    {
      label: "Waduk", value: "Waduk"
    },
    {
      label: "Embung", value: "Embung"
    },
    {
      label: "Bendungan", value: "Bendungan"
    },
    {
      label: "Situ", value: "Situ"
    },
    {
      label: "Danau", value: "Danau"
    },
    {
      label: "Situ", value: "Situ"
    },
  ]);

  const [dataInput, setDataInput] = useState({});
  const [foto, setFoto] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    try {
      const wilayah = await getWilayah();
      setDataWilayah(wilayah);
      const kecamatan = await getKecamatan();
      setDataKecamatan(kecamatan);
      const desa = await getDesa();
      setDataDesa(desa);
      const bidang = await getBidang();
      setDataBidang(bidang);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      });
    }
  }

  const postData = async () => {
    try {
      const post = await addWaduk({ data: dataInput, foto });
      if(post) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Data berhasil ditambahkan',
        });
        navigate(-1);
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      });
    }
  }

  const inputData = (e) => {
    setDataInput({
      ...dataInput,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="container mb-12">
      <h1>Add Data</h1>
      <form onSubmit={() => { }} className='grid grid-rows-2 grid-cols-2 gap-x-4'>
        <InputComponent label="Nama Waduk" htmlFor="namaWaduk" 
          value={dataInput.namaWaduk} 
          onChange={inputData} />
        <InputComponent label="Alamat" htmlFor="alamat" 
          value={dataInput.alamat} 
          onChange={inputData} />
        <InputDropdownComponent label="Wilayah" htmlFor="idWilayah"
          options={dataWilayah.map((item) => ({ value: item.idwilayah, label: item.namaWilayah }))}
          onChange={(e) => {
            setDataInput({
              ...dataInput,
              idWilayah: e.value
            });
          }}
        />
        <InputDropdownComponent label="Kecamatan" htmlFor="idKec"
          options={dataKecamatan.map((item) => ({ value: item.id, label: item.namakec }))}
          onChange={(e) => {
            setDataInput({
              ...dataInput,
              idKec: e.value
            });
          }}
        />
        <InputDropdownComponent label="Desa" htmlFor="idDes"
          options={dataDesa.map((item) => ({ value: item.id, label: item.namadesa }))}
          onChange={(e) => {
            setDataInput({
              ...dataInput,
              idDes: e.value
            });
          }}
        />
        <InputComponent label="Latitude" htmlFor="latitude"
          onChange={inputData}
          value={dataInput.latitude}
        />
        <InputComponent label="Longitude" htmlFor="longitude"
          onChange={inputData}
          value={dataInput.longitude} 
        />
        <InputComponent label="Fasilitas" htmlFor="fasilitas"
          onChange={inputData}
          value={dataInput.fasilitas}
        />
        <InputComponent label="Luas Rencana" htmlFor="luasRencana" 
          value={dataInput.luasRencana} 
          onChange={inputData}
        />
        <InputComponent label="Luas Eksisting" htmlFor="luasEksisting"
          value={dataInput.luasEksisting}
          onChange={inputData}
        />
        <InputComponent label="Luas Badan Air" htmlFor="luasBadanAir" 
          value={dataInput.luasBadanAir} 
          onChange={inputData}
        />
        <InputComponent label="Volume" htmlFor="volume" 
          value={dataInput.volume} 
          onChange={inputData}
        />
        <InputComponent label="Luas Belum Dibebaskan" htmlFor="luasBelumDibebaskan" 
          value={dataInput.luasBelumDibebaskan} 
          onChange={inputData}
        />
        <InputComponent label="Status Kepemilikan Asset" htmlFor="statusKepemilikanAset" 
          value={dataInput.statusKepemilikanAset}
          onChange={inputData}
        />
        <InputComponent label="Status Pembebasan" htmlFor="statusPembebasan" 
          value={dataInput.statusPembebasan}
          onChange={inputData}
        />
        <InputComponent label="Status Pembangunan" htmlFor="statusPembangunan" 
          value={dataInput.statusPembangunan}
          onChange={inputData}
        />
        <InputComponent label="Luas Kering" htmlFor="luasKering" 
          value={dataInput.luasKering}
          onChange={inputData}
        />
        <InputComponent label="Luas Basah" htmlFor="luasBasah" 
          value={dataInput.luasBasah}
          onChange={inputData}
        />
        <InputComponent label="Luas Total" htmlFor="luasTotal" 
          value={dataInput.luasTotal}
          onChange={inputData}
        />
        <InputComponent label="Inlet" htmlFor="inlet" 
          value={dataInput.inlet}
          onChange={inputData}
        />
        <InputComponent label="Outlet" htmlFor="outlet" 
          value={dataInput.outlet}
          onChange={inputData}
        />
        <InputComponent label="SistemDas" htmlFor="sistemDas" 
          value={dataInput.sistemDas}
          onChange={inputData}
        />
        <InputDropdownComponent label="Jenis" htmlFor="jenis"
          options={dataJenis}
          onChange={(e) => {
            setDataInput({
              ...dataInput,
              jenis: e.value
            });
          }}
        />
        <InputComponent label="Fungsional" htmlFor="fungsional" 
          value={dataInput.fungsional}
          onChange={inputData}
        />
        <InputComponent label="Penggunaan" htmlFor="penggunaan" 
          value={dataInput.penggunaan}
          onChange={inputData}
        />
        <InputDropdownComponent label="Bidang" htmlFor="idBidang"
          options={dataBidang.map((item) => ({ value: item.idBidang, label: item.namaBidang }))}
          onChange={(e) => {
            setDataInput({
              ...dataInput,
              idBidang: e.value
            });
          }}
        />
        <InputComponent label="Kewenangan" htmlFor="kewenangan" 
          value={dataInput.kewenangan}
          onChange={inputData}
        />
        <InputComponent label="pompa" htmlFor="pompa" 
          value={dataInput.pompa}
          onChange={inputData}
        />
        <InputComponent label="foto" htmlFor="foto" type={'file'} onChange={(e) => {
          setFoto([...foto, ...e.target.files]);
        }} />
        <InputComponent label="Keterangan" htmlFor="keterangan" 
          value={dataInput.keterangan}
          onChange={inputData}
        />
      </form>
      <div style={{ marginTop: '30px' }}>
        <input type="submit" value="Add" onClick={postData} />
        <input
          style={{ marginLeft: '12px' }}
          className="muted-button"
          type="button"
          value="Cancel"
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
};

export default AddDataScreen;

const InputComponent = ({ label, htmlFor, onChange, value, type }) => {
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        id={htmlFor}
        type={type || "text"}
        name={htmlFor}
        value={value}
        multiple={type === 'file'}
        placeholder={'Masukkan ' + label || ""}
        onChange={onChange}
      />
    </div>
  );
}

const InputDropdownComponent = ({ label, htmlFor, onChange, value, options}) => {
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      <Select
        id={htmlFor}
        name={htmlFor}
        value={value}
        options={options}
        onChange={onChange}
      />
    </div>
  );
}