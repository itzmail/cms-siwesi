import React from 'react';
import LoggerUtil from '../../utils/logger';

const Table = ({ employees, handleEdit, handleDelete, dataWaduk }) => {
  LoggerUtil.log('Table.js - Table component rendered', dataWaduk.length > 0);

  // employees.forEach((employee, i) => {
  //   employee.id = i + 1;
  // });

  // const formatter = new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'USD',
  //   minimumFractionDigits: null,
  // });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama Waduk</th>
            <th>Jenis</th>
            <th>Wilayah</th>
            <th>Alamat</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {dataWaduk.length > 0 ? (
            dataWaduk.map((waduk, i) => (
              <tr key={waduk.informasi.id}>
                <td>{i + 1}</td>
                <td>{waduk.informasi.nama}</td>
                <td>{waduk.informasi.jenis}</td>
                <td>{waduk.informasi.wilayah}</td>
                <td>{waduk.alamat.alamat}</td>
                <td className="text-right">
                  <button
                    onClick={() => {
                      handleEdit(waduk.informasi.id);
                    }}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => {
                      handleDelete(waduk.informasi.id);
                    }}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className='text-center'>No Data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
