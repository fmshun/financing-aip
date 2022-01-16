import { Form, Input, Select, Button, Modal, DatePicker } from 'antd';
import moment from 'moment';
import { search } from '../server';
import useSetState from '../../../../lib/use-set-state';
import React from "react";


const { Option } = Select;
const { RangePicker } = DatePicker;

const getTime = (val) => {
    if (val) {
        return moment(val);
    }
    return null;
}

function Header(props) {
    const { setListData } = props;
    const [ form, setForm ] = useSetState({
        contactName: '',
        contactWechatCode: '',
        contactPhoneNumber: '',
        contactStatus: null,
    });
    return (
        <div className="header-box">
            <Form
                labelAlign="left"
                layout="inline"
            >
                <Form.Item
                    label="姓名"
                >
                    <Input
                        allowClear
                        style={{ width: 150 }}
                        placeholder="请输入姓名"
                        value={form.contactName}
                        onChange={(e) => setForm({ contactName: e.target.value})}
                    />
                </Form.Item>
                <Form.Item
                    label="微信号"
                >
                    <Input
                        allowClear
                        style={{ width: 150 }}
                        placeholder="请输入姓名"
                        value={form.contactWechatCode}
                        onChange={(e) => setForm({ contactWechatCode: e.target.value})}
                    />
                </Form.Item>
                <Form.Item
                    label="手机号"
                >
                    <Input
                        allowClear
                        style={{ width: 150 }}
                        placeholder="请输入姓名"
                        value={form.contactPhoneNumber}
                        onChange={(e) => setForm({ contactPhoneNumber: e.target.value})}
                    />
                </Form.Item>
                <Form.Item
                    label="状态"
                >
                    <Input
                        allowClear
                        style={{ width: 150 }}
                        placeholder="请输入姓名"
                        value={form.contactStatus}
                        onChange={(e) => setForm({ contactStatus: e.target.value})}
                    />
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="search-button"
                    onClick={async () => {
                        // todo: 暂时不入参
                        const r = await search();
                        if (r && r.code === 0) {
                            setListData(r.info);
                        } else {
                            Modal.error({
                                title: r.msg,
                            });
                        }
                    }}
                >
                    搜索
                </Button>
            </Form>
        </div>
    )
}

export default Header;
