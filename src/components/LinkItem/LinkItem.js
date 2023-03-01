import classNames from 'classnames/bind';
import styles from './LinkItem.module.scss';
import Checkbox from '@mui/material/Checkbox';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const LinkItem = ({ data }) => {
    return (
        <div key={data.id} className={cx('link-info-wrapper')}>
            <div className={cx('link-item')}>
                <div className={cx('description')}>
                    <Checkbox defaultChecked />
                    <p className={cx('text')}>{data?.description}</p>
                </div>
                <p className={cx('old_link')}>{data?.old_link}</p>
                <p className={cx('new_link')}>{data?.new_link}</p>
            </div>
            <div className={cx('link-handle-wrapper')}>
                <button className={cx('handle-link-btn')}>
                    <FontAwesomeIcon className={cx('btn-icon', { isActive: 'active' })} icon={faEllipsis} />
                </button>
            </div>
        </div>
    );
};

export default LinkItem;
