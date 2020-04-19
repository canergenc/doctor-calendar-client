import React from "react";
import { PaginationLink, PaginationItem, Pagination } from "reactstrap";


const CustomPagination = props => {

    let listOfPaginationItem = []

    for (let index = 0; index < props.paginationItemCount; index++) {
        listOfPaginationItem.push(
            <PaginationItem onClick={() => props.paginationItemClick(index)} className={index == props.currentIndex ? 'active' : 'disabled'} key={index}>
                <PaginationLink
                    href="#pablo"
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

            {/* <PaginationItem className="disabled">
                <PaginationLink
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    tabIndex="-1"
                >
                    <i className="fas fa-angle-left" />
                    <span className="sr-only">Previous</span>
                </PaginationLink>
            </PaginationItem> */}
            {listOfPaginationItem}
            {/* <PaginationItem>
                <PaginationLink
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                >
                    <i className="fas fa-angle-right" />
                    <span className="sr-only">Next</span>
                </PaginationLink>
            </PaginationItem> */}
        </Pagination>


    );
}

export default CustomPagination;