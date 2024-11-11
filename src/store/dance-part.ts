import { createDancePart, deleteDancePart, fetchDancePartList, showDancePart, updateDancePart } from '@/service';
import { defineStore } from 'pinia';

export const useDancePartStore = defineStore('dancePart', {
  state: () => ({
    danceParts: [] as Entity.DancePart[],
    dancePart: {} as Entity.DancePart,
    errors: {} as Record<string, string[]>,
  }),
  actions: {
    async all(params: {
      page?: number,
      paginate?: boolean,
      pageSize?: number,
    } = {}
    ) {
      try {
        const response = await fetchDancePartList(params);
        this.danceParts = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    async show(id: number) {
      try {
        const response = await showDancePart(id);
        this.dancePart = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    async create(data: Entity.DancePart) {
      try {
        const response = await createDancePart(data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        this.errors = error.response.data.errors;
        console.error(error);
      }
    },
    async update(id: number, data: Partial<Entity.DancePart>) {
      try {
        const response = await updateDancePart(id, data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        console.error(error);
        this.errors = error.response.data.errors;
      }
    },
    async destroy(id: number) {
      try {
        const response = await deleteDancePart(id);
        return response;
      } catch (error: any) {
        console.error(error);
      }
    },
    clearDanceParts() {
      this.danceParts = [];
    },
  },
  getters: {
    totalDanceParts: (state) => state.danceParts.length,
    dancePartOptions: (state) => state.danceParts.map((dancePart) => ({
      value: dancePart.id,
      label: dancePart.name,
    })),
  },
});
