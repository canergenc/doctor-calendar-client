import React from "react";
import { PaginationLink, PaginationItem, Pagination } from "reactstrap";


const CustomPagination = props => {

    let listOfPaginationItem = []
    for (let index = 0; index < props.paginationItemCount; index++) {
        listOfPaginationItem.push(
            <PaginationItem onClick={() => props.paginationItemClick(index)} className={index === props.currentIndex ? 'active' : 'disabled'} key={index}>
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
            {listOfPaginationItem}
        </Pagination>

        // <header className="month-header">
        //   <div className="row">
        //     <button onClick={props.prevMonthClick}>
        //       <i className="fas fa-chevron-circle-left" />
        //     </button>
        //   </div>
        //   <div className="row">
        //     <h1>{props.curMonth.name}<Button onClick={props.downloadExcelClick}>Excel<i className="fa fa-download" style={{ marginLeft: "5px" }}></i></Button></h1>


        //     <p> <Badge style={{ textTransform: 'capitalize', fontSize: 16 }} color="warning">Hafta İçi Nöbet Sayısı: {props.countOfInWeek} - Hafta Sonu Nöbet Sayısı: {props.countOfOnWeekend} </Badge></p>



        //   </div>




        //   <div className="row" >
        //     <button onClick={props.nextMonthClick}>
        //       <i className="fas fa-chevron-circle-right" />
        //     </button>
        //   </div>
        // </header>


    );
}

export default CustomPagination;