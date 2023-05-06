export interface item {
    quantity: number;
    id: string;
    productName: string;
    unitPrice: number;
    category: string;
    imageUrl: string;
    description: string;
}

export interface ItemListProps {
    items: item[];
    onAddToCart: (itemId: string) => void;
    searchTerm: string;
    handleSearch: (searchTerm: string) => void;
}

export interface FilterProps {
    categories: string[];
    onCategorySelect: (category: string) => void;
    selectedCategory: string;
    onShowAll: () => void;
}

export interface SortProps {
    onSort: (sortOrder: 'desc' | 'asc') => void;
}

export interface CartItemProps {
    item: item;
    quantityMap: { [itemId: string]: number };
    onUpdateQuantity: (itemId: string, quantity: number) => void;
    onRemoveItem: (itemId: string) => void;
}

export interface CheckoutProps {
    onCheckout: () => void;
}

export interface ClearCartProps {
    onClearCart: () => void;
  }
