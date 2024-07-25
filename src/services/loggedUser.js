class LoggedUserClass {
    #userID
    constructor() {
        this.#userID = null       
        this.userDetails = null
    }

    setUserLogin(data){
        this.#userID = data['data']['userID']
        this.fetchUserDetails()
    }

    getUserId(){
        return this.#userID
    }


    printUser(){
        console.log(this.#userID)
    }

    logout(){
        this.#userID = null
        this.userDetails = null
    }

    checkLoggedInForPage() {
        return this.#userID == null
    }

    async fetchUserDetails() {
        // This function should fetch user details from backend and store in this.userDetails
        try {
            const response = await fetch(`/api/userDetails/${this.#userID}`)
            const data = await response.json()
            if (response.ok) {
                this.userDetails = data
            } else {
                console.error('Failed to fetch user details:', data)
            }
        } catch (error) {
            console.error('Error fetching user details:', error)
        }
    }

    getUserDetails()  {
        // This should return the user details
        return this.userDetails ||{
            username: '',
            password: '',
            email: '',
            profession: ''
        }
    }
    updateUserDetails(userDetails)  {
        // This should handle updating the user details
        console.log('User details updated:', userDetails)
        this.userDetails = userDetails
    }
 
}

export const loggedInUser = new LoggedUserClass()
