class LoggedUserClass {
    #userID
    constructor() {
        this.#userID = null       
    }

    setUserLogin(data){
        this.#userID = data['data']['userID']
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
            username: 'john_doe',
            password: 'password123',
            email: 'john@example.com',
            profession: 'Developer'
        }
    }
    updateUserDetails(userDetails)  {
        // This should handle updating the user details
        console.log('User details updated:', userDetails)
    }
 
}

export const loggedInUser = new LoggedUserClass()
