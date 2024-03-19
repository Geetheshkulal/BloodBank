const express=require("express");
const mysql=require("mysql");
const cors=require("cors");

const app=express();
app.use(cors());
app.use(express.json());
// database
const db=mysql.createConnection(
    {
        host:'localhost',
        user:"root",
        password:"",
        database:"bloodcenter"
    })



    app.get('/',(req,res)=>{
        const sql="SELECT *FROM ";
        db.query(sql, (err,result)=>{
            if(err) return res.json({Message:"error in server"});
            return res.json(result);
    
        })
    })
    app.get('/Donate',(req,res)=>{
        const sql="SELECT *FROM blood_donate";
        db.query(sql, (err,result)=>{
            if(err) return res.json({Message:"error in server"});
            return res.json(result);
    
        })
    })


 //user signup   
app.post('/Signup',(req,res)=>{
    const sql = "INSERT INTO signup (`user_name`, `user_email`, `user_password`) VALUES (?)";

    const values=[req.body.user_name,req.body.user_email,req.body.user_password]
    db.query(sql,[values],(err,data)=>{
        if(err){
            console.error("Error executing SQL query:", err);
            return res.json("error");
        }
        return res.json(data);
    })
})


app.get('/admindashboard',(req,res)=>{
    const sql="SELECT *FROM patient";
    db.query(sql, (err,result)=>{
        if(err) return res.json({Message:"error in server"});
        return res.json(result);

    })
})


app.post('/donation',(req,res)=>{
    const sql="INSERT INTO donation (`user_name`,`user_gender`,`user_age`,`user_group`,`user_address`,`user_phone`) VALUES (?)";
    console.log(req.body)
    const values = [
        req.body.name,
        req.body.gender,
        req.body.age,
        req.body.bloodgroup,
        req.body.address,
        req.body.phone,
    ]
      db.query(sql, [values], (err,result)=>{
        if(err) return res.json(err);
        return res.json(result);
      })
})


app.get('/read/:id', (req,res)=>{
    const sql = "SELECT * FROM patient WHERE patient_id = ?";
    const id=req.params.id;
    
    db.query(sql,[id], (err,result)=>{
    if(err) return res.json({Message: "error in server"});
    return res.json(result);
})
})



app.put('/edit/:id', (req , res)=>{
    const sql='UPDATE patient SET `patient_name`=?,`patient_age`=?,`patient_gender`=?,`patient_phone`=?,`patient_address`=?,`patient_group`=?,`patient_unit`=? WHERE patient_id=?';
    const id=req.params.id;
    db.query(sql,[req.body.name, req.body.age, req.body.gender, req.body.phone, req.body.address, req.body.group,req.body.unit, id], (err, result)=>{
        if(err) return res.json({Message: "error in server"});
    return res.json(result);

    })
})


app.delete('/delete/:id',(req,res)=>{
    const sql = "DELETE FROM patient WHERE patient_id=? ";
    const id=req.params.id;
    db.query(sql,[id], (err, result)=>{
        if(err) return res.json({Message: "error in server"});
    return res.json(result);

    })



})



// old crud operation

// app.get('/admindashboard',(req,res)=>{
//     const sql="SELECT *FROM donation";
//     db.query(sql, (err,result)=>{
//         if(err) return res.json({Message:"error in server"});
//         return res.json(result);

//     })
// })


// app.post('/donation',(req,res)=>{
//     const sql="INSERT INTO donation (`user_name`,`user_gender`,`user_age`,`user_group`,`user_address`,`user_phone`) VALUES (?)";
//     console.log(req.body)
//     const values = [
//         req.body.name,
//         req.body.gender,
//         req.body.age,
//         req.body.bloodgroup,
//         req.body.address,
//         req.body.phone,
//     ]
//       db.query(sql, [values], (err,result)=>{
//         if(err) return res.json(err);
//         return res.json(result);
//       })
// })

// app.get('/read/:id', (req,res)=>{
//     const sql = "SELECT * FROM donation WHERE user_id = ?";
//     const id=req.params.id;
    
//     db.query(sql,[id], (err,result)=>{
//     if(err) return res.json({Message: "error in server"});
//     return res.json(result);
// })
// })



// app.put('/edit/:id', (req , res)=>{
//     const sql='UPDATE donation SET `user_name`=?,`user_gender`=?,`user_age`=?,`user_group`=?,`user_address`=?,`user_phone`=? WHERE user_id=?';
//     const id=req.params.id;
//     db.query(sql,[req.body.name, req.body.gender, req.body.age, req.body.bloodgroup, req.body.address, req.body.phone, id], (err, result)=>{
//         if(err) return res.json({Message: "error in server"});
//     return res.json(result);

