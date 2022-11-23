class UserDto{
    email;
    id;
    isActivated;
    roles;
    firstName;
    
    lastName;
    constructor(model){
        this.email = model.email
        this.id = model._id
        this.isActivated = model.isActivated
        this.roles = model.roles
        this.firstName=model.firstName
        this.lastName = model.lastName
    }
}
export default UserDto;