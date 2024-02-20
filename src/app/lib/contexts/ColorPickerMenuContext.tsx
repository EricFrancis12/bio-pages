'use client';

import React, { useState, useContext } from 'react';
import type { TColor } from '../types';
import BlackTransparentOverlay from '../components/BlackTransparentOverlay';

export type TColorPickerMenu = null | {
    name: string,
    value: TColor,
    onChange: (value: string) => void
};
export type TColorPickerMenuContext = {
    colorPickerMenu: TColorPickerMenu,
    setColorPickerMenu: React.Dispatch<React.SetStateAction<TColorPickerMenu>>
};

const ColorPickerMenuContext = React.createContext<TColorPickerMenuContext | null>(null);

export function useColorPickerMenu() {
    const context = useContext(ColorPickerMenuContext);
    if (!context) {
        throw new Error('useColorPickerMenu must be used within a ColorPickerMenuContext provider');
    }
    return context;
}

export function ColorPickerMenuProvider({ children }: {
    children: React.ReactNode
}) {
    const [colorPickerMenu, setColorPickerMenu] = useState<TColorPickerMenu>(null);

    const value = {
        colorPickerMenu,
        setColorPickerMenu
    };

    return (
        <ColorPickerMenuContext.Provider value={value}>
            {colorPickerMenu &&
                <ColorPickerMenu colorPickerMenu={colorPickerMenu} setColorPickerMenu={setColorPickerMenu} />
            }
            {children}
        </ColorPickerMenuContext.Provider>
    )
}

export function ColorPickerMenu({ colorPickerMenu, setColorPickerMenu }: {
    colorPickerMenu: TColorPickerMenu,
    setColorPickerMenu: React.Dispatch<React.SetStateAction<TColorPickerMenu>>
}) {
    return !!colorPickerMenu && (
        <BlackTransparentOverlay layer={1} className='flex justify-center items-start p-4'>
            <div
                className='flex flex-col justify-between items-center h-full w-full max-h-[90vh] text-black bg-white'
                style={{
                    maxWidth: '700px',
                    borderRadius: '5px'
                }}
            >
                Color Picker Menu
            </div>
        </BlackTransparentOverlay>
    )
}
