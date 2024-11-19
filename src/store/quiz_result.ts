import { createQuizResult, deleteQuizResult, fetchQuizResultList, showQuizResult, updateQuizResult } from '@/service';
import { defineStore } from 'pinia';

export const useQuizResultStore = defineStore('quizResult', {
  state: () => ({
    quizResults: [] as Entity.QuizResult[],
    quizResult: {} as Entity.QuizResult,
    errors: {} as Record<string, string[]>,
  }),
  actions: {
    async all(params: {
      page?: number,
      paginate?: boolean,
      includeQuiz?: boolean,
      includeStudent?: boolean,
      pageSize?: number,
    } = {}
    ) {
      try {
        const response = await fetchQuizResultList(params);
        this.quizResults = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    async show(id: number) {
      try {
        const response = await showQuizResult(id);
        this.quizResult = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    async create(data: Entity.QuizResult) {
      try {
        const response = await createQuizResult(data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        this.errors = error.response.data.errors;
        console.error(error);
      }
    },
    async update(id: number, data: Partial<Entity.QuizResult>) {
      try {
        const response = await updateQuizResult(id, data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        console.error(error);
        this.errors = error.response.data.errors;
      }
    },
    async destroy(id: number) {
      try {
        const response = await deleteQuizResult(id);
        return response;
      } catch (error: any) {
        console.error(error);
      }
    },
    clear() {
      this.quizResults = [];
    },
  },
  getters: {
    total: (state) => state.quizResults.length,
  },
});
