import { useSelector } from 'react-redux';
import { getFilter } from 'redux/filterSlice';
import { useGetContactsQuery } from 'redux/contactsApi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ContactItem } from './ContactItem';
export const Contact = () => {
  const filter = useSelector(getFilter);
  const { data, isFetching } = useGetContactsQuery();

  return (
    <>
      {!isFetching &&
        data
          .filter(item =>
            item.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map(item => {
            return <ContactItem key={item.id} item={item} />;
          })}
      <ToastContainer />
    </>
  );
};
