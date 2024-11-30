import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {fetchCategories} from '../services/productService';
import {COLORS, SPACING, BORDER_RADIUS, FONTS} from '../utils/constants';
import {capitalizeFirstLetter} from '../../utils/functions';

const Filters = ({selectedCategory, onSelectCategory, onClearFilter}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };
    loadCategories();
  }, []);

  const renderCategoryButton = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onSelectCategory(item)}
      style={[
        styles.categoryButton,
        selectedCategory === item && styles.selectedButton,
      ]}>
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.selectedText,
        ]}>
        {capitalizeFirstLetter(item)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={['All', ...categories]}
        horizontal
        renderItem={({item}) =>
          item === 'All' ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onClearFilter}
              style={[styles.clearButton]}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          ) : (
            renderCategoryButton({item})
          )
        }
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: SPACING.medium,
    paddingHorizontal: SPACING.small,
  },
  categoryButton: {
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.small,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginRight: SPACING.small,
    shadowColor: COLORS.textPrimary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  selectedButton: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    color: COLORS.primary,
    fontSize: FONTS.sizeMedium,
    fontFamily: FONTS.regular,
  },
  selectedText: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
  clearButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
    borderRadius: BORDER_RADIUS.small,
    marginRight: SPACING.small,
  },
  clearButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizeMedium,
    fontFamily: FONTS.bold,
  },
});

export default Filters;
