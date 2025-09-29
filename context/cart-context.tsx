"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect
} from "react";
import { CartItem } from "../lib/types";

interface CartState {
  cartItems: CartItem[];
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };

interface CartContextType extends CartState {
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const getInitialCartState = (): CartState => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("cartItems");
      if (stored) return { cartItems: JSON.parse(stored) };
    } catch (err) {
      console.error("Error reading localStorage", err);
    }
  }
  return { cartItems: [] };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cartItems.find(
        (item) =>
          item.product.id === action.payload.product.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );

      if (existingItem) {
        const updatedQty = existingItem.quantity + action.payload.quantity;

        // ✅ Prevent quantity from exceeding stock
        const finalQty =
          updatedQty > existingItem.stock ? existingItem.stock : updatedQty;

        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product.id === action.payload.product.id &&
            item.size === action.payload.size &&
            item.color === action.payload.color
              ? { ...item, quantity: finalQty }
              : item
          )
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, action.payload]
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) =>
            `${item.product.id}-${item.size}-${item.color}` !== action.payload
        )
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          const id = `${item.product.id}-${item.size}-${item.color}`;
          if (id === action.payload.id) {
            const newQty =
              action.payload.quantity > item.stock
                ? item.stock
                : action.payload.quantity;
            return { ...item, quantity: newQty };
          }
          return item;
        })
      };

    case "CLEAR_CART":
      return {
        ...state,
        cartItems: []
      };

    default:
      return state;
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    undefined,
    getInitialCartState
  );

  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    } catch (err) {
      console.error("Failed to save cart to localStorage", err);
    }
  }, [state.cartItems]);

  const addToCart = (item: CartItem) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    }
  };

  const clearCart = () => {
    localStorage.removeItem("cartItems");
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
