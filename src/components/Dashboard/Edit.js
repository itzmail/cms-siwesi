import React, { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { getDesa, getKecamatan, getWilayah, addWaduk, getBidang, getDetailWaduk, updateWaduk } from '../../api';
import { BASE_URL } from '../../constant';

const EditDataScreen = (props) => {
  const {id} = useParams();
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
  const showFoto = useMemo(() => {
    return foto.map((item) => {
      return `${BASE_URL}images/${item}`;
    });
  }, [foto])

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

      getDetailData();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      });
    }
  }

  const getDetailData = async () => {
    try {
      const detail = await getDetailWaduk(id);
      setDataInput({
        namaWaduk: detail.informasi.nama,
        alamat: detail.alamat.alamat,
        idWilayah: detail.informasi.idWilayah,
        idKec: detail.informasi.idKec,
        idDes: detail.informasi.idDes,
        latitude: detail.alamat.lat,
        longitude: detail.alamat.long,
        fasilitas: detail.informasi.fasilitas,
        luasRencana: detail.informasi.luasRencana,
        luasEksisting: detail.informasi.luasEksisting,
        luasBadanAir: detail.informasi.luasBadanAir,
        luasBasah: detail.informasi.luasBasah,
        luasKering: detail.informasi.luasKering,
        luasTotal: detail.informasi.luasTotal,
        inlet: detail.informasi.inlet,
        outlet: detail.informasi.outlet,
        sistemDas: detail.informasi.sistemDas,
        jenis: detail.informasi.jenis,
        luasBelumDibebaskan: detail.informasi.luasBelumDibebaskan,
        volume: detail.informasi.volume,
        statusKepemilikanAset: detail.statusKepemilikanAsset,
        statusPembebasan: detail.statusPembebasan,
        statusPembangunan: detail.statusPembangunan,
        fungsional: detail.informasi.fungsional,
        penggunaan: detail.informasi.penggunaan,
        kewenangan: detail.informasi.kewenangan,
        pompa: detail.informasi.pompa,
        keterangan: detail.informasi.keterangan,
      });

      setFoto(detail.file.foto);
      
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      });
    }
  }

  const handleFileFoto = (e) => {
    const files = e.target.files;
    const filesArr = Array.from(files).map((file) => URL.createObjectURL(file));
    setFoto((prev) => prev.concat(files));
    Array.from(e.target.files).map(
      (file) => URL.revokeObjectURL(file)
    );
  }

  const postData = async () => {
    try {
      const post = await updateWaduk({ data: dataInput, foto, id:id });
      if(post) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Data berhasil ditambahkan',
          showConfirmButton: false,
          timer: 1500,
          willClose: () => {
            navigate(-1);
          }
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      });
    }
  }

  const removeImage = (index) => {
    const newFoto = foto.filter((item, idx) => idx !== index);
    setFoto(newFoto);
  }

  const inputData = (e) => {
    setDataInput({
      ...dataInput,
      [e.target.name]: e.target.value
    });
  }

  return !dataInput.namaWaduk ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) :(
    <div className="container mb-12">
      <h1>Edit Data</h1>
      <form onSubmit={() => { }} className='grid grid-rows-2 grid-cols-2 gap-x-4'>
        <InputComponent label="Nama Waduk" htmlFor="namaWaduk" 
          value={dataInput.namaWaduk} 
          onChange={inputData} />
        <InputComponent label="Alamat" htmlFor="alamat" 
          value={dataInput.alamat} 
          onChange={inputData} />
        <InputDropdownComponent label="Wilayah" htmlFor="idWilayah"
          options={dataWilayah.map((item) => ({ value: item.idwilayah, label: item.namaWilayah }))}
          value={dataWilayah.find((item) => item.idwilayah === dataInput.idWilayah)?.namaWilayah || ""}
          onChange={(e) => {
            setDataInput({
              ...dataInput,
              idWilayah: e.value
            });
          }}
        />
        <InputDropdownComponent label="Kecamatan" htmlFor="idKec"
          options={dataKecamatan.map((item) => ({ value: item.id, label: item.namakec }))}
          value={dataKecamatan.find((item) => item.id === dataInput.idKec)?.namakec || ""}
          onChange={(e) => {
            setDataInput({
              ...dataInput,
              idKec: e.value
            });
          }}
        />
        <InputDropdownComponent label="Desa" htmlFor="idDes"
          options={dataDesa.map((item) => ({ value: item.id, label: item.namadesa }))}
          value={dataDesa.find((item) => item.id === dataInput.idDes)?.namadesa || ""}
          onChange={(e) => {
            setDataInput({
              ...dataInput,
              idDes: e.value
            });
          }}
        />
        <InputComponent label="Fasilitas" htmlFor="fasilitas"
          onChange={inputData}
          value={dataInput.fasilitas}
        />
        <InputComponent label="Latitude" htmlFor="latitude"
          onChange={inputData}
          value={dataInput.latitude}
        />
        <InputComponent label="Longitude" htmlFor="longitude"
          onChange={inputData}
          value={dataInput.longitude} 
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
          value={dataInput.jenis}
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
          value={dataBidang.find((item) => item.idBidang === dataInput.idBidang)?.namaBidang || "Masukkan Bidang"}
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
        <div>
          <InputComponent label="Foto" htmlFor="foto" type={'file'} onChange={(e) => {
            handleFileFoto(e);
            setFoto([...foto, ...e.target.files]);
          }} />
          
            <div className='grid grid-cols-2'>
              {showFoto.map((item, index) =>{
              return (
                <div className='relative'>
                  <div 
                    className='absolute top-0 right-0 bg-red-500 text-white p-1 cursor-pointer'
                  onClick={() => {
                    removeImage(index);
                  }}>
                    X
                  </div>
                  <img crossOrigin='anonym' key={index} src={item} alt={item} className='w-full h-32 object-cover' />
                </div>
              );
            })}
            </div>
        </div>
        <InputComponent label="Keterangan" htmlFor="keterangan" 
          value={dataInput.keterangan}
          onChange={inputData}
        />
      </form>
      <div style={{ marginTop: '30px' }}>
        <input type="submit" value="Update" onClick={postData} />
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

export default EditDataScreen;

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
        placeholder={value}
        options={options}
        onChange={onChange}
      />
    </div>
  );
}