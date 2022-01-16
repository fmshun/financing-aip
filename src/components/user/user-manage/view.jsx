import React, { useState } from 'react';
import Header from './jsx/header';
import List from './jsx/list';
import './style.css';


function View() {
    return (
        <div>
            <Header />
            <List />
        </div>
    )
}

export default View;