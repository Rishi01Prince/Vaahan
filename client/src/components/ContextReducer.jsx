import React, { useReducer, useContext, createContext } from "react";

// Create Contexts for State and Dispatch
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer function to handle cart actions
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      console.log("Item Added");
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          span: action.span,
          price: action.price,
          img: action.img,
        },
      ];

    case "REMOVE":
      console.log("Item Removed");
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;

    case "DROP":
      console.log("Cart Emptied");
      return [];

    case "LOAD_CART":
      console.log("Cart Loaded");
      return action.cart;

    case "UPDATE":
      return state.map((item) => {
        if (item.id === action.id) {
          console.log("Updating item:", item, action.qty, action.price);
          return {
            ...item,
            qty: parseInt(action.qty) + item.qty, // Updated quantity logic
            price: item.price * (parseInt(action.qty) + 1), // Updated price logic
          };
        }
        return item;
      });

    default:
      console.log("Error in Reducer: Invalid action");
      return state;
  }
};

// CartProvider component to wrap around the app
export const CartProvider = ({ children }) => {
  // Initial state is an empty array, but could be set to an initial cart if needed
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Custom hook to use cart state
export const useCart = () => useContext(CartStateContext);

// Custom hook to dispatch actions to cart
export const useDispatchCart = () => useContext(CartDispatchContext);