//     })
// })


// app.delete('/delete/:id',(req,res)=>{
//     const sql = "DELETE FROM donation WHERE user_id=? ";
//     const id=req.params.id;
//     db.query(sql,[id], (err, result)=>{
//         if(err) return res.json({Message: "error in server"});
//     return res.json(result);

//     })



// })


//patient

app.get('/requestblood',(req,res)=>{
    const sql="SELECT *FROM patient";
    db.query(sql, (err,result)=>{
        if(err) return res.json({Message:"error in server"});
        return res.json(result);

    })
})

app.post('/requestblood', (req, res) => {
    const patientValues = [
        req.body.name,
        req.body.age,
        req.body.group,
        req.body.gender,
        req.body.phone,
        req.body.address,
        req.body.unit
    ];

    const patientSql = "INSERT INTO patient (`patient_name`, `patient_age`,`patient_group`, `patient_gender`, `patient_phone`, `patient_address`, `patient_unit`) VALUES (?)";

    db.query(patientSql, [patientValues], (err, result) => {
        if (err) {
            return res.json(err);
        }

        const p_id = result.insertId; // Get the auto-generated p_id from the patient insertion

        const bloodValues = [
            req.body.group,
            req.body.unit,
            p_id
        ];

        const bloodSql = "INSERT INTO blood (`bloodgroup`, `units`, `patient_id`) VALUES (?)";

        db.query(bloodSql, [bloodValues], (err, result) => {
            if (err) {
                return res.json(err);
            }
            return res.json(result);
        });
    });
});





// old request blood


// app.post('/requestblood',(req,res)=>{
//     const sql="INSERT INTO patient (`patient_name`,`patient_age`,`patient_gender`,`patient_phone`,`patient_address`,`patient_group`,`patient_unit`) VALUES (?)";
//     console.log(req.body)
//     const values = [
//         req.body.name,
//         req.body.age,
//         req.body.gender,
//         req.body.phone,
//         req.body.address,
//         req.body.group,
//         req.body.unit,
    
//     ]
//       db.query(sql, [values], (err,result)=>{
//         if(err) return res.json(err);
//         return res.json(result);
//       })
// })



// donor
app.post('/donateblood', (req, res) => {
    const donorValues = [
        req.body.donor_name,
        req.body.donor_age,
        req.body.donor_group,
        req.body.donor_gender,
        req.body.donor_phone,
        req.body.donor_address,
        req.body.bloodbank_name,
    ];

    const donorSql = "INSERT INTO donor (`donor_name`, `donor_age`, `donor_group`, `donor_gender`, `donor_phone`, `donor_address`, `bloodbank_name`) VALUES (?)";
    
    db.query(donorSql, [donorValues], (err, result) => {
        if (err) {
            return res.json(err);
        }

        const donorId = result.insertId;

        const bloodValues = [
            req.body.bloodbank_name,
            donorId
        ];

        const bloodSql = "INSERT INTO bloodbank (`bloodbank_name`, `donor_id`) VALUES (?, ?)";

        db.query(bloodSql, bloodValues, (err, result) => {
            if (err) {
                return res.json(err);
            }
            return res.json(result);
        });
    });
});

app.get('/donatelist', (req, res) => {
    const sql = "SELECT * FROM donor";
    db.query(sql, (err, result) => {
        if (err) {
            return res.json({ Message: "error in server" });
        }
        return res.json(result);
    });
});





app.post('/adminlogin', (req, res) => {
    const { Admin_email, Admin_password } = req.body;
    const sql = "SELECT Admin_id, bloodbank_id FROM admin_signup WHERE Admin_email = ? AND Admin_password = ?";
    db.query(sql, [Admin_email, Admin_password], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.json({ status: 'error', message: 'Error in server' });
        }
        if (result.length > 0) {
            const bloodbank_id = result[0].bloodbank_id;
            const sqlBloodBank = "SELECT * FROM bloodbank WHERE bloodbank_id = ?";
            db.query(sqlBloodBank, [bloodbank_id], (err, bloodBankResult) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    return res.json({ status: 'error', message: 'Error in server' });
                }
                if (bloodBankResult.length > 0) {
                    const adminData = { admin_email: Admin_email };
                    const bloodBankData = bloodBankResult[0];
                    return res.json({ status: 'success', adminData, bloodBankData });
                } else {
                    return res.json({ status: 'error', message: 'Blood bank details not found' });
                }
            });
        } else {
            return res.json({ status: 'error', message: 'Invalid email or password' });
        }
    });
});


app.listen(8080,()=>{
    console.log("listening");
})




  

  