import React from "react";
import { PaginationLink, PaginationItem, Pagination } from "reactstrap";


const CustomPagination = props => {

    let listOfPaginationItem = []

    for (let index = 0; index < props.paginationItemCount; index++) {
        listOfPaginationItem.push(
            <PaginationItem onClick={() => props.paginationItemClick(index)} className={index === props.currentIndex ? 'active' : 'disabled'} key={index}>
                <PaginationLink
                >
                    {index + 1}<span className="sr-only">(current)</span>
                </PaginationLink>
            </PaginationItem>
        )
    }


    return (

        <Pagination
            className="pagination justify-content-end mb-0"
            listClassName="justify-content-end mb-0"
        >
            {listOfPaginationItem}
        </Pagination>


    );
}

export default CustomPagination;