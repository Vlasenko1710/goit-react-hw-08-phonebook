import { useGetContactsQuery } from 'redux/contactsApi';
import { GlobalStyle } from 'GlobalStyle';
import { ContactList } from '../ContactList/ContactList';
import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { Spinner } from 'components/Spinner/Spinner';
import { Container, PhonebookTitle, ContactsTitle } from './App.styled';

export default function App() {
  const { data, isFetching } = useGetContactsQuery();
  const showContactList = data && !isFetching && data.length > 0;
  const showText = data && data.length === 0 && !isFetching;
  return (
    <Container>
      <GlobalStyle></GlobalStyle>
      <PhonebookTitle>Phonebook</PhonebookTitle>
      <ContactForm />
      <ContactsTitle>Contacts</ContactsTitle>
      <Filter />
      {showContactList ? <ContactList /> : <Spinner />}
      {showText && (
        <p style={{ textAlign: 'center' }}>Don't have contacts...</p>
      )}
    </Container>
  );
}
