import { ReactNode } from "react"

export type TShoppingCartProviderProps = {
    children: ReactNode
}

export type TShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseItemQuantity: (id: number) => void
    decreaseItemQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: TCartItem[]
    storeItems: IStoreItems[]
}

export type TCartItem = {
    id: number
    quantity: number
}

export interface IStoreItems {
    id: number,
    name: string,
    price: number,
    imgUrl: string
}