import React from 'react';
import {SafeAreaView} from 'react-native';
import ProductList from './src/components/ProductList/ProductList';

const App = () => (
  <SafeAreaView style={{flex: 1}}>
    <ProductList />
  </SafeAreaView>
);

export default App;
