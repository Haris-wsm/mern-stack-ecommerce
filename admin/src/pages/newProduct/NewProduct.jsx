import './newProduct.css';
import { useState } from 'react';
import { addProducts } from '../../redux/apiCall';
import { useDispatch } from 'react-redux';

// firebase
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage';

import app from '../../firebase';

export default function NewProduct() {
  const [inputs, setInput] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(','));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const filename = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: downloadURL, categories: cat };
          addProducts(dispatch, product);
        });
      }
    );
  };

  return (
    <div className="newProduct">
      <h1 className="newProductItem">New Product</h1>
      <form action="" className="newProductForm">
        <div className="newProductItem">
          <label>Image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className="newProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="Apple Airpod"
            onChange={handleChange}
            name="title"
          />
        </div>
        <div className="newProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="description..."
            onChange={handleChange}
            name="desc"
          />
        </div>
        <div className="newProductItem">
          <label>Price</label>
          <input
            type="number"
            placeholder="100"
            onChange={handleChange}
            name="price"
          />
        </div>
        <div className="newProductItem">
          <label>Categories</label>
          <input
            type="text"
            placeholder="jeans,skirts"
            onChange={handleCat}
            name="categories"
          />
        </div>
        <div className="newProductItem">
          <label>Stock</label>
          <select
            name="inStock"
            id=""
            className="newProductSelect"
            onChange={handleChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <button className="newProductButton" onClick={handleClick}>
          Create
        </button>
      </form>
    </div>
  );
}
