const Employee = require('../models/Employee');
const EmployeeModel = require('../models/Employee');


// get all employee list
exports.getEmployeeList = (req, res) => {
    //console.log('Here all employee list');
    EmployeeModel.getAllEmployees((err, employees) => {
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('Employees', employees);
        res.send(employees);
    });

}

// get employee by ID
exports.getEmployeeById = (req, res) => {
    //console.log('get emp by id');
    EmployeeModel.getEmployeeById(req.params.id, (err, employee) => {
        if(err)
        res.send(err);
        console.log('Single employee data', employee);
        res.send(employee);

    });
}

// create new employee
exports.createNewEmployee = (req, res) => {
    console.log('create new emp', req.body);
    const employeeReqData = new Employee(req.body);
    //check null
    if(req.body.contructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        console.log('valid data');
        //return;
        Employee.createEmployee(employeeReqData, (err, employee) => {
            if(err)
                res.send(err);
                res.json({status:true, message: 'Employee data insert successfully!', data: employee});
        });
    }
}



// update employee

exports.updateEmployee = (req, res) => {
    const employeeReqData = new Employee(req.body);
    console.log('employeeReqData update', employeeReqData);
    //check null
    if(req.body.contructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        console.log('valid data');
        //return;
        Employee.updateEmployee(req.params.id, employeeReqData, (err, employee) => {
            if(err)
                res.send(err);
                res.json({status:true, message: 'Employee data update successfully!', data: employee});
        });
    }
}



// delete employee
exports.deleteEmployee = (req, res)=>{
    Employee.deleteEmployee(req.params.id, (err, employee)=>{
        if(err)
        res.send(err);
        res.json({success:true, message: 'Employee deleted successully!'});
    })
}
