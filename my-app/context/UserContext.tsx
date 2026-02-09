import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserType = 'client' | 'runner' | 'store';

interface UserData {
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    // Client specific
    address?: string;
    // Runner specific
    vehicleType?: string;
    vehiclePlate?: string;
    // Store specific
    businessName?: string;
    businessAddress?: string;
}

interface UserSettings {
    notifications: boolean;
    darkMode: boolean;
    locationSharing: boolean;
    acceptCashOrders: boolean;
    isStoreOpen: boolean;
}

interface UserContextType {
    userType: UserType;
    userData: UserData;
    settings: UserSettings;
    setUserType: (type: UserType) => void;
    updateUserData: (data: Partial<UserData>) => void;
    updateSettings: (settings: Partial<UserSettings>) => void;
    logout: () => void;
}

const defaultUserData: UserData = {
    name: 'Thabo Mokoena',
    email: 'thabo@kasi.com',
    phone: '071 234 5678',
    address: '123 Vilakazi St, Soweto',
    // Mock data for other roles
    vehicleType: 'Motorbike',
    vehiclePlate: 'GP 123 AB',
    businessName: 'Kasi Kota Joint',
    businessAddress: '456 Mandala St, Soweto',
};

const defaultSettings: UserSettings = {
    notifications: true,
    darkMode: false,
    locationSharing: true,
    acceptCashOrders: false,
    isStoreOpen: true,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [userType, setUserType] = useState<UserType>('client');
    const [userData, setUserData] = useState<UserData>(defaultUserData);
    const [settings, setSettings] = useState<UserSettings>(defaultSettings);

    const updateUserData = (data: Partial<UserData>) => {
        setUserData(prev => ({ ...prev, ...data }));
    };

    const updateSettings = (newSettings: Partial<UserSettings>) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    const logout = () => {
        // Reset to default or handle logout logic
        console.log("User logged out");
    };

    return (
        <UserContext.Provider value={{
            userType,
            userData,
            settings,
            setUserType,
            updateUserData,
            updateSettings,
            logout
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
