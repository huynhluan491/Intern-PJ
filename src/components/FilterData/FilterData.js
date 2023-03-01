import classNames from 'classnames/bind';
import styles from './FilterData.module.scss';
import Search from './Search/Search';
import FilterTool from './FilterTool/FilterTool';

const cx = classNames.bind(styles);

const FilterData = () => {
    return (
        <div className={cx('filter-wrapper')}>
            <Search />
        </div>
    );
};

export default FilterData;
