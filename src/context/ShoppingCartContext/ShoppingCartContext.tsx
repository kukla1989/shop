import { useState, useEffect } from "react";
import { createContext, useContext } from "react";

import { ShoppingCart } from "../../components/";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { TShoppingCartProviderProps, TShoppingCartContext, TCartItem, IStoreItems } from './type'

import storeItemDatas from '../../data/items.json'

const ShoppingCartContext = createContext({} as TShoppingCartContext );

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children } : TShoppingCartProviderProps ) {
  const [storeItems, setStoreItems] = useState<IStoreItems[]>([])
  const [cartItems, setCartItems] = useLocalStorage<TCartItem[]>('shopping-cart',[])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
      setStoreItems(storeItemDatas);
  }, [])

  useEffect(() => {
    if(cartItems.length === 0) setIsOpen(false)
  }, [cartItems])

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  function increaseItemQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1}]
      } else {
        return currItems.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
      }
    })
  }

  function decreaseItemQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id)?.quantity == 1) {
        return currItems.filter(item => item.id !== id)
      } else {
        return currItems.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
      }
    })
  }

  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromCart,
        storeItems,
        cartItems,
        cartQuantity,
        openCart,
        closeCart
      }}
    >
      {children}
      {cartItems.length > 0 && <ShoppingCart isOpen={isOpen}/>}
    </ShoppingCartContext.Provider>
  );
}
