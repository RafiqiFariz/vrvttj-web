import { createDanceCostume, deleteDanceCostume, fetchDanceCostumeList, showDanceCostume, updateDanceCostume } from '@/service';
import { defineStore } from 'pinia';

export const useDanceCostumeStore = defineStore('danceCostume', {
  state: () => ({
    danceCostumes: [] as Entity.DanceCostume[],
    danceCostume: {} as Entity.DanceCostume,
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
        const response = await fetchDanceCostumeList(params);
        this.danceCostumes = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    async show(id: number) {
      try {
        const response = await showDanceCostume(id);
        this.danceCostume = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    async create(data: Entity.DanceCostume) {
      try {
        const response = await createDanceCostume(data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        console.error(error);
        this.errors = error.response.data.errors;
      }
    },
    async update(id: number, data: Partial<Entity.DanceCostume>) {
      try {
        const response = await updateDanceCostume(id, data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        console.error(error);
        this.errors = error.response.data.errors;
      }
    },
    async destroy(id: number) {
      try {
        const response = await deleteDanceCostume(id);
        return response;
      } catch (error: any) {
        console.error(error);
      }
    },
    clearDanceCostumes() {
      this.danceCostumes = [];
    },
  },
  getters: {
    totalDanceCostumes: (state) => state.danceCostumes.length,
  },
});
