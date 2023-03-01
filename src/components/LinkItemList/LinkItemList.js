import classNames from 'classnames/bind';
import styles from './LinkItemList.module.scss';
import LinkItem from '../LinkItem/LinkItem';
const cx = classNames.bind(styles);

const LinkItemList = ({ listlink }) => {
    console.log(listlink);

    return <div className={cx('link-info-list')}>{listlink && listlink?.map((item) => <LinkItem data={item} />)}</div>;
};

export default LinkItemList;
