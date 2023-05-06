import React, { useState } from 'react';
import { ItemListProps, SortProps } from '../types';
import './itemList.css'

const ItemList: React.FC<ItemListProps & SortProps> = ({ items, onAddToCart, searchTerm, handleSearch, onSort }) => {
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const isAscending = sortOrder === 'asc';

    const handleSortClick = () => {
        setSortOrder(isAscending ? 'desc' : 'asc');
        onSort(isAscending ? 'desc' : 'asc');
    };

    const filteredItems = items.filter(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="item-list-container">
            <input
                className="item-card"
                type="text"
                placeholder="Search by Product Name"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
            />
            <p className="sort-btn" onClick={handleSortClick}>
                Sort by Price ({isAscending ? 'Low to High' : 'High to Low'})
            </p>
            <div className='scroll'>
            {filteredItems.map((item) => (
                <div key={item.id} className="item-card">
                    <img src={item.imageUrl} alt={item.productName} className="item-image" />
                    <div className="item-details">
                        <div>
                            <h3 className="item-name">{item.productName}</h3>
                            <span className='item-category'>{item.category}</span>
                            <p className="item-description">{item.description}</p>
                        </div>
                        <div>
                            <p className="item-price-large">&#8369;{item.unitPrice}</p>
                            <button className="add-to-cart-btn" onClick={() => onAddToCart(item.id)}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};

export default ItemList;
