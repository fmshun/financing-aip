import { sendPost } from '../../../lib/fetch';

export const search = (param) => sendPost('/contact/get_contact_list', param);

export const addContact = (param) => sendPost('/contact/create_contact_info', param);

export const updateContact = (param) => sendPost('/contact/update_contact_info', param);

export const deleteContact = (param) => sendPost('/contact/delete_contact_info', param);
