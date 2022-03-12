import './userList.css';
import { DataGrid } from '@mui/x-data-grid';
import { userRows } from '../../dummy';
import { useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { Link } from 'react-router-dom';
export default function UserList() {
  const [data, setdata] = useState(userRows);

  const column = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'username',
      headerName: 'Username',
      width: 150,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      }
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'number',
      width: 150
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150
    },
    {
      field: 'transaction',
      headerName: 'Transaction',
      width: 150
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/users/${params.row.id}`}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="userListDelete"
              onClick={() => handleRemove(params.row.id)}
            />
          </>
        );
      }
    }
  ];

  const handleRemove = (id) => {
    setdata(data.filter((item) => item.id !== id));
  };
  return (
    <div className="userList">
      <DataGrid
        rows={data}
        columns={column}
        pageSize={8}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
