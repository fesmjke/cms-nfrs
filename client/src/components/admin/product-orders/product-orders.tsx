import React from "react";
import OrderService from "../../../services/order.service";
import { IOrder } from "../../../types/interfaces/order";

interface ProductOrdersState {
    orders : IOrder[]
}

export default class ProductOrders extends React.Component<{},ProductOrdersState>{
    private _orderService : OrderService;

    async componentDidMount(){
        const orders = await this._orderService.loadAllOrders();

        console.log(orders);

        this.setState({orders : orders});
    }

    constructor(props: any){
        super(props);

        this._orderService = new OrderService();

        this.state = {
            orders : []
        }
    }

    calculateTotalProfit = () => {
        const profit = this.state.orders.map((order) => {
            if(order.status == "paid") return +order.total_price;
            else return 0
        })
        return this.state.orders.length ? profit.reduce((acc,value) => {return acc + value}) : null;
    }

    createListOfOrders = () => {
        return this.state.orders.map((order,index) => {
            return (
                <tr className={order.status === 'paid' ? 'table-success' : 'table-danger'}>
                    <th scope="row">{index + 1}</th>
                    <td>{order.name}</td>
                    <td>{order.last_name}</td>
                    <td>{order.email}</td>
                    <td>{order.status}</td>
                    <td>{order.total_price}</td>
                </tr>
            )
        }) 
    }

    render(){
        const orders = this.createListOfOrders();
        const calculateTotal = this.calculateTotalProfit();


        return(
            <div className="container">
                <div className="row">
                    <div className="col">
                        <table className="table bordered-table mt-3">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Status</th>
                                <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders}
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-end mt-3">
                            <h3>
                                Total money earned {calculateTotal} ₴
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}