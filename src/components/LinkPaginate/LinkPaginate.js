import classNames from 'classnames/bind';
import styles from './LinkPaginate.module.scss';
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faClose, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import CateTitle from '../CateTitle/CateTitle';
import LinkItem from '../LinkItem/LinkItem';
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const LinkPaginate = (props) => {
    const [currentItems, setCurrentItems] = useState(null);
    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [activeButton, setActiveButton] = useState(null);
    const [filteredArray, setFilteredArray] = useState([]);

    const { itemsPerPage, data, typeLink } = props;
    const linkArray = data;

    const dispatch = useDispatch();

    const { mappingList } = useSelector((state) => state.LinkReducer);

    const updateItems = () => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(filteredArray.slice(itemOffset, endOffset));
    };

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage;
        setItemOffset(newOffset);
        updateItems();
    };

    const getFilteredItems = (linkArray, typeLink) => {
        let filteredItems = linkArray;
        if (!typeLink.product && typeLink.post) {
            filteredItems = linkArray.filter((item) => item.type === 'post');
        } else if (!typeLink.post) {
            filteredItems = linkArray.filter((item) => item.type !== 'post');
        }
        return filteredItems;
    };

    useEffect(() => {
        if (linkArray) {
            const filteredItems = getFilteredItems(linkArray, typeLink);
            setFilteredArray(filteredItems);
            setPageCount(Math.ceil(filteredItems.length / itemsPerPage));
        }
    }, [itemOffset, itemsPerPage, linkArray, typeLink.product, typeLink.post, mappingList]);

    useEffect(() => {
        updateItems(); // call updateItems when filteredArray changes
    }, [filteredArray, itemOffset, itemsPerPage]);

    const handleBackToFirst = () => {
        setItemOffset(0);
        updateItems();
    };

    const handleBackToLast = () => {
        // setItemOffset(linkArray?.length - 1);
        // updateItems();
        const lastPageIndex = Math.max(pageCount - 1, 0);
        const lastPageOffset = lastPageIndex * itemsPerPage;
        setItemOffset(lastPageOffset);
        updateItems();
    };

    const handleDeleteMapping = () => {
        dispatch({ type: 'DELETE_MAPPING_LINK' });
    };

    const handleCancelMapping = () => {
        dispatch({ type: 'CANCEL_MAPPING_LIST' });
    };

    // -------------
    const handleButtonClick = (id) => {
        setActiveButton(activeButton === id ? null : id);
    };

    return (
        <div className={cx('wrapper')}>
            <CateTitle />
            <div className={cx('link-item-wrapper')}>
                {currentItems?.map((item) => {
                    return (
                        <LinkItem
                            key={item.id}
                            data={item}
                            id={item.id}
                            mappingList={mappingList}
                            isActive={activeButton === item.id}
                            onButtonClick={handleButtonClick}
                            setActiveKey={setActiveButton}
                        />
                    );
                })}
            </div>
            <div className={cx('paginate-wrapper')}>
                <button className={cx('back-to-first')} onClick={handleBackToFirst}>
                    Đầu
                </button>
                <ReactPaginate
                    nextLabel={<FontAwesomeIcon className={cx('next-icon')} icon={faChevronRight} />}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel={<FontAwesomeIcon className={cx('prev-icon')} icon={faChevronLeft} />}
                    pageClassName={cx('page-item')}
                    pageLinkClassName="page-link"
                    previousClassName={cx('page-previous-item')}
                    previousLinkClassName="page-link"
                    nextClassName={cx('page-next-item')}
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
            {mappingList.length > 0 && (
                <div className={cx('mapping-feature')}>
                    <div className={cx('checked-list-quantity')}>
                        <p className={cx('quantity')}>{mappingList.length}</p>
                        <p className={cx('checked-text')}>Đã chọn</p>
                    </div>
                    <div className={cx('cancel-mapping')} onClick={handleDeleteMapping}>
                        <FontAwesomeIcon icon={faTrashCan} />
                        <p className={cx('cancel-text')}>Hủy mapping link</p>
                    </div>
                    <div className={cx('cancel-icon')} onClick={handleCancelMapping}>
                        <FontAwesomeIcon className={cx('icon')} icon={faClose} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LinkPaginate;
