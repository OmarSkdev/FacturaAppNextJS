import { OrganizationSwitcher, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import Contenedor from "./Container";
import Link from "next/link";

const Header = () => {
    return (
        <header className="mt-8 mb-12">
            <Contenedor>
                <div className="flex justify-between items-center gap-4">
                    <div>
                        <p className="font-bold">                        
                            <Link href='/dashboard'>Factura App</Link>
                        </p>
                        
                    </div>                
                    <div>
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>
            </Contenedor>
            
        </header>
    )
}

export default Header;