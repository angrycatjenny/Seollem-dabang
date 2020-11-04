import React from 'react';
import './PageNotFound.css';

const PageNotFound = () => {
    return (
        <div className="PageNot-template">
            <h1>페이지를</h1>
            <h1>찾을 수 없습니다.</h1>
            <div className="PageNot-h2">
                <h2><div>여기를</div>누르십시오</h2>
            </div>
        </div>
    );
};

export default PageNotFound;