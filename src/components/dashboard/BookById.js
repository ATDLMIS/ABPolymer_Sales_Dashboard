import { useState, useEffect } from 'react';
import axios from 'axios';
import Axios from '@/utils/axios';
import FormSelect from '../fromField/FormSelect';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const ProductById = ({ item, update }) => {
  const [books, setBooks] = useState([]);
  const getBooksByCategoryId = async () => {
    const res = await Axios.get(
      `?action=get_productcategorywise&Categoryid=${item.ProductCategoryID}`
    );
    setBooks([...res.data]);
  };

  useEffect(() => {
    getBooksByCategoryId();
  }, [item.ProductCategoryID]);

  return (
    <FormSelect
  onChange={(e) => update(e, item)}
  disabled={!item.ProductCategoryID}
  value={item.ProductID}
  labelKey="ProductName"
  valueKey="ProductID"
  options={books}
  placeholder="Product name"
   id="ProductID"
  name="ProductID"
  searchKeys={["ProductName", "ProductID"]}
/>


  );
};

export default ProductById;
