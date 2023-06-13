import { useState } from 'react';
import { useGetContactsQuery, useAddContactMutation } from 'redux/contactsApi';
import { Spinner } from 'components/Spinner/Spinner';
import {
  FormLabel,
  LabelSpan,
  BtnSubmit,
  Input,
} from 'components/ContactForm/ContactForm.styled';

//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const errorMsg = name =>
  toast.error(`${name} is already in contacts!`, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
const succsessMsg = name =>
  toast.success(`${name} add to your contacts!`, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setNumber] = useState('');

  const { data } = useGetContactsQuery();
  const [addContact, { isLoading }] = useAddContactMutation();

  const onSubmit = e => {
    e.preventDefault();
    const names = data?.map(item => item.name);
    if (names.some(item => item.toLowerCase() === name.toLowerCase())) {
      errorMsg(name);
      return;
    }
    const newContact = { name, phone };
    addContact(newContact);
    succsessMsg(name);
    setName('');
    setNumber('');
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <FormLabel htmlFor="name">
          <LabelSpan>Name</LabelSpan>
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </FormLabel>
        <FormLabel htmlFor="number">
          <LabelSpan>Number</LabelSpan>
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={phone}
            onChange={e => setNumber(e.target.value)}
          />
        </FormLabel>
        <div>
          <BtnSubmit type="submit" disabled={isLoading}>
            {isLoading ? <Spinner /> : 'Submit'}
          </BtnSubmit>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};
