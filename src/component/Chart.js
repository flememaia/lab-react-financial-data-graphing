import { Component } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

class ChartComponent extends Component{
    state = {
        bitCoinPrice: [],
        startDate: '',
        endDate: '',
    }

    //componentDidMount pra pegar as infos do site
    componentDidMount = () =>{
        axios.get("http://api.coindesk.com/v1/bpi/historical/close.json").then((response) => {
            console.log(response)
            const bitPrices = response.data.bpi
            console.log(bitPrices)

            this.setState({ bitCoinPrice: {...bitPrices}})
    
        }).catch((err) => {
            console.log(err)
        })
    }

    //incluir o gráfico no componentDidUpdate pois é qdo temos certeza que já terminou de atualizar o state com os dados do API
    componentDidUpdate = (event) => {
        
        const canvas = document.getElementById("myChart")

        // if (!(event === 0)){
        //     this.startHandleChange(event);
        //     this.endHandleChange(event);
        //     this.filterData()
        // }

        const chart = new Chart(canvas, {
            type: "line",
            data: {
                labels: Object.keys(this.state.bitCoinPrice),
                datasets: 
                [
                    {
                        label: "Bitcoin Price",
                        fill: true,
                        borderColor: "rgb(0, 0, 255)",
                        data: Object.values(this.state.bitCoinPrice)
                    } 
                ]
            }
        })
    }

    startHandleChange = (event) => {

        this.setState({ [event.target.id]: event.target.value });

    }

    endHandleChange = (event) => {
        
        this.setState({ [event.target.id]: event.target.value });
    }

    filterData = () => {

        const clone = [...this.state.bitCoinPrice]

        const newClone = clone.filter(element => element >= this.state.startDate && element <= this.state.endDate)
            
        this.setState({ [this.state]: [...newClone] });
    }
    
    render(){
        return (
            <div>
                <div>
                    <h3>Starting Date</h3>
                    <input id="startDate" type="date" value="" onChange={this.startHandleChange}/>
                    <span className="add-on"><i className="far fa-calendar-alt"></i></span>
                    <h3>Ending Date</h3>   
                    <input id="EndDate" type="date" value="" onChange={this.endHandleChange}/>
                    <span className="add-on"><i className="icon-th"></i></span>
                </div>
                <canvas id="myChart"></canvas>
            </div>
        )
    }
}

export default ChartComponent;