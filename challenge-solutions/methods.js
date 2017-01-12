
var fees = require('./fees.js');
var orders = require('./orders.js');

// helper function to calculate order price
function calculatePrice(type, pages) {
	let price = 0;
	// match the order type with the known order types
	// calculate price for order
	let order = type[0];
	price += +(order.fees[0].amount);
	pages--;
	if (pages > 0) price += +(order.fees[1].amount) * pages;
	return price;	
};

// print the prices of an order
function printPrices(orders) {
	console.log('Challenge 1: Fees ——————————————————————————————————————————————————————————————————————————— \n');
	orders.forEach(order => {
		// print order number
		console.log(`Order ID: ${order.order_number}`);
		let total = 0;
		// iterate through all orders and accumulate total
		order.order_items.forEach(item => {
			// match order fee type and calculate price of each item and print
			let order_fees = fees.filter(order_fees => order_fees.order_item_type === item.type);
			let price = calculatePrice(order_fees, item.pages);
			total += price;
			console.log(`\tOrder item: ${item.type}: $${price}`);
		});
		// print total for order
		console.log(`\tOrder total: $${total}`);
		console.log(`\n`);
	});

}

// determine fund distributions for a series of orders, print total distribution and per order
function allocateFunds(orders) {
	let json = [];
	console.log('Challenge 2: Distributions ————————————————————————————————————————————————————————————————— \n');
	// create variable to track totals for all process orders
	let totals = {};
	orders.forEach(order => {
		// print order number

		let orderTotal = {};
		console.log(`Order ID: ${order.order_number}`);

		// iterate through each order
		order.order_items.forEach(item => {
			// match order fee type and calculate price for order
			let order_fees = fees.filter(order_fees => order_fees.order_item_type === item.type);
			let price = calculatePrice(order_fees, item.pages);
			// create a variable to track total fund distribution for order
			let totalFunds = 0;
			// iterate through all funds for this order and distribute accordingly to global total and order total
			for (let fund of order_fees[0].distributions) {
				// global total:
				if (!totals.hasOwnProperty(fund.name)) {
					totals[fund.name] = +fund.amount;
				} else {
					totals[fund.name] = totals[fund.name] + +fund.amount;
				}
				// order total:
				totalFunds += +fund.amount;
				if (!orderTotal.hasOwnProperty(fund.name)) {
					orderTotal[fund.name] = +fund.amount;
				} else {
					orderTotal[fund.name] = orderTotal[fund.name] + +fund.amount;
				}
			};
			// calculate remaining funds for 'Other' category
			let remaining = price - totalFunds;
			if (!totals.hasOwnProperty('Other')) {
				totals.Other = remaining;
			} else {
				totals.Other = totals.Other + remaining;
			}
			// set 'Other' category for this order
			if (!orderTotal.hasOwnProperty('Other')) {
				orderTotal.Other = remaining;
			} else {
				orderTotal.Other = orderTotal.Other + remaining;
			}

		});

		// simply reformat object so 'Other' funds are printed last
		let Extra = orderTotal.Other;
		delete orderTotal.Other;
		orderTotal.Other = Extra;

		// print out the fund distributions for this order
		for (let fund of Object.keys(orderTotal)) {
				console.log(`\tFund - ${fund}: $${orderTotal[fund]}`);
		}

		console.log(`\n`);

	});

	// simply reformat object so 'Other' funds are printed last
	let Extra = totals.Other;
	delete totals.Other;
	totals.Other = Extra;

	// print out the fund distributions for all processed orders
	console.log(`Total distributions:`);
	for (let fund of Object.keys(totals)) {
		console.log(`\tFund - ${fund}: $${totals[fund]}`);
	}

}
	
printPrices(orders);
allocateFunds(orders);