import { createDanceCloth, deleteDanceCloth, fetchDanceClothList, showDanceCloth, updateDanceCloth } from '@/service';
import { defineStore } from 'pinia';

export const useDanceClothesStore = defineStore('danceClothes', {
  state: () => ({
    danceClothes: [] as Entity.DanceClothes[],
    danceCloth: {} as Entity.DanceClothes,
    errors: {} as Record<string, string[]>,
  }),
  actions: {
    async all(params: {
      page?: number,
      paginate?: boolean,
      includeDance?: boolean,
      pageSize?: number,
    } = {}
    ) {
      try {
        const response = await fetchDanceClothList(params);
        this.danceClothes = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    async show(id: number) {
      try {
        const response = await showDanceCloth(id);
        this.danceCloth = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    async create(data: Entity.DanceClothes) {
      try {
        const response = await createDanceCloth(data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        console.error(error);
        this.errors = error.response.data.errors;
      }
    },
    async update(id: number, data: Partial<Entity.DanceClothes>) {
      try {
        const response = await updateDanceCloth(id, data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        console.error(error);
        this.errors = error.response.data.errors;
      }
    },
    async destroy(id: number) {
      try {
        const response = await deleteDanceCloth(id);
        return response;
      } catch (error: any) {
        console.error(error);
      }
    },
    clearDanceCloths() {
      this.danceClothes = [];
    },
  },
  getters: {
    totalDanceCloths: (state) => state.danceClothes.length,
  },
});
