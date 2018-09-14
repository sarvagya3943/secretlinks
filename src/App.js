import React, { Component } from 'react'

class App extends Component {
    constructor(props) {
        super(props) ;
        this.state = {
            diffProblems : []
        }
    }
    getUniqueProbs = handle => {
        return fetch('https://codeforces.com/api/user.status?handle=' + handle + '&from=1')
        .then(res => res.json())
        .then(data => {
            let myProb = data.result.map(e => {
                return (e.problem.contestId + e.problem.index) ;
            }) ;
            let uniqueProb = myProb.filter((e , i) => {
                return myProb.indexOf(e) === i ; 
            })
            return uniqueProb ;
        }) ;
    }
    componentDidMount() {
        let mydata; this.getUniqueProbs('SarvagyaAgarwal').then(x => mydata = x) ;
        let hisdata ; this.getUniqueProbs('Ashishgup').then(x => hisdata = x) ;
        let otherdata ; this.getUniqueProbs('teja349').then(x => otherdata = x) ;

        setTimeout( () => {
            console.log(hisdata) ; 
            console.log(otherdata) ;
            let finaldata = [...hisdata , ...otherdata] ;
            finaldata = finaldata.filter((e , i) => {
                return finaldata.indexOf(e) === i && mydata.indexOf(e) === -1 ;
            })
            this.setState({diffProblems : finaldata}) ;
        } , 4000) ;
    }
    render () {
        const { diffProblems } = this.state ;
        const jsonForm = diffProblems.map(e => {
            const index = e[e.length - 1] ; 
            const rest = e.slice(0,-1) ;
            const tag = (rest.length > 4) ? "gym" : "problemset/problem" ;
            return {
                rest , index , tag 
            }
        })
        console.log(jsonForm) ;
        return (
            <div>
                <h1>Number of Problems : {jsonForm.length}</h1>
                {
                    jsonForm.map((elem , i) => {
                        return <li key={i}><a href={`https://codeforces.com/${elem.tag}/${elem.rest}/${elem.index}`}>{`${elem.rest}${elem.index}`}</a></li>
                    })
                }
            </div>
        )
    }
}


export default App;
