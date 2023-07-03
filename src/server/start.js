import * as http from 'http';
import {repository} from './../repository/repository.js'

const host = 'localhost'; 
const port = 8000; 

const notFound = (res) => {
    res.writeHead(404); 
    res.end(JSON.stringify({error:"Resource not found"})); 
}

const notValid = (res) => {
    res.writeHead(400); 
    res.end(JSON.stringify({error:"User not valid"})); 
}

const processById = (id, req, res) => {
    if (req.method === 'GET') {

        const data = repository.getByID(id);
        if (data === null) {
            notFound(res);
            return;
        }

        res.writeHead(200);
        res.end(JSON.stringify(data)); 
        return;
    }
    else if (req.method === 'PUT') {
        var body = '';

        req.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        req.on('end', function () {

            const obj = JSON.parse(JSON.stringify(body));

            const o = repository.tryToUpdateUser(id, obj);

            if (o === null)
                notValid(res);
            else 
            {
                res.writeHead(200);
                res.end(JSON.stringify(o));
            }
        });

        return;
    }
    else if (req.method === 'DELETE') {
        repository.deleteByID(id);
        res.writeHead(200);
        res.end(JSON.stringify('')); 
        return;
    }
}



const start_server_impl = async () => {
    const requestListener = function (req, res) { 

        res.setHeader("Content-Type", "application/json"); 

        if (req.url.startsWith('/api/users/'))
        {
            const id = req.url.substring('/api/users/'.length);  

            processById(id, req, res);
            return;   
        }

        switch (req.url) { 
            case "/api/users": 
                if (req.method === 'GET') {
                    res.writeHead(200);
                    res.end(JSON.stringify(repository.getAllUsers())); 
                    break
                }
                else if (req.method === 'POST') {
                    var body = '';

                    req.on('data', function (data) {
                        body += data;
            
                        // Too much POST data, kill the connection!
                        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                        if (body.length > 1e6)
                            request.connection.destroy();
                    });
            
                    req.on('end', function () {

                        const obj = JSON.parse(JSON.stringify(body));

                        const o = repository.tryToAddUser(obj);

                        if (o === null)
                            notValid(res);
                        else 
                        {
                            res.writeHead(200);
                            res.end(JSON.stringify(o));
                        }
                    });
                }
                else 
                    notFound(res);
                break
            default: 
                {
                    notFound(res);
                    break
                }
                    
        } 

    };

    const server = http.createServer(requestListener); 
    server.listen(port, host, () => { 
        console.log(`Server is running on http://${host}:${port}`); 
    });
};

export function start_server() {
    start_server_impl();
}