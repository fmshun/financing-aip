import React, { useCallback, useState } from 'react';
import { Form, Input, Select, Button, Modal, DatePicker } from 'antd';
import moment from 'moment';
import { search } from '../server';


function useSetState(initial = {}) {
    const [state, saveState] = useState(initial);
    const setState = useCallback((newState) => {
        saveState(pre => ({ ...pre, ...newState }))
    }, []);
    return [state, setState];
}

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
    const [form, setForm] = useSetState({
        memberName: "",
        memberPhone:"",
        memIdcard:""
    })
   
    return (
        <div>
             {/* <Form
                labelAlign="left"
                layout="inline"
            >
                <Form.Item
                    label="人员姓名"
                >
                    <Input
                        allowClear
                        style={{ width: 150 }}
                        placeholder="请输入人员姓名"
                        value={form.memberName}
                        onChange={(e) => setForm({ contactName: e.target.value})}
                    />
                </Form.Item>
                <Form.Item
                    label="人员手机号"
                >
                    <Input
                        allowClear
                        style={{ width: 150 }}
                        placeholder="请输入手机号"
                        value={form.memberPhone}
                        onChange={(e) => setForm({ contactPhoneNumber: e.target.value})}
                    />
                </Form.Item>
                <Form.Item
                    label="人员身份证"
                >
                    <Input
                        allowClear
                        style={{ width: 150 }}
                        placeholder="请输入身份证"
                        value={form.memIdcard}
                        onChange={(e) => setForm({ contactStatus: e.target.value})}
                    />
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="search-button"
                    onClick={async () => {
                        // todo: 暂时不入参 这里可以写请求
                        // const r = await search();
                        // if (r && r.code === 0) {
                        //     setListData(r.info);
                        // } else {
                        //     Modal.error({
                        //         title: r.msg,
                        //     });
                        // }
                    }}
                >
                    搜索
                </Button>
            </Form> */}
        </div>
    )
}

export default Header;
