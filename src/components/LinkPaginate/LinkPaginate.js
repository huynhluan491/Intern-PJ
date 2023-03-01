import classNames from 'classnames/bind';
import styles from './LinkPaginate.module.scss';
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import CateTitle from '../CateTitle/CateTitle';
import LinkItem from '../LinkItem/LinkItem';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);

const LinkPaginate = (props) => {
    const [currentItems, setCurrentItems] = useState(null);
    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const { itemsPerPage, data } = props;
    const linkArray = data;

    // const { LinkData } = useSelector((state) => state.LinkReducer);

    const updateItems = () => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(linkArray?.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(linkArray?.length / itemsPerPage));
    };
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % linkArray?.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        if (linkArray) {
            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(linkArray?.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(linkArray?.length / itemsPerPage));
        }
    }, [itemOffset, itemsPerPage, linkArray]);

    const handleBackToFirst = () => {
        setItemOffset(0);
        updateItems();
    };

    const handleBackToLast = () => {
        setItemOffset(linkArray?.length - 1);
        updateItems();
    };

    return (
        <>
            <CateTitle />
            {/* <LinkItemList listlink={currentItems} /> */}
            <div className={cx('link-item-wrapper')}>
                {currentItems?.map((item) => (
                    <LinkItem data={item} />
                ))}
            </div>
            <div className={cx('paginate-wrapper')}>
                <button className={cx('back-to-first')} onClick={handleBackToFirst}>
                    Đầu
                </button>
                <ReactPaginate
                    nextLabel={<FontAwesomeIcon className={cx('next-icon')} icon={faChevronRight} />}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel={<FontAwesomeIcon className={cx('prev-icon')} icon={faChevronLeft} />}
                    pageClassName={cx('page-item')}
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    activeClassName={cx('active')}
                    disabledClassName={cx('disabled-page')}
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName={cx('container')}
                    renderOnZeroPageCount={null}
                />
                <button className={cx('back-to-last')} onClick={handleBackToLast}>
                    Cuối
                </button>
            </div>
        </>
    );
};

export default LinkPaginate;
