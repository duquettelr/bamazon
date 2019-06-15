var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

function displayItems() {
    console.log("displaying all items...");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        // res.forEach(element => {
        //     console.log(item_id)
        // });
        for (var i = 0; i < res.length; i++) {
            console.log("ID #" + res[i].item_id + " : " + res[i].product_name + ", " + "$" + res[i].price);
        }

    })


};

function chooseItemToPurchase() {
    inquirer.prompt([
        {
            name: "purchaseChoice",
            message: "Enter the ID number of the item you would like to purchase: ",
            type: "input"
        },
        {
            name: "howMany",
            message: "How many units of the item would you like to purchase",
            type: "number"
        }
    ]).then(function (answers) {
        connection.query(`SELECT stock_quantity, price FROM products WHERE item_id = ${answers.purchaseChoice}`, function (err, res) {
            if (err) throw err;
            // console.log(res);
            let priceOfChoosenItem = res[0].price;

            if (answers.howMany < res[0].stock_quantity) {
                // console.log("im here");
                let newTotal = res[0].stock_quantity - answers.howMany;
                // console.log("im here now");
                connection.query(`UPDATE products SET stock_quantity = ${newTotal} WHERE item_id = ${answers.purchaseChoice}`, function (err, res) {
                    if (err) throw err;
                    // console.log(res);

                    let totalPrice = answers.howMany * priceOfChoosenItem;

                    let processingDelay = 2000;
                    setTimeout(function () {
                        console.log(`Total Price = $${totalPrice}`);
                    }, processingDelay);

                });

            } else {
                console.log("Insufficient quantity!")
            }

            let processingDelay2 = 4000;
            setTimeout(function () {
                console.log(`Purchase complete!`);
            }, processingDelay2);
        });


    });

}



connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected");
    displayItems();

    let delay = 5000;
    setTimeout(function () {
        chooseItemToPurchase();
    }, delay);

});

// connection.end();

// var delayInMilliseconds = 1000; //1 second

// setTimeout(function() {
//   //your code to be executed after 1 second
// }, delayInMilliseconds);





// con.connect(function(err) {
//     if (err) throw err;
//     var sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result.affectedRows + " record(s) updated");
//     });
//   });



// inquirer.prompt([
//     {
//         name: "bidOrPost",
//         message: "Would you like to bid on an item or post an item?",
//         type: "input"
//     }
// ]).then(function (answers) {
//     const bidOrPost = answers.bidOrPost;
//     userInputFunction(bidOrPost);
// });

// function userInputFunction(bOrP) {
//     if (bOrP === "Post") {

//         inquirer.prompt([
//             {
//                 name: "item",
//                 message: "What is your item",
//                 type: "input"
//             }, {
//                 name: "price",
//                 message: "What is the price",
//                 type: "input",
//             }, {
//                 name: "describeItem",
//                 message: "describe your item",
//                 type: "input"
//             }
//         ]).then(function (answers) {
//             let item = answers.item;
//             let price = answers.price;
//             let describeItem = answers.describeItem;




// function readProducts() {
//     console.log("Selecting all products...\n");
//     connection.query("SELECT * FROM products", function (err, res) {
//         if (err) throw err;
//         // Log all results of the SELECT statement
//         console.log(res);
//         connection.end();
//     });
// }
