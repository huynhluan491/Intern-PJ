import classNames from 'classnames/bind';
import styles from './HandleForm.module.scss';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const HandleForm = ({ handleShowForm }) => {
    const [descriptionValue, setDescriptionValue] = useState('');
    const [oldLinkValue, setOldLinkValue] = useState('');
    const [newLinkValue, setNewLinkValue] = useState('');
    const [typeLinkInput, setTypeLinkInput] = useState('');

    const { LinkData } = useSelector((state) => state.LinkReducer);

    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch({
            type: 'ADD_LINK',
            payload: {
                description: descriptionValue,
                old_link: oldLinkValue,
                new_link: newLinkValue,
                type: typeLinkInput,
            },
        });
    };

    return (
        <div className={cx('form-wrapper')}>
            <div className={cx('form-header')}>
                <p className={cx('text')}>DEAD LINK</p>
            </div>
            <form className={cx('form-cate')}>
                <p className={cx('cate-title')}>Phân Loại</p>
                <div className={cx('radio-wrapper')}>
                    <input
                        id="product"
                        name="link_category"
                        type="radio"
                        value="product"
                        onClick={() => setTypeLinkInput('product')}
                    />
                    <label htmlFor="product" className={cx('title')}>
                        Dead link sản phẩm
                    </label>
                    <input
                        id="post"
                        name="link_category"
                        type="radio"
                        value="post"
                        onClick={() => setTypeLinkInput('post')}
                    />
                    <label htmlFor="post" className={cx('title')}>
                        Dead link bài viết & khác
                    </label>
                </div>
                <div className={cx('form-inputs')}>
                    <div className={cx('description-input')}>
                        <p className={cx('title')}>Mô tả link</p>
                        <input
                            type="text"
                            name="description_input"
                            placeholder="Nhap thong tin"
                            value={descriptionValue}
                            onChange={(e) => setDescriptionValue(e.target.value)}
                        />
                    </div>
                    <div className={cx('old_link-input')}>
                        <p className={cx('title')}>Link site cũ</p>
                        <input
                            type="text"
                            name="old_link"
                            placeholder="Nhap thong tin"
                            value={oldLinkValue}
                            onChange={(e) => setOldLinkValue(e.target.value)}
                        />
                    </div>
                    <div className={cx('new_link-input')}>
                        <p className={cx('title')}>Link site mới</p>
                        <input
                            type="text"
                            name="new_link"
                            placeholder="Nhap thong tin"
                            value={newLinkValue}
                            onChange={(e) => setNewLinkValue(e.target.value)}
                        />
                    </div>
                    <div className={cx('form-submit')}>
                        <button className={cx('close-btn')} onClick={handleShowForm}>
                            Đóng
                        </button>
                        <button className={cx('update-btn')} onClick={handleSubmit}>
                            Cập nhật
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default HandleForm;
