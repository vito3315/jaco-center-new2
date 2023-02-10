import { create } from 'zustand';
// import { persist, devtools } from 'zustand/middleware'

export const useOrders = create<unknown>((set) => ({
  loading: false,
  error: null,
  cities: [],
  point: [],
  allItems: []
}));
