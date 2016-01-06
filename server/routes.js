/**
 * Main application routes
 */

'use strict';


import path from 'path';

import  mutilpart from "connect-multiparty";

export default function(app) {
    // Insert routes below
    // All undefined asset or api routes should return a 404

 

    app.use('/node/common', require("./routes/common"));
    app.use('/node/account', require("./routes/account"));


    // 以下的需要登录; 
    app.use('/node', function(req, res, next) {
        // 检查 session user ;
        if (req.session.user) {
            next();

        } else {
            res.json({
                order: "login",
                originalUrl: req.originalUrl
            })
        }
    });

    var multipartMiddleware  =   mutilpart()  ;  
    app.use("/node/picture", multipartMiddleware , require("./routes/picture")); 


    app.use('/node/driver', require("./routes/driver"));
    app.use('/node/devmodel', require("./routes/model_device"));
    app.use('/node/profile', require("./routes/model_profile"));
    app.use('/node/sysmodel', require("./routes/model_system"));
    app.use('/node/region', require("./routes/region"));
    app.use('/node/role', require("./routes/role"));
    app.use('/node/show', require("./routes/show"));
    //jjw
    app.use('/node/line', require("./routes/line"));

    app.use('/node/subscribe', require("./routes/subscribe"));
    app.use('/node/system', require("./routes/system"));
    app.use('/node/user', require("./routes/user"));

    app.use('/node/usergroup', require("./routes/usergroup"));

    app.use('/node/ticket', require("./routes/ticket"));

    app.use('/node/sms', require("./routes/sms"));


  

    app.route('/:url(api|auth|app|components|bower_components|assets)/*')  //components
        .get( (req, res) => {
                var viewFilePath = '404';
                var statusCode = 404;
                var result = {
                    status: statusCode
                };

                res.status(result.status);
                res.render(viewFilePath, {}, function(err, html) {
                    if (err) {
                        return res.json(result, result.status);
                    }

                    res.send(html);
                });
            }

        );

    // All other routes should redirect to the index.html
    app.route('/*').get((req, res) => {
            res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
        });
}
