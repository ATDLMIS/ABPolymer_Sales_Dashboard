import { useState, useEffect } from 'react';
import axios from 'axios';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const BookByIdV2 = ({ name = 'ProductID', item, update }) => {
  const [books, setBooks] = useState([]);
  const getBooksByCategoryId = async () => {
    const res = await Axios.get(
      `?action=get_productcategorywise&Categoryid=${item.BooksGroupID}`
    );
    setBooks([...res.data]);
  };

  useEffect(() => {
    getBooksByCategoryId();
  }, [item.BooksGroupID]);

  return (
    <select
      name={name}
      className="w-full rounded-md py-[0.40rem]"
      value={item[name]}
      onChange={event => update(event, item.id)}
      disabled={item.BooksGroupID && item.FinancialYearID ? false : true}
    >
      <option value=""></option>
      {books.length &&
        books.map(book => (
          <option value={book.ProductID} key={book.ProductID}>
            {book.ProductName}
          </option>
        ))}
    </select>
  );
};

export default BookByIdV2;
