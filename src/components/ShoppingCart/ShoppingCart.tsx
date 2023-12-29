import { Offcanvas, Stack } from "react-bootstrap";

import { useShoppingCart } from "../../context";
import { IStoreItems,TCartItem } from "../../context/ShoppingCartContext/type";
import { formatCurrency } from "../../utilities/formatCurrency";

import { CartItem } from "../CartItem/CartItem";

import { TShoppingCartProps } from "./type";

export function ShoppingCart({ isOpen } : TShoppingCartProps) {
  const { cartItems, closeCart, storeItems } = useShoppingCart()
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
            {cartItems.map((item: TCartItem) => (
                <CartItem key={item.id} {...item} />
            ))}
            <div className="ms-auto fw-bold fs-5">
              Total {formatCurrency(cartItems.reduce((total: number, cartItem: TCartItem) => {
                const item = storeItems.find((item: IStoreItems) => item.id === cartItem.id);
                return ((item?.price || 0) * cartItem.quantity) + total
              }, 0))}
            </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
