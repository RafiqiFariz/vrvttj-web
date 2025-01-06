import { createDancePartVideo, deleteDancePartVideo, fetchDancePartVideoList, updateDancePartVideo } from '@/service';
import { defineStore } from 'pinia';

export const useDancePartVideoStore = defineStore('dancePartVideo', {
  state: () => ({
    dancePartVideos: [] as Entity.DancePartVideo[],
    dancePartVideo: {} as Entity.DancePartVideo,
    errors: {} as Record<string, string[]>,
  }),
  actions: {
    async all(params: {
      dancePartId?: number,
      page?: number,
      paginate?: boolean,
      pageSize?: number,
    } = {}
    ) {
      try {
        const response = await fetchDancePartVideoList(params);
        this.dancePartVideos = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    async create(dancePartId: number, data: Entity.DancePartVideo) {
      try {
        const response = await createDancePartVideo(dancePartId, data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        this.errors = error.response.data.errors;
        console.error(error);
      }
    },
    async update(dancePartId: number, id: number, data: Partial<Entity.DancePart>) {
      try {
        const response = await updateDancePartVideo(dancePartId, id, data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        console.error(error);
        this.errors = error.response.data.errors;
      }
    },
    async destroy(dancePartId: number, id: number) {
      try {
        const response = await deleteDancePartVideo(dancePartId, id);
        return response;
      } catch (error: any) {
        console.error(error);
      }
    },
    clearDanceParts() {
      this.dancePartVideos = [];
    },
  },
  getters: {
    totalDanceParts: (state) => state.dancePartVideos.length,
    dancePartOptions: (state) => state.dancePartVideos.map((dancePartVideo: any) => ({
      value: dancePartVideo.id,
      label: dancePartVideo.name,
    })),
  },
});
