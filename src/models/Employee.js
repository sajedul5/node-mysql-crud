const dbConn = require('../../config/db');


const Employee = function(employee){
    this.first_name = employee.first_name;
    this.last_name = employee.last_name;
    this.email = employee.email;
    this.organization = employee.organization;
    this.designation = employee.designation;
    this.salary = employee.salary;
    this.status = employee.status;
    this.created_at = new Date();
    this.updated_at = new Date();
}


// get all employee
Employee.getAllEmployees = (result) => {
    dbConn.query('SELECT * FROM employees', (err, res) => {
        if(err){
            console.log('Error while fetching employees', err);
            result(null, err);
        }else{
            console.log('Employees fetched successfully!');
            result(null, res);
        }
    });
}


// get employee by id from DB
Employee.getEmployeeById = (id, result) => {
    dbConn.query('SELECT * FROM employees WHERE id=?', id, (err, res) => {
        if(err){
            console.log('Error while fetching employee by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    });
}


// create new employee
Employee.createEmployee = (employeeReqData, result) =>{
    dbConn.query('INSERT INTO employees SET?', employeeReqData, (err, res) => {
        if(err){
        console.log('Error while inserting data');
        result(null, {status:false, message: err});
        }else{
            console.log('Employee created successfully!');
            result(null, {status:true, message: 'Employee created successfully!', insertId: res.id});
        }
        
    })
}



// update employee
Employee.updateEmployee = (id, employeeReqData, result)=>{
    dbConn.query("UPDATE employees SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?", [employeeReqData.first_name,employeeReqData.last_name,employeeReqData.email,employeeReqData.phone,employeeReqData.organization,employeeReqData.designation,employeeReqData.salary, id], (err, res)=>{
        if(err){
            console.log('Error while updating the employee');
            result(null, err);
        }else{
            console.log("Employee updated successfully");
            result(null, res);
        }
    });
}



// delete employee
Employee.deleteEmployee = (id, result)=>{
    
    // dbConn.query("UPDATE employees SET is_deleted=? WHERE id = ?", [1, id], (err, res)=>{
    //     if(err){
    //         console.log('Error while deleting the employee');
    //         result(null, err);
    //     }else{
    //         console.log("Employee deleted successfully");
    //         result(null, res);
    //     }
    // });

    dbConn.query('DELETE FROM employees WHERE id=?', [id], (err, res)=>{
        if(err){
            console.log('Error while deleting the employee');
            result(null, err);
        }else{
            console.log("Employee deleted successfully");
            result(null, res);
        }
    })
}


module.exports = Employee;