import React from 'react'
import Navs from '../navs/Navs';
import StudentMain from '../studentMain/StudentMain';
import ClassInps from '../classInps/ClassInps';
import classNames from 'classnames';
import style from '../classList/ClassList.module.scss'


const StudentList:React.FC = () => {
    return (
        <div>
            <main style={{background:"#f0f2f5",padding:"30px 30px 50px"}} className={classNames(style.classMain)}>
                <StudentMain />
            </main>
        </div>
    )
}

export default StudentList;