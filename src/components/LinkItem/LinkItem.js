import classNames from 'classnames/bind';
import styles from './LinkItem.module.scss';
import Checkbox from '@mui/material/Checkbox';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HandleForm from '../HandleForm/HandleForm';

const cx = classNames.bind(styles);

const LinkItem = (props) => {
    const { id, isActive, onButtonClick, data, mappingList, setActiveKey } = props;
    const [showEditLink, setShowEditLink] = useState(true);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showPopMenu, setShowPopMenu] = useState(false);
    const dispatch = useDispatch();
    const iconRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
        if (!mappingList.includes(data.id)) {
            inputRef.current.checked = false;
        }
    }, [mappingList]);

    const handleDeleteLink = () => {
        dispatch({ type: 'DELETE_LINK', payload: { idLink: data.id } });
        setShowEditLink(false);
        setShowPopMenu(false);
    };

    const handleAddMappingLink = (e) => {
        dispatch({ type: 'UPDATE_MAPPING', payload: { inputValue: e.target.value * 1 } });
    };

    const handleShowEditForm = () => {
        setShowEditForm(true);
        setActiveKey(false);
    };

    const handleFormModal = () => {
        setShowEditForm(!showEditForm);
        setShowEditLink(!showEditLink);
    };

    const handleButtonClick = () => {
        onButtonClick(id);
    };

    return (
        <div key={id} className={cx('link-info-wrapper')}>
            <div className={cx('link-item')}>
                <div className={cx('description')}>
                    <input
                        className={cx('input-checked')}
                        ref={inputRef}
                        value={data.id}
                        type="checkbox"
                        onChange={handleAddMappingLink}
                    />
                    <p className={cx('text')}>{data?.description}</p>
                </div>
                <p className={cx('old_link')}>{data?.old_link}</p>
                <p className={cx('new_link')}>{data?.new_link}</p>
            </div>
            <div className={cx('link-handle-wrapper')}>
                <button className={cx('handle-link-btn')}>
                    <FontAwesomeIcon
                        ref={iconRef}
                        className={cx('btn-icon', { active: isActive })}
                        onClick={handleButtonClick}
                        icon={faEllipsis}
                    />
                    {isActive && (
                        <div className={cx('menu-wrapper')}>
                            <div className={cx('edit-wrapper')} onClick={handleShowEditForm}>
                                <FontAwesomeIcon icon={faPen} />
                                <p className={cx('text')}>Chỉnh sửa</p>
                            </div>
                            <div className={cx('delete-wrapper')} onClick={handleDeleteLink}>
                                <FontAwesomeIcon icon={faTrashCan} />
                                <p className={cx('text')}>Hủy mapping link</p>
                            </div>
                        </div>
                    )}
                </button>
            </div>
            {showEditForm && <HandleForm handleFormModal={handleFormModal} data={data} />}
        </div>
    );
};

export default LinkItem;
