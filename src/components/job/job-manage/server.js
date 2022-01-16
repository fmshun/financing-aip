import { sendPost } from '../../../lib/fetch';

/**
 * 查询job数据
 * @param param
 * @returns {Promise<any>}
 */
export const search = (param) => sendPost('/job/get_job_list', param);

/**
 * 新增job信息
 * @param param
 * @returns {Promise<any>}
 */
export const addJobInfo = (param) => sendPost('/job/create_part_time_job_info', param);

/**
 * 修改job信息
 * @param param
 * @returns {Promise<any>}
 */
export const updateJobInfo = (param) => sendPost('/job/update_job_info', param);

/**
 * 获取联系人下拉
 * @returns {Promise<any>}
 */
export const getContactSelect = () => sendPost('/contact/get_contact_select_list');

/**
 * 获取当前工作的报名信息
 * @param param
 * @returns {Promise<*>}
 */
export const getJobApplyList = (param) => sendPost('/job/get_job_apply_list',param);

/**
 * 强制取消报名
 * @param param
 * @returns {Promise<any>}
 */
export const cancelApply = (param) => sendPost('/job/force_cancel_job', param);

/**
 * 开始任务
 * @param param
 * @returns {Promise<*>}
 */
export const startJob = (param) => sendPost('/job/start_job', param);

/**
 * 完成任务
 * @param param
 * @returns {Promise<*>}
 */
export const finishJob = (param) => sendPost('/job/finish_job', param);

/**
 * 删除兼职信息
 * @param param
 * @returns {Promise<*>}
 */
export const deleteJob = (param) => sendPost('/job/delete_job_info', param);
