import React, { createContext, useContext, useState } from 'react';

// Types
export type OrderStatus = 'Pending' | 'Preparing' | 'Ready for Pickup' | 'On the way' | 'Delivered' | 'Cancelled';

export interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: string;
    items: OrderItem[];
    total: number;
    status: OrderStatus;
    date: string;
    shopName: string;
    customerName: string;
    driverId?: string;
}

interface OrderContextType {
    orders: Order[];
    placeOrder: (items: OrderItem[], total: number) => void;
    updateOrderStatus: (orderId: string, status: OrderStatus) => void;
    assignDriver: (orderId: string, driverId: string) => void;
    getOrdersByRole: (role: 'client' | 'store' | 'runner') => Order[];
    activeOrder: Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
};

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
    const [orders, setOrders] = useState<Order[]>([
        // Mock initial data
        {
            id: '1025',
            items: [{ id: 1, name: 'Quarter Kota', price: 25, quantity: 2 }],
            total: 65, // items + delivery
            status: 'Pending',
            date: new Date().toLocaleDateString(),
            shopName: "Vusi's Kota Joint",
            customerName: 'Pharez',
        }
    ]);

    const placeOrder = (items: OrderItem[], total: number) => {
        const newOrder: Order = {
            id: Math.floor(Math.random() * 10000).toString(),
            items,
            total,
            status: 'Pending',
            date: new Date().toLocaleString(),
            shopName: "Vusi's Kota Joint", // Hardcoded for this phase
            customerName: 'Pharez', // Hardcoded for this phase
        };
        setOrders((prev) => [newOrder, ...prev]);
    };

    const updateOrderStatus = (orderId: string, status: OrderStatus) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === orderId ? { ...order, status } : order
            )
        );
    };

    const assignDriver = (orderId: string, driverId: string) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === orderId ? { ...order, driverId, status: 'On the way' } : order
            )
        );
    };

    const getOrdersByRole = (role: 'client' | 'store' | 'runner') => {
        switch (role) {
            case 'client':
                return orders; // Client sees all their orders
            case 'store':
                return orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled');
            case 'runner':
                return orders.filter(o => o.status === 'Ready for Pickup' || o.status === 'On the way');
            default:
                return [];
        }
    };

    const activeOrder = orders.find(o => o.status !== 'Delivered' && o.status !== 'Cancelled');

    return (
        <OrderContext.Provider value={{ orders, placeOrder, updateOrderStatus, assignDriver, getOrdersByRole, activeOrder }}>
            {children}
        </OrderContext.Provider>
    );
};
