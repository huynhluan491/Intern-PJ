import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import useDebounce from '~/Hook/useDebounce';
import FilterTool from '../FilterTool/FilterTool';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

const Search = ({ resetFilter }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();
    const inputRef = useRef();

    const handleOnChangSearch = (e) => {
        const searchQuery = e.target.value;
        const KEY_SPACE = /\s/g;

        if (!KEY_SPACE.test(searchQuery[0])) {
            setSearchQuery(searchQuery);
        }
    };

    const handleSearchIcon = () => {
        dispatch({ type: 'REQUEST_SEARCH_QUERY', searchQuery });
    };

    return (
        <div className={cx('search-container')}>
            <div className={cx('tool-wrapper')}>
                <FilterTool resetFilter={resetFilter} />
                <div className={cx('find-link-title')}>
                    <p className={cx('title')}>Tìm kiếm đường link</p>
                    <div className={cx('search-input')}>
                        <button className={cx('search-icon')} onClick={handleSearchIcon}>
                            <FontAwesomeIcon className={cx('icon')} icon={faSearch} />
                        </button>
                        <input
                            ref={inputRef}
                            value={searchQuery}
                            type="text"
                            placeholder="Tìm kiếm mô tả, đường link site cũ, đường link site mới"
                            onChange={handleOnChangSearch}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
