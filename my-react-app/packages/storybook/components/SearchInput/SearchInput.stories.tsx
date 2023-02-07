import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';
import { Layout, Text } from '@ui-kitten/components';

import SearchInput from './SearchInput';

const SearchInputMeta: ComponentMeta<typeof SearchInput> = {
  title: 'SearchInput',
  component: SearchInput,
  argTypes: {
    onSearchPress: {
      action: 'Search pressed',
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
    },
  },
  args: {
    placeholder: 'Search',
    size: 'small',
  },
};

export default SearchInputMeta;

type SearchInputStory = ComponentStory<typeof SearchInput>;

export const Basic: SearchInputStory = (args) => {
  const [inputValue, setInputValue] = useState('');
  const [searchedValue, setSearchedValue] = useState('');

  return (
    <Layout level="4" style={{ padding: 24 }}>
      <SearchInput
        {...args}
        value={inputValue}
        onChangeText={(e) => setInputValue(e)}
        onSearchPress={() => {
          setSearchedValue(inputValue);
        }}
      />
      <Text style={{ marginVertical: 16 }}>Input Text: {inputValue}</Text>
      <Text>Search text: {searchedValue}</Text>
    </Layout>
  );
};

export const InputDimensions: SearchInputStory = (args) => {
  return (
    <Layout level="4" style={{ padding: 24 }}>
      <SearchInput {...args} />
    </Layout>
  );
};
