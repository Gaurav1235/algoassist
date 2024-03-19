import { Quote } from "../components/Quote"
import { SignupComponent } from "../components/SignUpComponent"

export const Signup = () => {
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <SignupComponent></SignupComponent>  
            </div>
            <div className="hidden lg:block">
                <Quote></Quote>
            </div>
        </div>
    </div>
}