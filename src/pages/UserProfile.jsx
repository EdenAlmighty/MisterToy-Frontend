import { useSelector } from "react-redux";
import { userService } from "../services/user.service"

export function UserProfile() {
    const user = useSelector(state => state.userModule.loggedInUser)

    // const user  = userService.getLoggedinUser()
    const userList = userService.getUsers()
    console.log(userList);

    return (
        <section>

            <h1>Profile</h1>
            <h2>{user.fullname}</h2>

            {user.isAdmin &&
                <section className="user-list">


                </section>
            }
        </section>
    )
}