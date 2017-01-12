## E-Commerce API Code Challenge Solutions ##

**Challenges 1 & 2:** The solutions to Challenges 1 & 2 can be found in the `/challenges-solutions` directory. Running `node methods.js` in this folder will run both functions and print the result to the terminal.

**Challenge 3:** The backend APIs for Challenge 3 are configured on a Node server and for convenience [deployed here using Heroku](https://hidden-mountain-42973.herokuapp.com/). That demo landing page illustrates and explains all of the functionality for the two following API endpoints:

- `/api/post-prices/` submit a POST request of order data as JSON to receive price data as a JSON response.
- `/api/post-funds/` submit a POST request of order data as JSON to receive JSON data on the funds distributions for the submitted orders.

As an example, the format for order data is as follows:

``` javascript
[
  {
    "order_date": "1/11/2015",
    "order_number": "20150111000001",
    "order_items": [
      {
        "order_item_id": 1,
        "type": "Real Property Recording",
        "pages": 3
      },
      {
        "order_item_id": 2,
        "type": "Real Property Recording",
        "pages": 1
      }
    ]
  },
  {
    "order_date": "1/17/2015",
    "order_number": "20150117000001",
    "order_items": [
      {
        "order_item_id": 3,
        "type": "Real Property Recording",
        "pages": 2
      },
      {
        "order_item_id": 4,
        "type": "Real Property Recording",
        "pages": 20
      }
    ]
  }
]
```
