import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ProductCard from '../ProductCard/ProductCard';
import Filters from './Filters';
import {fetchProducts} from '../../services/productService';
import {BORDER_RADIUS, COLORS, FONTS, SPACING} from '../../utils/constants';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);

  const loadProducts = async (reset = false) => {
    setLoading(true);
    const newProducts = await fetchProducts(category);
    setTotalProducts(newProducts.length);
    const paginatedProducts = newProducts.slice(0, page * 5);
    setProducts(
      reset
        ? paginatedProducts
        : [...products, ...newProducts.slice((page - 1) * 5, page * 5)],
    );
    setLoading(false);
  };

  useEffect(() => {
    loadProducts(true);
  }, [category]);

  const handleLoadMore = () => {
    if (products.length < totalProducts) {
      setPage(prevPage => prevPage + 1);
      loadProducts();
    }
  };

  const handleClearFilter = () => {
    setCategory('');
    setPage(1);
  };

  const renderFooter = () => {
    if (loading) {
      return <Text style={styles.footerText}>Loading...</Text>;
    }
    if (products.length >= totalProducts) {
      return <Text style={styles.footerText}>No more data</Text>;
    }
    return (
      <TouchableOpacity
        onPress={handleLoadMore}
        style={styles.loadMoreButton}
        disabled={loading || products.length >= totalProducts}>
        <Text style={styles.loadMoreText}>Load More</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Filters
        selectedCategory={category}
        onSelectCategory={cat => {
          setCategory(cat);
          setPage(1);
        }}
        onClearFilter={handleClearFilter}
      />
      <FlatList
        data={products}
        renderItem={({item}) => <ProductCard product={item} />}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={renderFooter()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: SPACING.small},
  loadMoreButton: {
    marginHorizontal: SPACING.small,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.small,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginRight: SPACING.small,
    shadowColor: COLORS.textPrimary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
    alignItems: 'center',
    marginTop: SPACING.large,
  },
  loadMoreText: {
    color: COLORS.white,
    fontSize: FONTS.sizeMedium,
  },
  footerText: {
    fontSize: FONTS.sizeMedium,
    textAlign: 'center',
    marginVertical: SPACING.small,
  },
});

export default ProductList;
