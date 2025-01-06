import { createDanceMove, deleteDanceMove, fetchDanceMoveList, showDanceMove, updateDanceMove } from '@/service';
import { defineStore } from 'pinia';

export const useDanceMoveStore = defineStore('danceMove', {
  state: () => ({
    danceMoves: [] as Entity.DanceMove[],
    danceMove: {} as Entity.DanceMove,
    errors: {} as Record<string, string[]>,
  }),
  actions: {
    async all(params: {
      page?: number,
      paginate?: boolean,
      includeDance?: boolean,
      includeDancePart?: boolean,
      pageSize?: number,
    } = {}
    ) {
      try {
        const response = await fetchDanceMoveList(params);
        this.danceMoves = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    async show(id: number) {
      try {
        const response = await showDanceMove(id);
        this.danceMove = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    async create(data: Entity.DanceMove) {
      try {
        const response = await createDanceMove(data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        console.error(error);
        this.errors = error.response.data.errors;
      }
    },
    async update(id: number, data: Partial<Entity.DanceMove>) {
      try {
        const response = await updateDanceMove(id, data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        console.error(error);
        this.errors = error.response.data.errors;
      }
    },
    async destroy(id: number) {
      try {
        const response = await deleteDanceMove(id);
        return response;
      } catch (error: any) {
        console.error(error);
      }
    },
    clearDanceMoves() {
      this.danceMoves = [];
    },
  },
  getters: {
    totalDanceMoves: (state) => state.danceMoves.length,
  },
});
