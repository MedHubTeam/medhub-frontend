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
}

export const loggedInUser = new LoggedUserClass()
