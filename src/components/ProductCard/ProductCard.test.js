import React from 'react';
import {render} from '@testing-library/react-native';
import ProductCard from './ProductCard';
describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    title: 'Sample Product',
    price: 19.99,
    image: 'https://via.placeholder.com/150',
  };

  it('should render product title, price, and image correctly', () => {
    const {getByText, getByTestId} = render(
      <ProductCard product={mockProduct} />,
    );

    expect(getByText(mockProduct.title)).toBeTruthy();

    expect(getByText(`$${mockProduct.price.toFixed(2)}`)).toBeTruthy();

    const image = getByTestId('product-image');
    expect(image.props.source.uri).toBe(mockProduct.image);
  });

  it('should display the price with the correct format', () => {
    const {getByText} = render(<ProductCard product={mockProduct} />);
    expect(getByText('$19.99')).toBeTruthy();
  });
});
