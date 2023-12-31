import { useDispatch } from "react-redux";
import classes from "./CartItem.module.css";

import { cartActions } from "../../store/store";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { title, quantity, total, price, id } = props.item;

  const item = {
    name: title,
    price: price,
    id: id,
    quantity: 1,
    totalPrice: price,
  };

  const addHandler = () => {
    dispatch(cartActions.addItemCart(item));
  };

  const removeHandler = () => {
    dispatch(cartActions.removeItemCart(item.id));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeHandler}>-</button>
          <button onClick={addHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
