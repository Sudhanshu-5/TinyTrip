import React, { Component } from 'react'

export class cancellation extends Component {


    constructor(props) {
        super(props)

        this.state = {
            data:
                {
                    heading:"Cancellation",
                    conditions:[
                        "09 Nights accommodation.",
	                                "Daily breakfast except Bandhavgarh where all meals are included.",
	                                "Arrival / Departure transfers from airport or railway station.",
	                                "Sightseeing by Air Conditioned Car",
	                                "A/C Indigo Car for sightseeing  excursions as per our itinerary (min. 02 Pax Basis)",
	                                "A/C Innova Car for sightseeing  excursions as per our itinerary (min. 04 Pax Basis)",
	                                "All Currently applicable taxes.",
	                                "02 Jeep Safaris in Bandhavgarh National Park are included in above package. (Safari timings are subject to availability)"
                    ]
                }
        }
    }

    render() {
        return (
            <div id="cp">
            <h2>{this.state.data.heading}</h2>
            <div role="tablist" class="add_bottom_45 accordion_2" id="payment">
            <div class="card-body">
                            <div class="package_det_d_Exclusions">
                                <ul>
                                {
                        this.state.data.conditions.map
                        (
                            (item)=><li>{item}</li>
                        )
                }
                                </ul>
                            </div>
                        </div>
            </div>
        </div>
        )
    }
}

export default cancellation;