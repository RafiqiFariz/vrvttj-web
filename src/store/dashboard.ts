import { fetchDashboardData } from '@/service';
import { defineStore } from 'pinia';

interface DashboardState {
  data: {
    students: number;
    dance_types: number;
    dance_moves: number;
    dance_clothes: number;
  };
  status: string;
}

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    data: {} as DashboardState['data'],
  }),
  actions: {
    async fetchData() {
      try {
        const response = await fetchDashboardData();
        this.data = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    clear() {
      this.data = {} as DashboardState['data'];
    },
  },
});
