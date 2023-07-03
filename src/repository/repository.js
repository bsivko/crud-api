import crypto from 'crypto';

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  // General Store.
class Repository {    

    constructor() {
        this.users = [];
    }

    // Get all of users.
    getAllUsers() {
        return this.users;
    }

    // Get oly one.
    getByID(id) {
        let found = null;
        for (const u of this.users) { 
            if (id === u.uuid) {
                return u;
            }
        }

        return found;
    }

    // Delete one by id.
    deleteByID(id) {
        let result = [];
        for (const u of this.users) { 
            if (id !== u.uuid) {
                result.push(u);
            }
        }

        this.users = result;
    }

    // update or add if not exists.
    tryToUpdateUser(id, data) {

        let found = null;
        for (const u of this.users) { 
            if (id === u.uuid) {
                found = u;
                break;
            }
        }

        if (found === null) {
            this.users.push(data);
            return data; 
        }

        data = JSON.parse(data);
        if (data === null)
            return null;
        if (data['age'] && data['hobbies'] && data['username'])
        {
            if (typeof data['age'] !== 'number')
                return null; 

            if (typeof data['username'] !== 'string')
                return null; 

            if (!Array.isArray(data['hobbies']))
                return null; 

            if ((data['hobbies'].length > 0) && (typeof data['hobbies'][0] !== 'string'))
                return null;

            found['age'] = data['age'];
            found['hobbies'] = data['hobbies'];
            found['username'] = data['username'];

            return data;
        }
        else return null;
    }

    // Add as a POST. 
    // Returns null of not validated.
    tryToAddUser(data) {
        data = JSON.parse(data);
        if (data === null)
            return null;
        if (data['age'] && data['hobbies'] && data['username'])
        {
            if (typeof data['age'] !== 'number')
                return null; 

            if (typeof data['username'] !== 'string')
                return null; 

            if (!Array.isArray(data['hobbies']))
                return null; 

            if ((data['hobbies'].length > 0) && (typeof data['hobbies'][0] !== 'string'))
                return null;

            data['uuid'] = uuidv4();

            this.users.push(data);

            return data;
        }
        else return null;
    }
}  

 const repository = new Repository();

 export { repository };
 