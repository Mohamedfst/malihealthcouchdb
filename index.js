import express from 'express';
import bodyParser from 'body-parser';
import NodeCouchDb from 'node-couchdb';
import { v4 as uuidv4 } from 'uuid';
const app = express();
app.use(bodyParser.json()); //parsing


const couch = new NodeCouchDb({
    auth:{
        user:'admin',
        pass: 'M0m0r0ck5'
    }
});

const dbName = 'hcworkers';
const viewUrl = '_design/view1/_view/view1';

//routes
app.get('/hcworkers', function(req,res){
    couch.get(dbName, viewUrl).then(({data, headers, status}) => {
        res.status(200).json(data.rows);
}, err => {
        res.status(400).json({ err });
    });
});


app.post('/hcworkers', function(req,res){
    const reqBody = req.body;
    couch.uniqid().then(function(ids){
        const id = ids[0];
        couch.insert("hcworkers ", {
            _id: id,
            user_name:reqBody.user_name,
            user_middlename:reqBody.user_middlename,
            user_lastname:reqBody.user_lastname,
            user_dob:reqBody.user_dob,
            user_phone:reqBody.user_phone,
            user_emergencyNumber:reqBody.user_emergencyNumber,
            user_email:reqBody.user_email,
            user_address:reqBody.user_address,
            user_medlicense:reqBody.user_medlicense,
            user_natlicense:reqBody.user_natlicense,
            user_languages:reqBody.user_languages,
            user_team:reqBody.user_team,
            user_center:reqBody.user_center,
            user_organization:reqBody.user_organization,
            user_role:reqBody.user_role,
            user_photo:reqBody.user_photo,
                }).then(({data, headers, status}) => {
                    res.status(200).json(data);
                }, err => {
                    res.status(400).json(err);
                }); 
    }); 
});
app.listen(3000,function(){
    console.log('server started on port 3000');
});