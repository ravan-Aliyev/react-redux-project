import { useDispatch, useSelector } from "react-redux";
import classes from "./CartButton.module.css";

import { uiActions } from "../../store/store";

const CartButton = (props) => {
  const itemNumber = useSelector((state) => state.cart.items?.length) || 0;
  const dispatch = useDispatch();

  const toggleHandler = () => {
    dispatch(uiActions.toggleCart());
  };

  return (
    <button className={classes.button} onClick={toggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{itemNumber}</span>
    </button>
  );
};

export default CartButton;
