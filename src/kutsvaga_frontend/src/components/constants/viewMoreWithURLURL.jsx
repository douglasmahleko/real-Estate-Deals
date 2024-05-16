import React from "react";
import ViewMoreWithoutURL from "./viewMoreWithoutURL";
import { Navigate } from "react-router-dom";

class ViewMoreWithURLURL extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title : props.location.state.title,
            urlExt : props.location.state.url,
            headerType : props.location.state.headerType,
            tableHead : null,
            loading : true,
            data : null,
            url: '',
            tableHeaderForUsers : [
                { id: 'title', name : 'Title' },
                { id: 'name', name : 'Name' },
                { id: 'surname', name : 'Surname' },
                { id: 'email', name : 'Email' },
                { id: 'contact', name : 'Contact' },
                { id: 'dob', name : 'D.O.B' },
                { id: 'gender', name : 'Gender' },
                { id: 'country', name : 'Country' },
            ],
            tableHeaderForUsersNotPaid : [
                { id: 'title', name : 'Title' },
                { id: 'name', name : 'Name' },
                { id: 'dob', name : 'D.O.B' },
                { id: 'gender', name : 'Gender' },
                { id: 'country', name : 'Country' },
            ],
             tableHeaderHouseClient : [
                {id:'houseID', name:"House ID"},
                {id:'agentEmail', name:"Agent"},
                {id:'city', name:"City"},
                {id:'phase', name:"Phase/Street"},
                {id:'roomsAvailable', name:"Rooms Available"},
                {id:'conditions', name:"Conditions"},
                {id:'amountPerRoom', name:"Amount Per Room"},
                {id:'requirements', name:"Requirements"},
                {id:'utilities', name:"Utilities"},
            ],
            tableHeaderHouseAgent : [
                {id:'houseID', name:"House ID"},
                {id:'address', name:"Address"},
                {id:'city', name:"City"},
                {id:'phase', name:"Phase/Street"},
                {id:'roomsAvailable', name:"Rooms Available"},
                {id:'conditions', name:"Conditions"},
                {id:'amountPerRoom', name:"Amount Per Room"},
                {id:'requirements', name:"Requirements"},
                {id:'utilities', name:"Utilities"},
            ],
            tableHeaderHouseAgentNotPaid : [
                {id:'roomsAvailable', name:"Rooms Available"},
                {id:'conditions', name:"Conditions"},
                {id:'amountPerRoom', name:"Amount Per Room"},
                {id:'requirements', name:"Requirements"},
                {id:'utilities', name:"Utilities"},
            ],
                 tableHeaderPreRequisities : [
                    {id:'clientEmail', name:"Client Email"},
                    {id:'phase', name:"Phase/Street"},
                    {id:'roomsNeeded', name:"Rooms Needed"},
                    {id:'amountPerRoom', name:"Amount Per Room"},
                    {id:'requirements', name:"Requirements"},
                    {id:'budget', name:"Budget"}, 
                    {id:'city', name:"City"},
                    {id:'numOfRooms', name:"Num Of Rooms"},
                    {id:'totalAmount', name:"Total Amount"},
                    {id:'country', name:"Country"},
                    {id:'personalInfo', name:"Personal Info"},
                    {id:'consideration', name:"Consideration"},
                    {id:'prerequisites', name:"Prerequisites"}, 
                    {id:'dateExpectingHouse', name:"Date Expecting House"}, 
                  ],
                 tableHeaderForShorlist : [
                    {id:"agentEmail", name:"Agent Email"},
                    {id:"clientEmail", name:"Client Email"},
                    {id:"houseID", name:"House Id"},
                    {id:"agentContact", name:"Agent Contact"},
                    {id:"roomsAvailable", name:"Rooms Available"},
                    {id:"clientContact", name:"Client Contact"},
                    {id:"conditionsFromLandlord", name:"Conditions From Landlord"},
                    {id:"utilitiesForOnHouse", name:"Utilities For On House"}
                  ]
        }
    }
    componentDidMount(){
        this.props.handleClickSnackBar('Loading', 'info')
        if(this.props.location.state.headerType === 'user'){
            if(this.props.paid){
                this.setState( {tableHead : this.state.tableHeaderForUsers})
            }else{
                this.setState( {tableHead : this.state.tableHeaderForUsersNotPaid})
            }
            this.getUserData()
        }
        else if(this.props.location.state.headerType === 'house'){
            if(this.props.userLevel === "AGENT"){
                if(this.props.paid){
                    this.setState( {tableHead : this.state.tableHeaderHouseAgent})
                }else{
                    this.setState( {tableHead : this.state.tableHeaderHouseAgentNotPaid})
                }
                this.getHouserData()
            }
            else{
                if(this.props.paid){
                    this.setState( {tableHead : this.state.tableHeaderHouseClient})
                }else{
                    this.setState( {tableHead : this.state.tableHeaderHouseAgentNotPaid})
                }
                this.getHouserData()
            }
        }
    }
    getUserData = async () => {
        let msg = await this.props.backendActor.getUserByEmail(this.props.location.state.url)
        if(msg.err != 'No such User'){
            this.setState({data : msg.ok})
        }
        else{
            this.props.handleClickSnackBar(msg.err, 'error')
        }
    }
    getHouserData = async () => {
        let msg = await this.props.backendActor.getAHouse(this.props.location.state.url)
        if(msg.err != 'House not found'){
            this.setState({data : msg.ok})
        }
        else{
            this.props.handleClickSnackBar(msg.err, 'error')
        }
    }
    render(){
        return(
            <>
             { this.props.isAuthenticated ? (this.state.data && <ViewMoreWithoutURL tableHead={this.state.tableHead} data1={this.state.data} isAuthenticated={this.props.isAuthenticated}
                user={this.props.user} title1={this.props.location.state.title} paid={this.props.paid} />) : (
                    <Navigate to="/" replace={true} />
                )}
            </>
            
        )
    }
}

export default ViewMoreWithURLURL