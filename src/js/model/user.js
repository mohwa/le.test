
/**
 * User 클래스
 */
class User{

    constructor({
        id = 'yanione2@gmail.com',
        name = '전성균',
        sex = 'male'
    } = {}){

        this.id = id;
        this.name = name;
        this.sex = sex;
    }
}

module.exports = User;

  
