import React from "react";
import { useLocation } from "react-router-dom";
import ViewMoreWithoutURL from "./viewMoreWithoutURL";

function ViewMoreWithURL({user, isAuthenticated, paid}){
    const location = useLocation()
    const title = location.state.title
    const tableHead = location.state.tableHead
    const data = location.state.data
    return(
        <ViewMoreWithoutURL tableHead={tableHead} paid={paid} data1={data} user={user} title1={title} isAuthenticated={isAuthenticated} />
    )
}

export default ViewMoreWithURL