import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import useDebounce from '~/Hook/useDebounce';
import FilterTool from '../FilterTool/FilterTool';
import LinkPaginate from '~/components/LinkPaginate/LinkPaginate';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterData, setFilteredData] = useState([]);
    const debouncedValue = useDebounce(searchQuery, 1000);
    const inputRef = useRef();

    const { LinkData } = useSelector((state) => ({
        LinkData: state.LinkReducer.LinkData,
    }));

    const handleFilterData = () => {
        const result = LinkData.filter((item) =>
            item.description.toLocaleLowerCase().includes(debouncedValue.toLocaleLowerCase()),
        );
        setFilteredData(result);
    };

    const handleOnChangSearch = (e) => {
        const searchQuery = e.target.value;
        console.log(searchQuery);
        const KEY_SPACE = /\s/g;

        if (!KEY_SPACE.test(searchQuery[0])) {
            setSearchQuery(searchQuery);
        }
    };

    const handleSearchIcon = () => {
        handleFilterData();
    };

    const resetSearchQuery = () => {
        setSearchQuery('');
        setFilteredData([]);
    };

    return (
        <div className={cx('search-container')}>
            <div className={cx('tool-wrapper')}>
                <FilterTool resetSearchQuery={resetSearchQuery} />
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
            <LinkPaginate itemsPerPage={4} data={filterData.length > 0 ? filterData : LinkData} />
        </div>
    );
};

export default Search;
