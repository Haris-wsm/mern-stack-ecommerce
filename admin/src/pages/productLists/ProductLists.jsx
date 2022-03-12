import './productLists.css';
import { DataGrid } from '@mui/x-data-grid';
import { productRows } from '../../dummy';
import { useEffect, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import { deleteProducts, getProducts } from '../../redux/apiCall';
import { useDispatch, useSelector } from 'react-redux';

export default function ProductLists() {
  const patch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProducts(patch);
  }, [patch]);

  const handleRemove = (id) => {
    deleteProducts(patch, id);
  };

  const column = [
    { field: '_id', headerName: 'ID', width: 200 },
    {
      field: 'Product',
      headerName: 'Product',
      width: 150,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      }
    },
    {
      field: 'inStock',
      headerName: 'Stock',
      type: 'number',
      width: 150
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 150
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/products/${params.row._id}`}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="productListDelete"
              onClick={() => handleRemove(params.row._id)}
            />
          </>
        );
      }
    }
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={products}
        columns={column}
        pageSize={8}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
