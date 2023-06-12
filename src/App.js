import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

import { useSelector, useDispatch } from "react-redux";

import { sendCartData, getCartData } from "./store/http-request";

let isInitial = true;

function App() {
  const ui = useSelector((state) => state.ui);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart]);

  useEffect(() => {
    dispatch(getCartData());
  }, []);

  return (
    <>
      {ui.notification && (
        <Notification
          status={ui.notification.status}
          title={ui.notification.title}
          message={ui.notification.message}
        />
      )}
      <Layout>
        {ui.showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
