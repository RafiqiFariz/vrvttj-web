import { createQuizAttempt, deleteQuizAttempt, fetchQuizAttemptList, showQuizAttempt, updateQuizAttempt } from '@/service';
import { defineStore } from 'pinia';

export const useQuizAttemptStore = defineStore('quizAttempt', {
  state: () => ({
    quizAttempts: [] as Entity.QuizAttempt[],
    quizAttempt: {} as Entity.QuizAttempt,
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
        const response = await fetchQuizAttemptList(params);
        this.quizAttempts = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    async show(id: number) {
      try {
        const response = await showQuizAttempt(id);
        this.quizAttempt = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    async create(data: Entity.QuizAttempt) {
      try {
        const response = await createQuizAttempt(data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        this.errors = error.response.data.errors;
        console.error(error);
      }
    },
    async update(id: number, data: Partial<Entity.QuizAttempt>) {
      try {
        const response = await updateQuizAttempt(id, data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        console.error(error);
        this.errors = error.response.data.errors;
      }
    },
    async destroy(id: number) {
      try {
        const response = await deleteQuizAttempt(id);
        return response;
      } catch (error: any) {
        console.error(error);
      }
    },
    clear() {
      this.quizAttempts = [];
    },
  },
  getters: {
    total: (state) => state.quizAttempts.length,
    quizAttemptOptions: (state) => state.quizAttempts.map((quizAttempt) => ({
      value: quizAttempt.id,
      label: `Quiz Attempt ${quizAttempt.id}`,
    })),
  },
});
