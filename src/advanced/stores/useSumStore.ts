import { create } from 'zustand/react';

// 고객 구매 정보 상태 정의
interface SumState {
  total: number;
  originTotal: number;
  itemCnt: number;
  discountRate: number;
  bonusPts: number;

  setTotal: (val: number) => void;
  setOriginTotal: (val: number) => void;
  setItemCnt: (val: number) => void;
  setDiscountRate: (val: number) => void;
  setBonusPts: (val: number) => void;
  updateCart: (items: { id: string; price: number; quantity: number }[]) => void;
}

export const useSumStore = create<SumState>((set) => ({
  total: 0,
  originTotal: 0,
  itemCnt: 0,
  discountRate: 0,
  bonusPts: 0,

  setTotal: (val) => set({ total: val }),
  setOriginTotal: (val) => set({ originTotal: val }),
  setItemCnt: (val) => set({ itemCnt: val }),
  setDiscountRate: (val) => set({ discountRate: val }),
  setBonusPts: (val) => set({ bonusPts: val }),
}));
