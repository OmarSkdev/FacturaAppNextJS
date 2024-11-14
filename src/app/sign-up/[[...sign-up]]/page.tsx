import Contenedor from "@/components/Container";
import { SignUp } from "@clerk/nextjs";

export default function Page(){
    return (
        <Contenedor>
            <SignUp />
        </Contenedor>
        
    )
}