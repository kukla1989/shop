import { Offcanvas, Stack } from "react-bootstrap";

import { useShoppingCart } from "../../context";
import { formatCurrency } from "../../utilities/formatCurrency";
import storeItems from "../../data/items.json";

import { CartItem } from "../CartItem/CartItem";

import { TShoppingCartProps } from "./type";

export function ShoppingCart({ isOpen } : TShoppingCartProps) {
  const { cartItems, closeCart } = useShoppingCart()
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
            {cartItems.map(item => (
                <CartItem key={item.id} {...item} />
            ))}
            <div className="ms-auto fw-bold fs-5">
              Total {formatCurrency(cartItems.reduce((total, cartItem) => {
                const item = storeItems.find((item) => item.id === cartItem.id);
                return ((item?.price || 0) * cartItem.quantity) + total
              }, 0))}
            </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
