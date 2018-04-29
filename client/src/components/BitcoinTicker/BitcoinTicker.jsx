/* @flow */
import * as React from 'react'; // importing as a namespace gives access to React's utility types
import './BitcoinTicker.module.css';

type Rates = {
	[currency: string]: {
		symbol: string,
		buy: string,
	},
};

type Props = {};

type State = {
	rates?: Rates,
};

async function getBitcoinExchangeRates(): Promise<Rates> {
	const response = await fetch('https://blockchain.info/ticker');
	const rates = await response.json();
	return rates;
}

class BitcoinTicker extends React.Component<Props, State> {
	state = {
		rates: undefined,
	}

	componentDidMount() {
		const getLatestRates = () => getBitcoinExchangeRates().then((rates) => {
			this.setState({ rates });
		});

		getLatestRates();
	}

	render() {
		const { rates } = this.state;
		if (rates) {
			return (
				<div styleName="wrapper">
					<p>Bitcoin &#34;buy&#34; rates</p>
					<ul>
						{Object.keys(rates).map(currency => (
							<li key={currency}>
								{currency}: {rates[currency].symbol}{rates[currency].buy}
							</li>
						))}
					</ul>
				</div>
			);
		}

		return (
			<div>
				<p>Loading</p>
			</div>
		);
	}
}

export default BitcoinTicker;
