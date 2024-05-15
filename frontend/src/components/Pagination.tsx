import { PaginationProps } from "../types";

const Pagination = (props: PaginationProps) => {
  const getNumbers = () => {
    let numbers = [];
    let pageNumber = 1;
    const itemsPerPage = props.itemsPerPage;

    for (let i = 0; i < props.count; i += itemsPerPage) {
      const page = pageNumber;
      let content;

      // Page Numbers Div
      content = (
        <div
          key={i}
          onClick={() => props.visitPage(page)}
          className={`${
            props.active === page ? "bg-blue-200" : "bg-transparent" // Checking Active Page
          } border border-blue-500 text-blue-800 py-2 px-3 font-medium hover:bg-blue-200`}
        >
          {pageNumber}
        </div>
      );

      numbers.push(content);
      pageNumber++;
    }

    return numbers;
  };

  return (
    <>
      <div className="flex space-x-1">
        <button
          onClick={() => props.previous_page()}
          className="bg-transparent border border-blue-500 text-blue-800 py-2 px-3 font-medium hover:bg-blue-200"
        >
          Previous
        </button>
        <div className="flex space-x-1">{getNumbers()}</div>
        <button
          onClick={() => props.next_page()}
          className="bg-transparent border border-blue-500 text-blue-800 py-2 px-3 font-medium hover:bg-blue-200"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;
