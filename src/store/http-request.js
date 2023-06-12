import { uiActions } from "./store";
import { cartActions } from "./store";

export const sendCartData = (cartData) => {
  return async (dispatch) => {
    dispatch(
      uiActions.setNotification({
        status: "pending",
        title: "Sending...",
        message: "Please wait",
      })
    );

    const sendRequest = async () => {
      const res = await fetch(
        "https://learning-redux-project-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cartData.items,
            totalQuantity: cartData.totalQuantity,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Sending cart data fail");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.setNotification({
          status: "success",
          title: "Success!",
          message: "Send data successfully!",
        })
      );
    } catch (err) {
      dispatch(
        uiActions.setNotification({
          status: "error",
          title: "Error",
          message: "Something went wrong",
        })
      );
    }
  };
};

export const getCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(
        "https://learning-redux-project-default-rtdb.firebaseio.com/cart.json"
      );

      if (!res.ok) throw new Error("Can not fetch data");

      const data = await res.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.setNotification({
          status: "error",
          title: "Error",
          message: "Fetching went wrong",
        })
      );
    }
  };
};
