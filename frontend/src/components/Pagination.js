import { usePagination, DOTS } from '../hooks/usePagination';
import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

function Pagination({ props }) {
  const { siblingCount, currentPage, totalCount, pageSize, onPageChange } = props;

  const paginationRange = usePagination({
    totalCount,
    pageSize,
    siblingCount,
    currentPage,
  });

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  
  return (
    <ul className={cx('pagination-container')}>
      <li
        onClick={onPrevious}
        className={cx('pagination-item', {
          disabled: currentPage === 1,
        })}
      >
        <div className={cx('arrow left')}>&larr;</div>
      </li>

      {paginationRange.map((pageNum) => {
        if (pageNum === DOTS) {
          return <li>...</li>;
        }

        return (
          <li
            className={cx('pagination-item', {
              'item--disabled': pageNum === currentPage,
            })}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </li>
        );
      })}

      <li
        onClick={onNext}
        className={cx('pagination-item', {
          disabled: currentPage === lastPage,
        })}
      >
        <div className={cx('arrow right')}>&rarr;</div>
      </li>
    </ul>
  );
}

export default Pagination;
