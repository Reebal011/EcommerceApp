import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';
import {COLORS, FONTS, SPACING, BORDER_RADIUS} from '../../utils/constants';

const ProductCard = ({product}) => (
  <Card containerStyle={styles.card}>
    <View style={styles.row}>
      <Image
        source={{uri: product.image}}
        style={styles.image}
        resizeMode="contain"
        testID="product-image"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
    </View>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS.medium,
    backgroundColor: COLORS.white,
    margin: SPACING.small,
    shadowColor: COLORS.textPrimary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.xSmall,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: BORDER_RADIUS.small,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: SPACING.medium,
  },
  title: {
    fontSize: FONTS.sizeMedium,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
  },
  price: {
    fontSize: FONTS.sizeLarge,
    color: COLORS.primary,
    marginTop: SPACING.small,
  },
  icon: {
    padding: SPACING.small,
  },
});

export default ProductCard;
