import { Spinner } from 'components/Spinner/Spinner';
import { useDeleteContactMutation } from 'redux/contactsApi';
import { TiDelete } from 'react-icons/ti';
import { ContactItemBtn, ListItem } from './Contact.styled';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const warningMsg = name =>
  toast.warn(`${name} contact has been removed!`, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
export const ContactItem = ({ item }) => {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  return (
    <ListItem>
      <span>{item.name}</span>
      <span>{item.phone}</span>
      <ContactItemBtn
        type="button"
        onClick={() => {
          deleteContact(item.id);
          warningMsg(item.name);
        }}
      >
        {isLoading ? <Spinner /> : <TiDelete />}
      </ContactItemBtn>
    </ListItem>
  );
};
