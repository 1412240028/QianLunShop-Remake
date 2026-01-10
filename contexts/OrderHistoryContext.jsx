import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Order History Context
const OrderHistoryContext = createContext();

// Order reducer
const orderReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders] // New orders at the top
      };

    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.orderId
            ? { ...order, status: action.payload.status, updatedAt: new Date().toISOString() }
            : order
        )
      };

    case 'CLEAR_ORDER_HISTORY':
      return {
        ...state,
        orders: []
      };

    case 'LOAD_ORDERS':
      return {
        ...state,
        orders: action.payload
      };

    default:
      return state;
  }
};

// Initial state
const initialState = {
  orders: []
};

// Order History Provider Component
export const OrderHistoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  // Load orders from localStorage on mount
  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem('qianlun-orders');
      if (savedOrders) {
        const orders = JSON.parse(savedOrders);
        if (Array.isArray(orders) && orders.length > 0) {
          dispatch({ type: 'LOAD_ORDERS', payload: orders });
        }
      }
    } catch (error) {
      console.error('Error loading orders from localStorage:', error);
      localStorage.removeItem('qianlun-orders');
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('qianlun-orders', JSON.stringify(state.orders));
    } catch (error) {
      console.error('Error saving orders to localStorage:', error);
    }
  }, [state.orders]);

  // Order actions
  const addOrder = (orderData) => {
    const newOrder = {
      id: `ORDER-${Date.now()}`,
      ...orderData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: orderData.status || 'pending'
    };
    
    dispatch({
      type: 'ADD_ORDER',
      payload: newOrder
    });
    
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    dispatch({
      type: 'UPDATE_ORDER_STATUS',
      payload: { orderId, status }
    });
  };

  const clearOrderHistory = () => {
    dispatch({ type: 'CLEAR_ORDER_HISTORY' });
  };

  const getOrderById = (orderId) => {
    return state.orders.find(order => order.id === orderId);
  };

  const getOrdersByStatus = (status) => {
    return state.orders.filter(order => order.status === status);
  };

  const getTotalSpent = () => {
    return state.orders
      .filter(order => order.status === 'completed')
      .reduce((total, order) => total + order.total, 0);
  };

  const value = {
    orders: state.orders,
    addOrder,
    updateOrderStatus,
    clearOrderHistory,
    getOrderById,
    getOrdersByStatus,
    getTotalSpent
  };

  return (
    <OrderHistoryContext.Provider value={value}>
      {children}
    </OrderHistoryContext.Provider>
  );
};

// Custom hook to use order history context
export const useOrderHistory = () => {
  const context = useContext(OrderHistoryContext);
  if (!context) {
    throw new Error('useOrderHistory must be used within an OrderHistoryProvider');
  }
  return context;
};