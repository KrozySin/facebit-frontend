import { Pagination } from "react-bootstrap"

const PaginationCompoent = () => {
    return (
        <Pagination className="justify-content-center">
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item disabled>{1}</Pagination.Item>
  
        {/* <Pagination.Item>{11}</Pagination.Item>
        <Pagination.Item active>{12}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Item disabled>{14}</Pagination.Item> */}
  
        {/* <Pagination.Item>{20}</Pagination.Item> */}
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    )
}

export default PaginationCompoent;