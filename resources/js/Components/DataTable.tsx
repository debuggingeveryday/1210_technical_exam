import React from 'react';
import { useRef, useState } from 'react';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa6';

/**
 * TODO: remove emit method and change to event listener and http request data should inside the component
 */

/**
 * @param data object // response backend data.
 * @param column array // table column.
 * @param sortColumn function(sortBy, orderBy) // call back function to sort columns.
 * @param totalPages integer // for displaying total pages.
 * @param fromPage integer // for displaying from page.
 * @param toPage integer // for displaying to page.
 * @param links string // for displaying http link every click pages.
 * @param pageAction function // callback function for previous and next.
 *
 * @return JSX.element // <DynamicTable />
 */

const ASCENDING = 'ASC';
const DESCENDING = 'DESC';

export default function DataTable({ className = '', ...props }) {
  const [orderBy, setOrderBy] = useState(ASCENDING);
  const [sortBy, setSortBy] = useState('');
  const caret = useRef<any>([]);

  function orderColumn(column: any, indexRow: any, sort = true) {
    if (sort === false) return false;
    if (column === '_index') return false;
    if (column === '_custom') return false;

    if (orderBy === ASCENDING) {
      setOrderBy(DESCENDING);
    } else if (orderBy === DESCENDING) {
      setOrderBy(ASCENDING);
    }

    setSortBy(column);
    props.sortColumn(column, orderBy);
  }

  return (
    <div>
      <TableHeader />
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-base text-white bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {props.columns.map(({ column, name, component, sort }: any, indexRow: any) => (
              <th key={indexRow} onClick={() => orderColumn(column, indexRow, sort)} className="py-3 text-left pl-3">
                {column === '_custom' ? (
                  <>{component}</>
                ) : (
                  <div className="flex space-x-1">
                    <span>{name}</span>
                    {column === sortBy && (
                      <div ref={el => (caret.current[indexRow] = el)}>
                        {orderBy === 'ASC' ? <FaCaretDown /> : <FaCaretUp />}
                      </div>
                    )}
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <>
            {props.data.map((dataRow: any, indexRow: any) => (
              <tr key={indexRow} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                {props.columns.map(({ column, mutate, childComponent }: any, columnIndex: any) => (
                  <td key={columnIndex} className="py-3 text-base text-left pl-3">
                    <TableDataComponent
                      mutate={mutate}
                      childComponent={childComponent}
                      dataColumn={column}
                      dataRow={dataRow}
                      indexRow={indexRow}
                      fromPage={props.fromPage}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </>
        </tbody>
      </table>
      <div className="grid grid-cols-2 grid-rows-1">
        <div>
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{props.fromPage}</span> to{' '}
            <span className="font-semibold text-gray-900 dark:text-white">{props.toPage}</span> of{' '}
            <span className="font-semibold text-gray-900 dark:text-white">{props.totalPages}</span> Entries
          </span>
        </div>
        <div className="flex justify-end">
          <Pagination
            currentPage={props.currentPage}
            pageAction={(value: any) => props.pageAction(value)}
            links={props.links}
          />
        </div>
      </div>
    </div>
  );
}

export const TableHeader = ({ children }: any) => <div>{children}</div>;

const TableDataComponent = ({ mutate, dataColumn, childComponent, dataRow, indexRow, fromPage }: any) => {
  if (dataColumn === '_custom') return childComponent(dataRow, indexRow);
  if (dataColumn === '_index') return indexRow + fromPage + 1;
  if (!['_custom', '_index'].includes(dataColumn) && mutate) return mutate(dataRow[dataColumn], dataRow, indexRow);

  return dataRow[dataColumn];
};

const Pagination = ({ currentPage, pageAction, links = {} }: any) => {
  function handleClick(item: any) {
    pageAction(item);
  }

  return (
    <div className="flex space-x-2">
      <nav aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-8 text-sm">
          {links.map((item: any, index: any) => (
            <li key={index}>
              <button
                type="button"
                disabled={item.label === '...' ? true : false}
                onClick={() => handleClick(item)}
                className={`${
                  item.active ? 'text-blue-500 bg-blue-100' : 'text-gray-500'
                } flex items-center justify-center px-3 h-8 leading-tight bg-white hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white border dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400  border-gray-300 hover:bg-gray-100`}
              >
                <PaginateButton label={item.label} />
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

const PaginateButton = ({ label }: any) => {
  if (label === '&laquo; Previous') {
    return <FaCaretLeft />;
  } else if (label === 'Next &raquo;') {
    return <FaCaretRight />;
  } else {
    return label;
  }
};
