import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import styled from "styled-components";

const PaginationContainer = styled.div`
  .pagination {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .pagination-page {
    padding: 0px 8px;
    border-radius: 0px;
    cursor: pointer;
    &:hover {
      background-color: var(--color-gray-200);
    }
  }

  .pagination-active {
    background-color: var(--color-primary-200);
    box-shadow: var(--shadow-md);

    &:hover {
      background-color: var(--color-primary-200);
    }
  }

  .pagination-link {
    padding: 0px 4px;
    cursor: pointer;

    &:hover {
      background-color: var(--color-gray-200);
    }
  }
`;

function Pagination({
  onPageChange,
  pageCount,
  currentPage
}: {
  pageCount: number;
  currentPage: number;
  onPageChange: (selected: number) => void;
}) {

  function handlePageChange(selected: number){
    console.log("handle page change :", selected)
    onPageChange(selected)
  }
  return (
    <PaginationContainer>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<IoChevronForward />}
        onPageChange={({ selected }) => handlePageChange(selected)}
        pageCount={pageCount}
        forcePage={currentPage}
        previousLabel={<IoChevronBack/>}
        className="pagination"
        pageLinkClassName="pagination-page"
        
        activeClassName="pagination-active"
        nextLinkClassName="pagination-link"
        previousLinkClassName="pagination-link"
        renderOnZeroPageCount={null}
      />
    </PaginationContainer>
  );
}

export default Pagination;
