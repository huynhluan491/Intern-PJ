import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import { headerTitles } from '~/DashBoard/Stuff';

const cx = classNames.bind(styles);

const Header = () => {
    return (
        <div className={cx('header-wrapper')}>
            <div className={cx('header-menu')}>
                <ul className={cx('title-list')}>
                    {headerTitles.map((item, index) => (
                        <li className={cx('title', { active: item.active })} key={index}>
                            {item.title}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={cx('user-feature')}>
                <div className={cx('icon-search')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faSearch} />
                </div>
                <div className={cx('icon-bell')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faBell} />
                </div>
                <div className={cx('user-avt')}>
                    <img src={require('~/img/dog.jpg')} alt="dog" />
                </div>
            </div>
        </div>
    );
};

export default Header;
