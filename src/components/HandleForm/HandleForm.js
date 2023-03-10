import classNames from 'classnames/bind';
import styles from './HandleForm.module.scss';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const HandleForm = ({ handleFormModal, data, handleShowAddForm }) => {
    const [descriptionValue, setDescriptionValue] = useState(data ? data.description : '');
    const [oldLinkValue, setOldLinkValue] = useState(data ? data.old_link : '');
    const [newLinkValue, setNewLinkValue] = useState(data ? data.new_link : '');
    const [typeLinkInput, setTypeLinkInput] = useState(data ? data.type : '');
    const radioCheck = useRef();
    const { LinkData } = useSelector((state) => state.LinkReducer);
    const dispatch = useDispatch();
    console.log(data);
    const handleSubmit = () => {
        if (!data) {
            if (descriptionValue !== '' && oldLinkValue !== '' && newLinkValue !== '' && typeLinkInput !== '') {
                dispatch({
                    type: 'ADD_LINK',
                    payload: {
                        description: descriptionValue,
                        old_link: oldLinkValue,
                        new_link: newLinkValue,
                        type: typeLinkInput,
                    },
                });
                setDescriptionValue('');
                setOldLinkValue('');
                setNewLinkValue('');
                setTypeLinkInput('');
                window.alert('Them thanh cong');
            } else {
                window.alert('Vui long nhap du thong tin');
            }
        } else {
            dispatch({
                type: 'EDIT_LINK',
                payload: {
                    idLink: data.id,
                    updateDescription: descriptionValue,
                    updateOldLink: oldLinkValue,
                    updateNewLink: newLinkValue,
                    updateType: typeLinkInput,
                },
            });

            window.alert('Sua thanh cong');
        }
    };

    const handleCloseForm = () => {
        if (data) {
            handleFormModal();
        } else {
            handleShowAddForm();
        }
    };

    return (
        <div className={cx('form-wrapper')}>
            <div className={cx('form-header')}>
                <p className={cx('text')}>DEAD LINK</p>
            </div>
            <div className={cx('form-cate')}>
                <p className={cx('cate-title')}>Ph??n Lo???i</p>
                <div className={cx('radio-wrapper')}>
                    <input
                        id="product"
                        name="link_category"
                        type="radio"
                        value="product"
                        ref={radioCheck}
                        onClick={() => setTypeLinkInput('product')}
                    />
                    <label htmlFor="product" className={cx('title')}>
                        Dead link s???n ph???m
                    </label>
                    <input
                        id="post"
                        name="link_category"
                        type="radio"
                        value="post"
                        ref={radioCheck}
                        onClick={() => setTypeLinkInput('post')}
                    />
                    <label htmlFor="post" className={cx('title')}>
                        Dead link b??i vi???t & kh??c
                    </label>
                </div>
                <div className={cx('form-inputs')}>
                    <div className={cx('description-input')}>
                        <p className={cx('title')}>M?? t??? link</p>
                        <input
                            type="text"
                            name="description_input"
                            placeholder="Nhap thong tin"
                            value={descriptionValue}
                            onChange={(e) => setDescriptionValue(e.target.value)}
                        />
                    </div>
                    <div className={cx('old_link-input')}>
                        <p className={cx('title')}>Link site c??</p>
                        <input
                            type="text"
                            name="old_link"
                            placeholder="Nhap thong tin"
                            value={oldLinkValue}
                            onChange={(e) => setOldLinkValue(e.target.value)}
                        />
                    </div>
                    <div className={cx('new_link-input')}>
                        <p className={cx('title')}>Link site m???i</p>
                        <input
                            type="text"
                            name="new_link"
                            placeholder="Nhap thong tin"
                            value={newLinkValue}
                            onChange={(e) => setNewLinkValue(e.target.value)}
                        />
                    </div>
                    <div className={cx('form-submit')}>
                        <button className={cx('close-btn')} onClick={handleCloseForm}>
                            ????ng
                        </button>
                        <button className={cx('update-btn')} onClick={handleSubmit}>
                            C???p nh???t
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HandleForm;
