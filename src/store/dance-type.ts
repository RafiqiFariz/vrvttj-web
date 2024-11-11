import { createDanceType, deleteDanceType, fetchDanceTypeList, showDanceType, updateDanceType } from '@/service';
import { defineStore } from 'pinia';

export const useDanceTypeStore = defineStore('danceType', {
  state: () => ({
    danceTypes: [] as Entity.DanceType[],
    danceType: {} as Entity.DanceType,
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
        const response = await fetchDanceTypeList(params);
        this.danceTypes = response.data;
      } catch (error: any) {
        console.error(error);
        this.errors = error.response.data.errors;
      }
    },
    async show(id: number) {
      try {
        const response = await showDanceType(id);
        this.danceType = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    async create(data: Entity.DanceType) {
      try {
        const response = await createDanceType(data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        console.error(error);
        this.errors = error.response.data.errors;
      }
    },
    async update(id: number, data: Partial<Entity.DanceType>) {
      try {
        const response = await updateDanceType(id, data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        console.error(error);
        this.errors = error.response.data.errors;
      }
    },
    async destroy(id: number) {
      try {
        const response = await deleteDanceType(id);
        return response;
      } catch (error: any) {
        console.error(error);
      }
    },
    clearDanceTypes() {
      this.danceTypes = [];
    },
  },
  getters: {
    totalDanceTypes: (state) => state.danceTypes.length,
    danceTypeOptions: (state) => state.danceTypes.map((danceType) => ({
      value: danceType.id,
      label: danceType.name,
    })),
  },
});
