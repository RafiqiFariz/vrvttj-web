import { createQuizQuestion, deleteQuizQuestion, fetchQuizQuestionList, showQuizQuestion, updateQuizQuestion } from '@/service';
import { defineStore } from 'pinia';

export const useQuizQuestionStore = defineStore('quizQuestion', {
  state: () => ({
    quizQuestions: [] as Entity.QuizQuestion[],
    quizQuestion: {} as Entity.QuizQuestion,
    errors: {} as Record<string, string[]>,
  }),
  actions: {
    async all(params: {
      page?: number,
      paginate?: boolean,
      includeQuiz?: boolean,
      includeOptions?: boolean,
      pageSize?: number,
    } = {}
    ) {
      try {
        const response = await fetchQuizQuestionList(params);
        this.quizQuestions = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    async show(id: number) {
      try {
        const response = await showQuizQuestion(id);
        this.quizQuestion = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    async create(data: Entity.QuizQuestion) {
      try {
        const response = await createQuizQuestion(data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        this.errors = error.response.data.errors;
        console.error(error);
      }
    },
    async update(id: number, data: Partial<Entity.QuizQuestion>) {
      try {
        const response = await updateQuizQuestion(id, data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        console.error(error);
        this.errors = error.response.data.errors;
      }
    },
    async destroy(id: number) {
      try {
        const response = await deleteQuizQuestion(id);
        return response;
      } catch (error: any) {
        console.error(error);
      }
    },
    clear() {
      this.quizQuestions = [];
    },
  },
  getters: {
    total: (state) => state.quizQuestions.length,
    quizQuestionOptions: (state) => state.quizQuestions.map((quizQuestion) => ({
      value: quizQuestion.id,
      label: quizQuestion.question,
    })),
  },
});
