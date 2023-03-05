import classNames from 'classnames/bind';
import styles from './UserAction.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HandleForm from '../HandleForm/HandleForm';

const cx = classNames.bind(styles);

const UserAction = ({ setUnFilter, unFilter }) => {
    const [showProduct, setShowProduct] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showPost, setShowPost] = useState(true);
    const dispatch = useDispatch();
    const checkedRef = useRef();
    console.log(unFilter);
    const newTypeCategories = {
        product: showProduct,
        post: showPost,
    };

    useEffect(() => {
        dispatch({ type: 'FILTER_TYPE_CATEGORIES', newTypeCategories });
        setUnFilter(false);
    }, [showPost, showProduct]);

    const handleShowAddForm = () => {
        setShowAddForm(!showAddForm);
    };

    useEffect(() => {
        console.log('ShowPost', showPost);
        console.log('showPost: ', showPost);
    });

    return (
        <div className={cx('user-action')}>
            <div className={cx('filter-box-wrapper')}>
                <div className={cx('link-filter-box')}>
                    <p className={cx('title')}>Dead link sản phẩm</p>
                    <input
                        type="checkbox"
                        defaultChecked={unFilter}
                        onChange={() => setShowProduct(!showProduct)}
                        ref={checkedRef}
                    />
                </div>
                <div className={cx('link-filter-box')}>
                    <p className={cx('title')}>Dead link bài viết & khác</p>
                    <input
                        type="checkbox"
                        defaultChecked={unFilter}
                        onChange={() => setShowPost(!showPost)}
                        ref={checkedRef}
                    />
                </div>
            </div>
            <div className={cx('handle-link-wrapper')}>
                <button className={cx('export-btn')}>
                    <FontAwesomeIcon icon={faUpload} />
                </button>
                <button className={cx('upload-template')}>
                    <FontAwesomeIcon icon={faDownload} />
                    <p className={cx('text')}>Template</p>
                </button>
                <button className={cx('add-btn')} onClick={handleShowAddForm}>
                    <FontAwesomeIcon icon={faPlus} />
                    <p className={cx('text')}>THÊM MỚI</p>
                </button>
            </div>
            {showAddForm && <HandleForm handleShowAddForm={handleShowAddForm} />}
        </div>
    );
};

export default UserAction;
