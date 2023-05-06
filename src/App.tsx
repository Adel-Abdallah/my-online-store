import { useState, useEffect } from 'react';
import './App.css';

import ItemList from './components/itemList/ItemList';
import Category from './components/category/Category';
import CartItem from './components/cartItem/CartItem';
import Checkout from './components/checkout/Checkout';

import { item } from './components/types';

interface CartSummary {
  totalItems: number;
  totalAmount: number;
}

function App() {
  const [items, setItems] = useState<item[]>([]);
  const [cartItems, setCartItems] = useState<item[]>([]);
  const [cartSummary, setCartSummary] = useState<CartSummary>({ totalItems: 0, totalAmount: 0 });
  const [quantityMap, setQuantityMap] = useState<{ [itemId: string]: number }>({}); // State to store item quantities
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('asc');


  useEffect(() => {
    // Fetch items data from item.json file
    fetch('/data/items.json')
      .then((response) => response.json())
      .then((data: item[]) => {
        setItems(data);
        const categories = [...new Set(data.map((item) => item.category))];
        setCategories(categories);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch cart items from localStorage when the component mounts
    const storedCartItems = localStorage.getItem('cartItems');
    const storedQuantityMap = localStorage.getItem('quantityMap');

    if (storedCartItems && storedQuantityMap) {
      setCartItems(JSON.parse(storedCartItems));
      setQuantityMap(JSON.parse(storedQuantityMap));
    }
    console.log('Retrieved cart items:', storedCartItems ? JSON.parse(storedCartItems) : null);
    console.log('Retrieved quantity map:', storedQuantityMap ? JSON.parse(storedQuantityMap) : null);

  }, []);

  useEffect(() => {
    console.log('Second useEffect - saving to local storage');
    // Save cart items and quantity map to localStorage whenever they change
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('quantityMap', JSON.stringify(quantityMap));
  }, [cartItems, quantityMap]);



  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    // Update the quantity map with the new quantity
    setQuantityMap((prevQuantityMap) => ({
      ...prevQuantityMap,
      [itemId]: quantity,
    }));

    // Update the cart items with the new quantity
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    setCartItems(updatedCartItems);

    // Calculate totalItems and totalAmount based on the updated cartItems state
    const totalItems = updatedCartItems.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = updatedCartItems.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0
    );
    setCartSummary({ totalItems, totalAmount });
  };

  const handleRemoveItem = (itemId: string) => {
    // Filter out the item with the given itemId from the cartItems array
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);

    // Update the cartItems state with the updated array
    setCartItems(updatedCartItems);

    // Calculate totalItems and totalAmount based on the updated cartItems state
    const totalItems = updatedCartItems.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = updatedCartItems.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0
    );
    setCartSummary({ totalItems, totalAmount });
  };


  const handleAddToCart = (itemId: string) => {
    // Find the item with the given itemId
    const itemToAdd = items.find((item) => item.id === itemId);

    if (itemToAdd) {
      // Check if the item is already in the cart
      const itemInCart = cartItems.find((item) => item.id === itemId);

      if (itemInCart) {
        // If the item is already in the cart, update the quantity by 1
        const updatedCartItems = cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedCartItems);

        // Update the quantityMap with the new quantity
        setQuantityMap((prevQuantityMap) => ({
          ...prevQuantityMap,
          [itemId]: itemInCart.quantity + 1,
        }));

        // Calculate totalItems and totalAmount based on the updated cartItems state
        const totalItems = updatedCartItems.reduce((total, item) => total + item.quantity, 0);
        const totalAmount = updatedCartItems.reduce(
          (total, item) => total + item.unitPrice * item.quantity,
          0
        );
        setCartSummary({ totalItems, totalAmount });
      } else {
        // If the item is not in the cart, add it with quantity 1
        const updatedCartItems = [...cartItems, { ...itemToAdd, quantity: 1 }];
        setCartItems(updatedCartItems);

        // Update the quantityMap with the new quantity
        setQuantityMap((prevQuantityMap) => ({
          ...prevQuantityMap,
          [itemId]: 1,
        }));

        // Calculate totalItems and totalAmount based on the updated cartItems state
        const totalItems = updatedCartItems.reduce((total, item) => total + item.quantity, 0);
        const totalAmount = updatedCartItems.reduce(
          (total, item) => total + item.unitPrice * item.quantity,
          0
        );
        setCartSummary({ totalItems, totalAmount });
      }
    }
  };



  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleCheckout = () => {
    // Handle checkout logic
    console.log("checkout")
  };



  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // Filter the items based on the selectedCategory
  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;


  const handleShowAll = () => {
    setSelectedCategory(''); // Set selectedCategory to an empty string to show all items
  };


  const handleSort = (order: string) => {
    setSortOrder(order);
  };


  const sortedItems = filteredItems.slice().sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.unitPrice - b.unitPrice;
    } else if (sortOrder === 'desc') {
      return b.unitPrice - a.unitPrice;
    } else {
      return 0;
    }
  });


  const handleClearCart = () => {
    setCartItems([]); // Clear the cart items array
    setQuantityMap({}); // Reset the quantity map
    setCartSummary({ totalItems: 0, totalAmount: 0 }); // Reset the cart summary
    // Remove cart items and quantity map from localStorage
    localStorage.removeItem('cartItems');
    localStorage.removeItem('quantityMap');
  };


  return (
    <div className="app-container">
      <nav className="navbar">
        <h3>Online Shopping Store</h3>
      </nav>
      <div className="content-container">


        <div className="sidebar">
          <h2>Categories</h2>
          <Category categories={categories} onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} onShowAll={handleShowAll} />
        </div>


        <div className="itemlist-container">
          <ItemList
            items={sortedItems}
            onAddToCart={handleAddToCart}
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            onSort={handleSort}
          />
        </div>
        <div className="cart-container">
          <div className='cart-title-container'>
            <h2>My Cart</h2>
            <button className="clear-cart-button" onClick={handleClearCart}>Clear my Cart</button>
          </div>
          <div className='cart-items-wrapper'>
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cartItems.slice().reverse().map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  quantityMap={quantityMap}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                />
              ))
            )}
          </div>
          <div className='cart-checkout-summary'>
            <div className="cart-summary">
              <div className="summary-row">
                <span>Total items: </span>
                <span className='item-price-small'>{cartSummary.totalItems}</span>
              </div>
              <div className="summary-row">
                <span>Total amount: </span>
                <span className='item-price-large'>&#8369;{cartSummary.totalAmount.toFixed(2)}</span>
              </div>
              <Checkout onCheckout={handleCheckout} onClearCart={handleClearCart} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
