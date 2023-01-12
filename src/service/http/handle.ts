import type { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import {
	ERROR_MSG_DURATION,
	DEFAULT_REQUEST_ERROR_CODE,
	DEFAULT_REQUEST_ERROR_MSG,
	NETWORK_ERROR_CODE,
	NETWORK_ERROR_MSG,
	REQUEST_TIMEOUT_CODE,
	REQUEST_TIMEOUT_MSG,
	ERROR_STATUS,
	ERROR_NO_TIP_STATUS,
} from '@/config';
import { useAuthStore } from '@/store';
import { getRefreshToken } from '@/utils';
import { fetchUpdateToken } from '@/service';
import { setToken, setRefreshToken } from '@/utils';

type ErrorStatus = keyof typeof ERROR_STATUS;

/**
 * @description: 处理axios或http错误
 * @param {AxiosError} err
 * @return {*}
 */
export function handleAxiosError(err: AxiosError) {
	const error: Service.RequestError = {
		type: 'Axios',
		code: DEFAULT_REQUEST_ERROR_CODE,
		msg: DEFAULT_REQUEST_ERROR_MSG,
	};
	// 网络错误
	if (!window.navigator.onLine || err.message === 'Network Error') {
		Object.assign(error, { code: NETWORK_ERROR_CODE, msg: NETWORK_ERROR_MSG });
	}
	// 超时错误
	if (err.code === REQUEST_TIMEOUT_CODE && err.message.includes('timeout')) {
		Object.assign(error, {
			code: REQUEST_TIMEOUT_CODE,
			msg: REQUEST_TIMEOUT_MSG,
		});
	}
	// 请求错误
	if (err.response) {
		const errorCode: ErrorStatus = (err.response?.status as ErrorStatus) || 'DEFAULT';
		const msg = ERROR_STATUS[errorCode];
		Object.assign(error, { code: errorCode, msg });
	}

	showError(error);

	return error;
}

/**
 * @description: 处理axios请求成功，但返回后端服务器报错
 * @param {AxiosResponse} response
 * @return {*}
 */
export function handleResponseError(response: AxiosResponse) {
	const error: Service.RequestError = {
		type: 'Axios',
		code: DEFAULT_REQUEST_ERROR_CODE,
		msg: DEFAULT_REQUEST_ERROR_MSG,
	};

	if (!window.navigator.onLine) {
		// 网路错误
		Object.assign(error, { code: NETWORK_ERROR_CODE, msg: NETWORK_ERROR_MSG });
	} else {
		// 请求成功的状态码非200的错误
		const errorCode: ErrorStatus = response.status as ErrorStatus;
		const msg = ERROR_STATUS[errorCode] || DEFAULT_REQUEST_ERROR_MSG;
		Object.assign(error, { type: 'Response', code: errorCode, msg });
	}

	showError(error);

	return error;
}

/**
 * @description:
 * @param {Record} apiData 接口返回的后台数据
 * @param {Service} config axios字段配置
 * @return {*}
 */
export function handleBusinessError(data: Record<string, any>, config: Service.BackendResultConfig) {
	const { codeKey, msgKey } = config;
	const error: Service.RequestError = {
		type: 'Business',
		code: data[codeKey],
		msg: data[msgKey],
	};

	showError(error);

	return error;
}

/**
 * @description: 统一成功和失败返回类型
 * @param {any} data
 * @param {Service} error
 * @return {*} result
 */
export async function handleServiceResult<T = any>(data: any, error: Service.RequestError | null) {
	if (error) {
		const fail: Service.FailedResult = {
			error,
			data: null,
		};
		return fail;
	}
	const success: Service.SuccessResult<T> = {
		error: null,
		data,
	};
	return success;
}

/**
 * @description: 处理接口token刷新
 * @param {AxiosRequestConfig} config axios字段配置
 * @return {*}
 */
export async function handleRefreshToken(config: AxiosRequestConfig) {
	const { resetAuthStore } = useAuthStore();
	const refreshToken = getRefreshToken();
	const { data } = await fetchUpdateToken(refreshToken);
	if (data) {
		setRefreshToken(data.token);
		setToken(data.refreshToken);

		// 设置token
		if (config.headers) {
			typeof config.headers.set === 'function' && config.headers.set('Authorization', `Bearer ${data.token || ''}`);
		}

		return config;
	}
	resetAuthStore();
	return null;
}

export function showError(error: Service.RequestError) {
	// 如果error不需要提示,则跳过
	const code = Number(error.code);
	if (ERROR_NO_TIP_STATUS.includes(code)) return;

	window.console.warn(error.code, error.msg);
	window.$message?.error(error.msg, { duration: ERROR_MSG_DURATION });
}
