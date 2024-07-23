class LoggedUserClass {
    #userID
    constructor() {
        this.#userID = null       
    }

    setUserLogin(data){
        this.#userID = data['data']['userID']
    }

    getUserId(){
        return this.#userID
    }
    
    printUser(){
        console.log(this.#userID)
    }

    logout(){
        this.#userID = null
    }

    checkLoggedInForPage() {
        return this.#userID == null
    }
    getUserDetails()  {
        // This should return the user details
        return {
            username: '',
            password: '',
            email: '',
            profession: ''
        }
    }
    updateUserDetails(userDetails)  {
        // This should handle updating the user details
        console.log('User details updated:', userDetails)
    }
 
}

export const loggedInUser = new LoggedUserClass()
