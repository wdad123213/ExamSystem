import React from 'react'
import Navs from '../navs/Navs';
// import ClassInps from '../classInps/ClassInps';
import ClassMain from '../classMain/ClassMain';
import classNames from 'classnames';
import style from './ClassList.module.scss'


const ClassList:React.FC = () => {
    return (
        <div>
            <main style={{background:"#f0f2f5",padding:"30px 30px 50px"}} className={classNames(style.classMain)}>
                <ClassMain />
            </main>
        </div>
    )
}

export default ClassList;