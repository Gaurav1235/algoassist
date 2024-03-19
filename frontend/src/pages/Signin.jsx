import { Quote } from "../components/Quote"
import { SigninComponent } from "../components/SignInComponent"

export const Signin = () => {
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <SigninComponent></SigninComponent>  
            </div>
            <div className="hidden lg:block">
                <Quote></Quote>
            </div>
        </div>
    </div>
}