import classNames from 'classnames/bind';
import styles from './DashBoard.module.scss';
import Header from '~/components/Header/Header';
import UserAction from '~/components/UserAction/UserAction';
import FilterData from '~/components/FilterData/FilterData';
import SideBar from '~/components/SiderBar/SiderBar';
import HandleForm from '~/components/HandleForm/HandleForm';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function DashBoard() {
    const [showForm, setShowForm] = useState(false);

    const { typeCategories } = useSelector((state) => state.FilterReducer);

    useEffect(() => {
        console.log(typeCategories);
    });

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('body-layout')}>
                <div className={cx('left-side')}>
                    <SideBar />
                </div>
                <div className={cx('right-side')}>
                    <Header />
                    <UserAction handleShowForm={handleShowForm} />
                    <FilterData />
                </div>
            </div>
            {showForm && <HandleForm handleShowForm={handleShowForm} />}
        </div>
    );
}

export default DashBoard;
