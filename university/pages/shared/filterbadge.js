const FilterBadge = ({ appliedFilters, onRemove }) => {
    return (
        <div className="flex">
            {appliedFilters.map((filter) => (
                <div
                    key={filter.id}  // Assuming `filter` has an `id` or unique key
                    className="inline-flex h-[30px] bg-gray-600 text-white text-center justify-center items-center rounded-md px-3 me-3  my-3 cursor-pointer"
                    onClick={() => onRemove(filter)} // Call the onRemove function with the current filter
                >
                    <span>
                        {filter.type} : {filter.displayName}
                    </span>
                    <img
                        src="/assets/icons/close.png"
                        alt="close"
                        height="14px"
                        width="14px"
                        className="ms-3"
                    />
                </div>
            ))}
        </div>
    );
}

export default FilterBadge;
