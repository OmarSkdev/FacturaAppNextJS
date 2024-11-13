
import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function Home() {
  return (
    
      <main className="flex flex-col justify-center h-full text-center gap-6 max-w-5xl mx-auto" >
        <h1 className="text-5xl font-bold">Factura App</h1>  
        <p>
          
          
          <Button asChild>
            <Link href="/dashboard">
              Iniciar Sesión
            </Link>
          </Button>
        </p>     
      </main>      
    
  );
}
