/* @flow */
import * as React from 'react'; // importing as a namespace gives access to React's utility types

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
		getBitcoinExchangeRates().then((rates) => {
			this.setState({ rates });
		});
	}

	render() {
		const { rates } = this.state;
		if (rates) {
			return (
				<div>
					<p>Bitcoin rates</p>
					{Object.keys(rates).map(currency => (
						<div key={currency}>
							{currency}: {rates[currency].symbol}{rates[currency].buy}
						</div>
					))}
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
