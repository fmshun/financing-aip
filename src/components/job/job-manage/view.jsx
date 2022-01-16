import React, { useCallback, useState } from 'react';
import Header from './jsx/header';
import Handle from './jsx/handle';
import useSetState from '../../../lib/use-set-state';
import './style.css';

function View() {
    const [ listData, setListData ] = useSetState({
        jobList: [],
        total: 0,
    });

    return (
        <div>
            <Header setListData={setListData} />
            <Handle listData={listData} />
        </div>
    )
}

export default View;