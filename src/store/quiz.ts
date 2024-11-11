import { createQuiz, deleteQuiz, fetchQuizList, showQuiz, updateQuiz } from '@/service';
import { defineStore } from 'pinia';

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    quizzes: [] as Entity.Quiz[],
    quiz: {} as Entity.Quiz,
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
        const response = await fetchQuizList(params);
        this.quizzes = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    async show(id: number) {
      try {
        const response = await showQuiz(id);
        this.quiz = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    async create(data: Entity.Quiz) {
      try {
        const response = await createQuiz(data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        this.errors = error.response.data.errors;
        console.error(error);
      }
    },
    async update(id: number, data: Partial<Entity.Quiz>) {
      try {
        const response = await updateQuiz(id, data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        console.error(error);
        this.errors = error.response.data.errors;
      }
    },
    async destroy(id: number) {
      try {
        const response = await deleteQuiz(id);
        return response;
      } catch (error: any) {
        console.error(error);
      }
    },
    clear() {
      this.quizzes = [];
    },
  },
  getters: {
    total: (state) => state.quizzes.length,
    quizOptions: (state) => state.quizzes.map((quiz) => ({
      value: quiz.id,
      label: quiz.title,
    })),
  },
});
