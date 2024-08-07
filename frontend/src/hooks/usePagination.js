import { useMemo } from 'react';
export const DOTS = '...';

export function usePagination({ totalCount, pageSize, siblingCount = 1, currentPage }) {
  const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length: length }, (_, index) => index + start);
  };

  const paginationRange = useMemo(() => {
    const totalPage = Math.ceil(totalCount / pageSize);
    const totalPageShow = siblingCount + 5;

    if (totalPage <= totalPageShow) {
      return range(1, totalPage);
    }

    const leftIndex = Math.max(currentPage - siblingCount, 1);
    const rightIndex = Math.min(currentPage + siblingCount, totalPage);

    const showLeftDots = leftIndex > 2;
    const showRightDots = rightIndex < totalPage - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPage;
    const itemCount = 3 + 2 * siblingCount;

    if (!showLeftDots && showRightDots) {
      let leftRange = range(1, itemCount);
      return [...leftRange, DOTS, totalPage];
    }

    if (showLeftDots && !showRightDots) {
      let rightRange = range(totalPage - itemCount + 1, totalPage);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      let midRange = range(leftIndex, rightIndex);
      return [firstPageIndex, DOTS, ...midRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
}
