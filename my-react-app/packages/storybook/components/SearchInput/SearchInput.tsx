import React from 'react';
import { Input, InputProps } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

interface SearchInputProps extends InputProps {
  onSearchPress?: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearchPress, ...rest }) => {
  return (
    <Input
      status="basic"
      accessoryRight={() => (
        <TouchableOpacity activeOpacity={0.8} onPress={onSearchPress}>
          <Ionicons name="search-outline" size={24} color="white" />
        </TouchableOpacity>
      )}
      placeholder={'Search'}
      size={'large'}
      style={{ borderRadius: 16 }}
      {...rest}
    />
  );
};

export default SearchInput;
