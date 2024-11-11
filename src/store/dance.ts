import { createDance, deleteDance, fetchDanceList, showDance, updateDance } from '@/service';
import { defineStore } from 'pinia';

export const useDanceStore = defineStore('dance', {
  state: () => ({
    dances: [] as Entity.Dance[],
    dance: {} as Entity.Dance,
    errors: {} as Record<string, string[]>,
  }),
  actions: {
    async all(params: {
      page?: number,
      paginate?: boolean,
      includeDanceType?: boolean,
      pageSize?: number,
    } = {}
    ) {
      try {
        const response = await fetchDanceList(params);
        this.dances = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    async show(id: number) {
      try {
        const response = await showDance(id);
        this.dance = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    async create(data: Entity.Dance) {
      try {
        const response = await createDance(data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        this.errors = error.response.data.errors;
        console.error(error);
      }
    },
    async update(id: number, data: Partial<Entity.Dance>) {
      try {
        const response = await updateDance(id, data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        console.error(error);
        this.errors = error.response.data.errors;
      }
    },
    async destroy(id: number) {
      try {
        const response = await deleteDance(id);
        return response;
      } catch (error: any) {
        console.error(error);
      }
    },
    clearDances() {
      this.dances = [];
    },
  },
  getters: {
    totalDances: (state) => state.dances.length,
    danceOptions: (state) => state.dances.map((dance) => ({
      value: dance.id,
      label: dance.name,
    })),
  },
});
