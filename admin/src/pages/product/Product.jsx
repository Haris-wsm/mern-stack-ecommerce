import { Link, useParams } from 'react-router-dom';
import Chart from '../../components/chart/Chart';
import './product.css';
import { productData } from '../../dummy';
import { Publish } from '@mui/icons-material';

import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { userRequest } from '../../redux/requestMethods';

export default function Product() {
  const [pStats, setPStats] = useState([]);

  const { productId } = useParams();
  const product = useSelector((state) =>
    state.product.products.find((item) => item._id === productId)
  );

  const MONTHS = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jui',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get('/orders/income?pid=' + productId);
        res.data.map((item) => {
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total }
          ]);
        });
      } catch (error) {}
    };
    getStats();
  }, [MONTHS, productId]);

  console.log(pStats);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddBotton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart title="Sales Performance" data={pStats} dataKey="Sales" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id: </span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">
                {product.inStock ? 'yes' : 'no'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form action="" className="productForm">
          <div className="productFormLeft">
            <label htmlFor="">Product Name</label>
            <input type="text" placeholder={product.title} />
            <label>Product Description</label>
            <input type="text" placeholder={product.desc} />
            <label>Product Price</label>
            <input type="number" placeholder={product.price} min="1" />
            <label>In Stock</label>
            <select name="inStock" id="idStock" value={product.inStock}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} className="productUploadImg" alt="" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: 'none' }} />
            </div>
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
