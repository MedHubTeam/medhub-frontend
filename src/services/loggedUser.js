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
        return this.#userID === null
    }
}

export const loggedInUser = new LoggedUserClass()
