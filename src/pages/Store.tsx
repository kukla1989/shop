import { Row, Col } from 'react-bootstrap';

import { StoreItem } from '../components';
import { useShoppingCart } from '../context';
import { IStoreItems } from '../context/ShoppingCartContext/type';
export function Store () {
    const { storeItems } = useShoppingCart()
    return (
    <>
        <h1>Store</h1>
        <Row md={2} xs={1} lg={3} className='g-3'>
            {storeItems.map((item: IStoreItems) => (
                <Col key={item.id}><StoreItem {...item} /></Col>
            ))}
        </Row>
    </>)
}
