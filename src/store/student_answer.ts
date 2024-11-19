import { createStudentAnswer, deleteStudentAnswer, fetchStudentAnswerList, showStudentAnswer, updateStudentAnswer } from '@/service';
import { defineStore } from 'pinia';

export const useStudentAnswerStore = defineStore('studentAnswer', {
  state: () => ({
    studentAnswers: [] as Entity.StudentAnswer[],
    StudentAnswer: {} as Entity.StudentAnswer,
    errors: {} as Record<string, string[]>,
  }),
  actions: {
    async all(params: {
      page?: number,
      paginate?: boolean,
      includeQuizAttempt?: boolean,
      includeQuizQuestion?: boolean,
      includeQuizOption?: boolean,
      pageSize?: number,
    } = {}
    ) {
      try {
        const response = await fetchStudentAnswerList(params);
        this.studentAnswers = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    async show(id: number) {
      try {
        const response = await showStudentAnswer(id);
        this.StudentAnswer = response.data;
      } catch (error: any) {
        console.error(error);
      }
    },
    async create(data: Entity.StudentAnswer) {
      try {
        const response = await createStudentAnswer(data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        this.errors = error.response.data.errors;
        console.error(error);
      }
    },
    async update(id: number, data: Partial<Entity.StudentAnswer>) {
      try {
        const response = await updateStudentAnswer(id, data);
        window.$message.success(response.data.message);
        return response;
      } catch (error: any) {
        console.error(error);
        this.errors = error.response.data.errors;
      }
    },
    async destroy(id: number) {
      try {
        const response = await deleteStudentAnswer(id);
        return response;
      } catch (error: any) {
        console.error(error);
      }
    },
    clear() {
      this.studentAnswers = [];
    },
  },
  getters: {
    total: (state) => state.studentAnswers.length,
  },
});
