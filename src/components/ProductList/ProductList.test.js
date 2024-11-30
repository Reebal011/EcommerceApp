import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import ProductList from './ProductList';
import {fetchProducts} from '../../services/productService';
import {MOCK_PRODUCTS} from '../../utils/constants';

jest.mock('../../services/productService', () => ({
  fetchProducts: jest.fn(),
}));

describe('ProductList', () => {
  beforeEach(() => {
    fetchProducts.mockResolvedValue(MOCK_PRODUCTS);
  });

  it('renders the product list correctly', async () => {
    const {getByText} = render(<ProductList />);

    await waitFor(() => expect(fetchProducts).toHaveBeenCalledTimes(1));
    expect(getByText('Load More')).toBeTruthy();
  });

  it('handles category selection correctly', async () => {
    const {getByText} = render(<ProductList />);

    fireEvent.press(getByText('Category 1'));
    await waitFor(() =>
      expect(fetchProducts).toHaveBeenCalledWith('Category 1'),
    );
  });

  it('loads more products when Load More is pressed', async () => {
    const {getByText} = render(<ProductList />);

    await waitFor(() => expect(fetchProducts).toHaveBeenCalledTimes(1));
    fireEvent.press(getByText('Load More'));
    await waitFor(() => expect(fetchProducts).toHaveBeenCalledTimes(2));
  });

  it('disables Load More button when all products are loaded', async () => {
    const {getByText} = render(<ProductList />);

    await waitFor(() => expect(fetchProducts).toHaveBeenCalledTimes(1));
    fireEvent.press(getByText('Load More'));
    await waitFor(() => expect(getByText('No more data')).toBeTruthy());
  });

  it('clears the filter when Clear is pressed', async () => {
    const {getByText} = render(<ProductList />);

    fireEvent.press(getByText('Category 1'));
    await waitFor(() =>
      expect(fetchProducts).toHaveBeenCalledWith('Category 1'),
    );
    fireEvent.press(getByText('Clear'));
    await waitFor(() => expect(fetchProducts).toHaveBeenCalledWith(''));
  });
});
