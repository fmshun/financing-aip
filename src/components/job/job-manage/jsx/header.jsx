import React from 'react';
import { Form, Input, Select, Button, Modal, DatePicker } from 'antd';
import moment from 'moment';
import { search } from '../server';
import useSetState from '../../../../lib/use-set-state';

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
        title: '', createTime: [], page: 1, pageSize: 1000,
    });
    return (
        <div className="header-box">
            <Form
              labelAlign="left"
              layout="inline"
            >
                <Form.Item
                    label="标题"
                >
                    <Input
                        allowClear
                        style={{ width: 150 }}
                        placeholder="请输入标题"
                        value={form.title}
                        onChange={(e) => {
                            setForm({ name: e.target.value });
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label="创建时间"
                >
                    <RangePicker
                        value={[getTime(form.createTime[0]), getTime(form.createTime[1])]}
                        onChange={([startTime, endTime]) => {
                        setForm({
                            createTime: [
                                startTime.format('YYYY-MM-DD'),
                                endTime.format('YYYY-MM-DD'),
                            ]
                        })
                      }}
                      format="YYYY-MM-DD"
                    />
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="search-button"
                    onClick={async () => {
                        const r = await search(form);
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
