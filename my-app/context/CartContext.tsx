import React, { createContext, useState, useContext } from 'react';

type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};

type CartContextType = {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    getTotalAmount: () => number;
    deliveryAddress: string | null;
    setDeliveryAddress: (address: string | null) => void;
};

const CartContext = createContext<CartContextType>({
    cartItems: [],
    addToCart: () => { },
    removeFromCart: () => { },
    clearCart: () => { },
    getTotalAmount: () => 0,
    deliveryAddress: null,
    setDeliveryAddress: () => { },
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [deliveryAddress, setDeliveryAddress] = useState<string | null>(null);

    const addToCart = (item: CartItem) => {
        // ... (rest of addToCart implementation stays implicitly same if not touched, but since I'm replacing the provider block I need to be careful)
        // Wait, replace_file_content replaces a *range*. I should use the correct range to inject the state and update the value prop.
        // Let's just update the provider return value and state definition separately if they are far apart, or together if close.
        // They are relatively close.
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.id === item.id);
            if (existingItem) {
                return prevItems.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems((prevItems) => prevItems.filter((i) => i.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
        setDeliveryAddress(null);
    };

    const getTotalAmount = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getTotalAmount, deliveryAddress, setDeliveryAddress }}>
            {children}
        </CartContext.Provider>
    );
};
