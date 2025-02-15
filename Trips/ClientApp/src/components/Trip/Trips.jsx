import React, { Component } from 'react'
import axios from 'axios'

export class Trips extends Component 
{
    constructor(props) 
    {
        super(props);
        this.onTripUpdate = this.onTripUpdate.bind(this);
        this.onTripDelete = this.onTripDelete.bind(this);


        this.state = { trips: [], loading: true };
    }

    componentDidMount(){
        this.populateTripsData();
    }

    onTripUpdate(id){
        const {history} = this.props;
        history.push('/update/'+id);
    }
    onTripDelete(id){
        const {history} = this.props;
        history.push('/delete/'+id);
    }
    populateTripsData(){
        axios.get("api/Trips/GetTrips").then(result => {
            const response = result.data;
            this.setState({ trips: response, loading: false });
        })
    }

    renderTripsTable(trips){
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Date Started</th>
                        <th>Date Completed</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        trips.map(trip=>(
                            <tr key={trip.id}>
                            <td>{trip.name}</td>
                            <td>{trip.description}</td>
                            <td>{new Date(trip.dateStarted).toLocaleDateString()}</td>
                            <td>{trip.dateCompleted ? new Date(trip.dateCompleted).toLocaleDateString(): '-' }</td>
                            <td>
                                <div className='form-group'>
                                    <button onClick={()=> this.onTripUpdate(trip.id)} className='btn btn-success'>
                                        Update</button> 
                                        <button onClick={()=> this.onTripDelete(trip.id)} className='btn btn-danger'>
                                        Delete</button>   
                                </div>
                            </td>
                           </tr>

                        ))
                    }
                  
                </tbody>
            </table>
        );
    }

    render(){

        let content= this.state.loading ?(
            <p>
                <em>Loading ...</em>
            </p>
        ) : (
            this.renderTripsTable(this.state.trips)
        )
        return (
            <div>
                <h1>All Trips</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {content}
            </div>
        );
    }

}