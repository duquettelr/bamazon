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