import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Filters from './Filters';
import {fetchCategories} from '../../services/productService';
import {COLORS} from '../../utils/constants';

jest.mock('../services/productService', () => ({
  fetchCategories: jest.fn(),
}));

describe('Filters', () => {
  const mockOnSelectCategory = jest.fn();
  const mockOnClearFilter = jest.fn();

  beforeEach(() => {
    fetchCategories.mockResolvedValue(['Electronics', 'Clothing', 'Books']);
  });

  it('should render category buttons and handle category selection', async () => {
    const {getByText, findByText} = render(
      <Filters
        selectedCategory=""
        onSelectCategory={mockOnSelectCategory}
        onClearFilter={mockOnClearFilter}
      />,
    );

    await findByText('Electronics');

    expect(getByText('Electronics')).toBeTruthy();
    expect(getByText('Clothing')).toBeTruthy();
    expect(getByText('Books')).toBeTruthy();

    fireEvent.press(getByText('Electronics'));
    expect(mockOnSelectCategory).toHaveBeenCalledWith('Electronics');
  });

  it('should render the clear filter button and call the onClearFilter function', async () => {
    const {getByText, findByText} = render(
      <Filters
        selectedCategory="Electronics"
        onSelectCategory={mockOnSelectCategory}
        onClearFilter={mockOnClearFilter}
      />,
    );

    await findByText('Electronics');

    const clearButton = getByText('Clear');
    expect(clearButton).toBeTruthy();

    fireEvent.press(clearButton);
    expect(mockOnClearFilter).toHaveBeenCalled();
  });

  it('should show the selected category with the correct styles', async () => {
    const {getByText, findByText} = render(
      <Filters
        selectedCategory="Electronics"
        onSelectCategory={mockOnSelectCategory}
        onClearFilter={mockOnClearFilter}
      />,
    );

    await findByText('Electronics');

    const selectedButton = getByText('Electronics').parent;
    expect(selectedButton.props.style).toContainEqual(
      expect.objectContaining({
        backgroundColor: COLORS.primary,
      }),
    );
  });
});
