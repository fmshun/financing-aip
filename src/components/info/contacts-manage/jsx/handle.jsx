import React from 'react';
import { Form, Input, Select, Button, Modal, InputNumber, message } from 'antd';
import useSetState from '../../../../lib/use-set-state';
import { addContact, updateContact } from '../server';
import List from './list';
import { filterObject } from '../../../../lib/util'

const emptyContact = {
    contactName: '',
    contactWechatCode: '',
    contactPhoneNumber: '',
};

const validEmpty = (param) => {
    const {
        contactName,
        contactWechatCode,
        contactPhoneNumber,
    } = param;
    return !(!contactName || !contactWechatCode || !contactPhoneNumber);
}

function Handle(props) {
    const { listData } = props;
    const [ addInfo, setAddInfo, initAddInfo ] = useSetState(Object.assign({}, emptyContact, {
        visible: false
    }));
    const editor = (info) => {
        initAddInfo(Object.assign({}, info, {
            visible: true,
        }));
    };
    return (
        <div>
            <div className="handle-box">
                <Button
                    type="primary"
                    onClick={() => {
                        initAddInfo({ visible: true });
                    }}
                >
                    创建
                </Button>
                <div className="row-info">
                    共有{listData.total}条数据
                </div>
            </div>
            <List listData={listData} editor={editor} />
            <Modal
                title={addInfo.contactId ? '编辑' : '创建'}
                visible={addInfo.visible}
                okText="确定"
                cancelText="取消"
                maskClosable={false}
                onOk={async () => {
                    if (validEmpty(addInfo)) {
                        let postData = addContact;
                        const arr = Object.keys(emptyContact);
                        if (addInfo.contactId) {
                            postData = updateContact;
                            arr.push('contactId');
                        }
                        const param = filterObject(addInfo, arr);
                        const r = await postData(param);
                        if (r && r.code === 0) {
                            initAddInfo();
                            message.success('操作成功');
                            document.querySelector('.search-button').click();
                        } else {
                            Modal.error({
                                title: r.msg,
                            });
                        }


                    } else {
                        Modal.error({
                            title: '存在未填数据'
                        });
                    }

                }}
                onCancel={() => initAddInfo({ visible: false })}
            >
                <Form
                    preserve={false}
                    labelAlign="right"
                    labelCol={{ span: 5 }}
                    style={{ maxHeight: 400, overflow: 'auto' }}
                >
                    <Form.Item
                        label="联系人姓名"
                    >
                        <Input
                            style={{ width: 320 }}
                            value={addInfo.contactName}
                            onChange={(e) => {
                                setAddInfo({ contactName: e.target.value });
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="联系人微信"
                    >
                        <Input
                            style={{ width: 320 }}
                            value={addInfo.contactWechatCode}
                            onChange={(e) => {
                                setAddInfo({ contactWechatCode: e.target.value });
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="联系人手机"
                    >
                        <Input
                            style={{ width: 320 }}
                            value={addInfo.contactPhoneNumber}
                            onChange={(e) => {
                                setAddInfo({ contactPhoneNumber: e.target.value });
                            }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Handle;