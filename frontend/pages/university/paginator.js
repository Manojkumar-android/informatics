import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Paginator = ({ page, pagingCounter, to, totalDocs, hasPrevPage, hasNextPage, onPageUpdate }) => {
    const onClick = (e, type) => {

    }
    return (
        <div className="flex items-center ">
            <i className={`bg-gray-100 p-2 ${hasPrevPage ? 'hover:bg-gray-200' : ''} cursor-pointer`}
                onClick={hasPrevPage ? (e) => onPageUpdate("prev") : null}>
                <FaChevronLeft
                    color={hasPrevPage ? "black" : "grey"} />
            </i>
            <div className="mx-3">{pagingCounter} to {page * to} of {totalDocs}</div>
            <i className={`bg-gray-100 p-2 ${hasNextPage ? 'hover:bg-gray-200' : ''} cursor-pointer`}
                onClick={hasNextPage ? (e) => onPageUpdate("next") : null}>

                <FaChevronRight
                    color={hasNextPage ? "black" : "grey"} />
            </i>

        </div >
    )
}
export default Paginator;