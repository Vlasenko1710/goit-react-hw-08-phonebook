import { useDispatch, useSelector } from 'react-redux';
import { FilterLabel, FilterInput, FilterSpan } from './Filter.styled';
import { filterContact, getFilter } from 'redux/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  return (
    <>
      <FilterLabel htmlFor="filter">
        <FilterSpan>Find contacts by name</FilterSpan>

        <FilterInput
          onChange={e => dispatch(filterContact(e.target.value))}
          value={filter}
          type="text"
          name="filter"
          autoComplete="off"
        />
      </FilterLabel>
    </>
  );
};
