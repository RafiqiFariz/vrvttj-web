import { createQuizOption, deleteQuizOption, fetchQuizOptionList, showQuizOption, updateQuizOption } from '@/service';
import { defineStore } from 'pinia';

export const useQuizOptionStore = defineStore('quizOption', {
  state: () => ({
    quizOptions: [] as Entity.QuizOption[],
    quizOption: {} as Entity.QuizOption,
    errors: {} as Record<string, string[]>,
  }),
  actions: {
    async all(params: {
      page?: number,
      paginate?: boolean,
      includeQuizQuestion?: boolean,
      pageSize?: number,
    } = {}
    ) {
      try {
        const response = await fetchQuizOptionList(params);
        this.quizOptions = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    async show(id: number) {
      try {
        const response = await showQuizOption(id);
        this.quizOption = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    async create(data: Entity.QuizOption) {
      try {
        const response = await createQuizOption(data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        this.errors = error.response.data.errors;
        console.error(error);
      }
    },
    async update(id: number, data: Partial<Entity.QuizOption>) {
      try {
        const response = await updateQuizOption(id, data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        console.error(error);
        this.errors = error.response.data.errors;
      }
    },
    async destroy(id: number) {
      try {
        const response = await deleteQuizOption(id);
        return response;
      } catch (error: any) {
        console.error(error);
      }
    },
    clear() {
      this.quizOptions = [];
    },
  },
  getters: {
    total: (state) => state.quizOptions.length,
  },
});
