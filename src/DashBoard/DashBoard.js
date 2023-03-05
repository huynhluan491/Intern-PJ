import classNames from 'classnames/bind';
import styles from './DashBoard.module.scss';
import Header from '~/components/Header/Header';
import UserAction from '~/components/UserAction/UserAction';
import SideBar from '~/components/SiderBar/SiderBar';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Search from '~/components/FilterData/Search/Search';
import LinkPaginate from '~/components/LinkPaginate/LinkPaginate';
import useDebounce from '~/Hook/useDebounce';

const cx = classNames.bind(styles);

function DashBoard() {
    const { typeCategories } = useSelector((state) => state.FilterReducer);
    const [filterData, setFilteredData] = useState([]);
    const [typeLink, setTypeLink] = useState(typeCategories);
    const [filterTool, setFilterTool] = useState(true);
    const [unFilter, setUnFilter] = useState(true);
    const { LinkData } = useSelector((state) => ({
        LinkData: state.LinkReducer.LinkData,
    }));
    const { searchQuery } = useSelector((state) => ({
        searchQuery: state.SearchReducer.searchQuery,
    }));
    const debouncedValue = useDebounce(searchQuery);

    useEffect(() => {
        handleFilterData();
        console.log(typeCategories);
    }, [debouncedValue, LinkData, typeCategories, typeLink]);

    const handleFilterData = () => {
        const result = LinkData?.filter((item) =>
            item?.description.toLocaleLowerCase().includes(debouncedValue.toLocaleLowerCase()),
        );
        setFilteredData(result);
    };

    const resetFilter = () => {
        setFilteredData([]);
        setTypeLink({
            product: true,
            post: true,
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('body-layout')}>
                <div className={cx('left-side')}>
                    <SideBar />
                </div>
                <div className={cx('right-side')}>
                    <Header />
                    <div className={cx('content-wrapper')}>
                        <UserAction setUnFilter={setUnFilter} unFilter={unFilter} />
                        <Search resetFilter={resetFilter} setUnFilter={setUnFilter} />
                        <LinkPaginate
                            itemsPerPage={4}
                            typeLink={typeCategories}
                            data={filterData.length > 0 ? filterData : LinkData}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;
