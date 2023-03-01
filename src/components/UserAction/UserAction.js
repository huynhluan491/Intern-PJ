import classNames from 'classnames/bind';
import styles from './UserAction.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const UserAction = ({ handleShowForm }) => {
    const [showProduct, setShowProduct] = useState(true);
    const [showPost, setShowPost] = useState(true);

    const dispatch = useDispatch();
    const { typeCategories } = useSelector((state) => state.FilterReducer);

    const newTypeCategories = {
        product: showProduct,
        post: showPost,
    };

    useEffect(() => {}, [showPost, showProduct]);

    useEffect(() => {
        dispatch({ type: 'FILTER_TYPE_CATEGORIES', newTypeCategories });
    }, [showPost, showProduct]);

    return (
        <div className={cx('user-action')}>
            <div className={cx('filter-box-wrapper')}>
                <div className={cx('link-filter-box')}>
                    <p className={cx('title')}>Dead link sản phẩm</p>
                    <Checkbox
                        defaultChecked
                        sx={{
                            '&.Mui-checked': {
                                color: '#008000',
                            },
                        }}
                        onClick={() => setShowProduct(!showProduct)}
                    />
                </div>
                <div className={cx('link-filter-box')}>
                    <p className={cx('title')}>Dead link bài viết & khác</p>
                    <Checkbox
                        defaultChecked
                        sx={{
                            '&.Mui-checked': {
                                color: '#008000',
                            },
                        }}
                        onClick={() => setShowPost(!showPost)}
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
                <button className={cx('add-btn')} onClick={handleShowForm}>
                    <FontAwesomeIcon icon={faPlus} />
                    <p className={cx('text')}>THÊM MỚI</p>
                </button>
            </div>
        </div>
    );
};

export default UserAction;
