import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCart } from "././../utils/cartSlice";

const Cart = () => {
  const cartData = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div>
      <div className="text-bold">Cart</div>
      <button onClick={handleClearCart}>Clear Cart</button>
      {cartData.map((item) => item.description)}
    </div>
  );
};

export default Cart;
