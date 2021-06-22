import * as backend from './build/index.main.mjs';
import * as reach from '@reach-sh/stdlib/ETH';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {view: 'ConnectAccount'};
    }

    async componentDidMount() {
        const acc = await reach.getDefaultAccount();
        const balAtomic = await reach.balanceOf(acc);
        const bal = reach.formatCurrency(balAtomic, 4);
        this.setState({acc, bal});
        try {
            const faucet = await reach.getFaucet();
            console.log('faucet', faucet)
            this.setState({faucet});
        } catch (e) {
            console.error(e)
            //this.setState({view: 'DeployerOrAttacher'});
        }
    }

    // async fundAccount(fundAmount) {
    //     await reach.transfer(this.state.faucet, this.state.acc, reach.parseCurrency(fundAmount));
    //     this.setState({view: 'DeployerOrAttacher'});
    // }

    render() { 
        return (
            <div>
                <h1>{this.state.bal}</h1>
            </div>
        )
     }
}

class AliceBox extends React.Component {
    render() { 
        return (
            <div>
                <h1>{this.state.bal}</h1>
            </div>
        )
     }
}

class BobBox extends React.Component {
    render() { 
        return (
            <div>
                <h1>{this.state.bal}</h1>
            </div>
        )
     }
}

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(
    React.createElement(App),
    root
);