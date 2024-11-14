import { SignIn } from "@clerk/nextjs";

import Contenedor from "@/components/Container";

export default function Page(){
    return(
        <Contenedor className="flex justify-center">
            <SignIn />
        </Contenedor>
    )
}