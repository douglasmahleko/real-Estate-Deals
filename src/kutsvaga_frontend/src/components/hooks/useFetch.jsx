import React, { useEffect, useState } from 'react'

// export default class UseFetch extends React.Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             data : [],
//             url : this.props.url,
//             err : null,
//             pending : false
//         }
//     }
//     componentDidMount(){
//         fetch(this.state.url)
//         .then(res => res.json())
//         .then(dat => {
//             this.setState({data : dat})
//             this.setState({pending : false})
//             this.setState({err : null})
//             console.log(this.state.data)
//         })
//         .catch(err => {
//             this.setState({pending : true})
//             this.setState({err : err.message})
//         })
//     }
//     render(){
//         var data = this.state.data
//         var err = this.state.err
//         var pending = this.state.pending
//         return { data, err, pending }
//     }
// }

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [pending, setPending] = useState(true)
    const [err, setErr] = useState(null)
    
    useEffect(() => {
        

    let users = []
    fetch(url)
        .then(res => res.json())
        .then(dat => {
            
            setPending(false)
            setErr(null)
            data.push(dat)
            setData(users)
            console.log(users)
        })
        .catch(err => {
            setPending(false)
            setErr(err.message)
        })
    }, [url])
    return { data, pending, err}
}
export default useFetch
