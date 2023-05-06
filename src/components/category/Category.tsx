import React from "react";
import { FilterProps } from "../types";
import './category.css'
const Filter: React.FC<FilterProps> = ({
    categories,
    onCategorySelect,
    selectedCategory,
    onShowAll,
}) => {
    const handleCategoryClick = (category: string) => {
        onCategorySelect(category);
    };

    return (
        <div className='filter-container'>
            <ul className='filter-list'>
                <li
                    onClick={() => onShowAll()}
                    className={!selectedCategory ? "selected" : ""}
                >
                    Show All
                </li>
                {categories.map((category) => (
                    <li
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className={selectedCategory === category ? "selected" : ""}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Filter;
