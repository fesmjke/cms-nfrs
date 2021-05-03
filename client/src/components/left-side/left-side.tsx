import React from "react"

export default class LeftSide extends React.Component{
    render(){
        return(
            <div className="d-flex flex-column align-items-stretch bg-white" style={{width : "300px"}}>
                <a className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom"><span className="fs-5 fw-semibold">Categories</span></a>
                <div className="list-group list-group-flush border-bottom scrollarea">
                    <a href="#" className="list-group-item list-group-item-action py-3 lh-tight">
                        <div className="d-flex w-100 align-items-center justify-content-between">
                            <strong className="mb-1">Category Title</strong>
                        </div>
                        <div className="col-10 mb-1 small">Description</div>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action py-3 lh-tight">
                        <div className="d-flex w-100 align-items-center justify-content-between">
                            <strong className="mb-1">Category Title</strong>
                        </div>
                        <div className="col-10 mb-1 small">Description</div>
                    </a>
                </div>
            </div>
        )
    }
}