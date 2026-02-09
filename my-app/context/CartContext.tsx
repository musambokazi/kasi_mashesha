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
    tipAmount: number;
    setTipAmount: (amount: number) => void;
};

const CartContext = createContext<CartContextType>({
    cartItems: [],
    addToCart: () => { },
    removeFromCart: () => { },
    clearCart: () => { },
    getTotalAmount: () => 0,
    deliveryAddress: null,
    setDeliveryAddress: () => { },
    tipAmount: 0,
    setTipAmount: () => { },
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [deliveryAddress, setDeliveryAddress] = useState<string | null>(null);
    const [tipAmount, setTipAmount] = useState<number>(0);

    const addToCart = (item: CartItem) => {
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
        setTipAmount(0);
    };

    const getTotalAmount = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0) + tipAmount;
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            clearCart,
            getTotalAmount,
            deliveryAddress,
            setDeliveryAddress,
            tipAmount,
            setTipAmount
        }}>
            {children}
        </CartContext.Provider>
    );
};
