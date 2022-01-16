import React, { useState } from 'react';
import { Table, Modal, Form, Input, InputNumber, Button, DatePicker, Space } from 'antd';
// import reqwest from 'reqwest'; 可以改成请求的路径
import '../../../../assets/css/member.css';
import moment from 'moment';

// const { RangePicker } = DatePicker;

const getRandomuserParams = params => ({
    results: params.pagination.pageSize,
    page: params.pagination.current,
    ...params,
});

//时间选择器
function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}

function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
}

function disabledDateTime() {
    return {
        disabledHours: () => range(0, 24).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
    };
}


class List extends React.Component {
    state = {
        isModalVisible: false,
        memberData: [
            {
                memId: '1',
                name: '111',
                gender: '男',
                phone: '19155516298',
                idcard: '3405211xxx18991',
                creditscore: '30',
                updateTime: '2021-10-09'
            }
        ],
        pagination: {
            current: 1,
            pageSize: 10,
        },
        loading: false
    };
    //修改
    _handleUpdate(type) {
        if (type == 'add') {
            this.setState({ publictext: '人员新增' });
        } else {
            this.setState({ publictext: '人员修改' });
        }
        // debugger
        this.setState({ isModalVisible: true });
    }
    componentDidMount() {
        const { pagination } = this.state;
        this.fetch({ pagination });
    }

    handleTableChange = (pagination, filters, sorter) => {
        // debugger
        this.fetch({
            // sortField: sorter.field,
            // sortOrder: sorter.order,
            pagination,
            ...filters,
        });
    };

    fetch = (params = {}) => {
        this.setState({ loading: false });
        // reqwest({
        //   url: 'https://randomuser.me/api',
        //   method: 'get',
        //   type: 'json',
        //   data: getRandomuserParams(params),
        // }).then(data => {
        //   console.log(data);
        //   this.setState({
        //     loading: false,
        //     data: data.results,
        //     pagination: {
        //       ...params.pagination,
        //       total: 200,
        //       // 200 is mock data, you should read it from server
        //       // total: data.totalCount,
        //     },
        //   });
        // });
    };


    render() {
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                //   sorter: true,
                //   render: name => `${name.first} ${name.last}`,
                width: '20%',
            },
            {
                title: '性别',
                dataIndex: 'gender',
                //   filters: [
                //     { text: '男', value: 'male' },
                //     { text: '女', value: 'female' },
                //   ],
                width: '20%',
            },
            {
                title: '手机号',
                dataIndex: 'phone',
            },
            {
                title: '身份证',
                dataIndex: 'idcard',
            },
            {
                title: '信用分',
                dataIndex: 'creditscore',
            },
            {
                title: '修改时间',
                dataIndex: 'updateTime',
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render: () => <a onClick={() => this._handleUpdate('update')}>编辑</a>,
            },
        ];

        const { memberData, pagination, loading } = this.state;

        const layout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };

        const validateMessages = {
            required: '${label} is required!',
            types: {
                email: '${label} is not a valid email!',
                number: '${label} is not a valid number!',
            },
            number: {
                range: '${label} 必须在 ${min} 和 ${max}',
            },
            phone: {

            }
        };

        return (
            <div id="memberinfo">
                <div className='addtype'>
                    <Button type="primary" onClick={() => this._handleUpdate('add')}>创建</Button>
                </div>
                <Table
                    columns={columns}
                    rowKey="memId"
                    dataSource={memberData}
                    pagination={pagination}
                    loading={loading}
                    onChange={this.handleTableChange}
                />

                <Modal title={this.state.publictext} okText='保存' cancelText='取消'
                    visible={this.state.isModalVisible}
                    maskClosable={false}
                    onOk={this._handleOK} onCancel={this._handleCancel} >
                    <div>
                        <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>
                            <Form.Item name={['user', 'name']} label="姓名" >
                                <Input />
                            </Form.Item>
                            <Form.Item name={['user', 'phone']} label="手机号码" rules={[{ type: 'phone' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={['user', 'creditscore']} label="信用分" rules={[{ type: 'number', min: 0, max: 99 }]}>
                                <InputNumber />
                            </Form.Item>
                            <Form.Item name={['user', 'idcard']} label="身份证号">
                                <Input />
                            </Form.Item>
                            <Form.Item name={['user', 'updateTime']} label="修改时间">
                                <DatePicker
                                    format="YYYY-MM-DD HH:mm:ss"
                                    disabledDate={disabledDate}
                                    disabledTime={disabledDateTime}
                                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                />
                            </Form.Item>
                            {/* <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item> */}
                        </Form>
                    </div>
                </Modal>
            </div>
        );

    }

    //弹窗点确认
    _handleOK = () => {
        this.setState({ isModalVisible: false });
    }
    //弹窗点击取消
    _handleCancel = () => {
        //隐藏模态框
        this.setState({ isModalVisible: false });
    }

    onFinish() {

    }

}



export default List;