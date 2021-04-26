const sql = require('./db')

const Customer = customer => {
    this.email = customer.email
    this.name = customer.name
    this.active = customer.active
}

Customer.create = (newCustomer, result) => {
    sql.query(
        `INSERT INTO customers SET ?`, newCustomer, (err, res) => {
            err ? console.log(`error: ${err}`) : result(err, null)
            return
            
        }
    )
    console.log('customer created', {id: res.insertId, ...newCustomer })
    result(null, { id: res.insertId, ...newCustomer })
}

Customer.findById = (customerId, result) => {
    sql.query(
        `SELECT * FROM customers WHERE id = ${customerId}`, (err, res) => {
            err ? console.log(`error: ${err}`) : result(err, null)
            return 
        }
    )
    if(res.length) {
        console.log(`found customer: ${res[0]}`) 
        result(null, res[0])
        return
    }
    result({ kind: 'not found'}, null)
   
}

Customer.getAll = result => {
    sql.query(
        `SELECT * FROM customers`, (err, res) => {
            err ? console.log(`error: ${err}`) : result(err, null)
            return  
        }
    )
    console.log(`customers: ${res}`)
    result(null, res)
}

Customer.updateById = (id, customer, result) => {
    sql.query(
        `UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?`,
        [customer.email, customer.name, customer.active, id],
        (err, res) => {
            err ? console.log(`error: ${err}`) : result(null, err)
            return
        }
       
    )
    if (res.affectedRows == 0){
         result({ kind: 'not_found'}, null)
         return   
    }
    console.log(`updated customer: `, {id: id, ...customer})
    result(null, { id: id, ...customer })
}

// add customer remove

// add customer removeAll





module.exports = Customer;
        

