import { createUser, deleteUser, fetchUserList, showUser, updateUser } from '@/service';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as Entity.User[],
    user: {} as Entity.User,
    errors: {} as Record<string, string[]>,
  }),
  actions: {
    async all(params: {
      page?: number,
      includeRole?: boolean,
      paginate?: boolean,
      pageSize?: number,
    } = {}
    ) {
      try {
        const response = await fetchUserList(params);
        this.users = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    async show(id: number) {
      try {
        const response = await showUser(id);
        this.user = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    async create(data: Entity.User) {
      try {
        const response = await createUser(data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        this.errors = error.response.data.errors;
        console.error(error);
      }
    },
    async update(id: number, data: Partial<Entity.User>) {
      try {
        const response = await updateUser(id, data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        console.error(error);
        this.errors = error.response.data.errors;
      }
    },
    async destroy(id: number) {
      try {
        const response = await deleteUser(id);
        return response;
      } catch (error: any) {
        console.error(error);
      }
    },
    clear() {
      this.users = [];
    },
  },
  getters: {
    total: (state) => state.users.length,
    UserzesOptions: (state) => state.users.map((user) => ({
      value: user.id,
      label: user.name,
    })),
  },
});
