import gql from 'graphql-tag';
import { resetIdCounter, useCombobox } from 'downshift';
import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search() {
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );

  // const findItemsButChill = debounce(findItems, 350);
  // console.log({ findItemsButChill });

  resetIdCounter();
  console.log({ data });

  const { inputValue, getMenuProps, getInputProps, getComboboxProps } =
    useCombobox({
      items: [],
      onInputValueChange() {
        findItems({
          variables: {
            searchTerm: inputValue,
          },
        });
      },
      onSelectedItemChange() {
        console.log('selected change');
      },
    });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'search',
            id: 'search',
            className: 'loading',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        <DropDownItem>1</DropDownItem>
      </DropDown>
    </SearchStyles>
  );
}
