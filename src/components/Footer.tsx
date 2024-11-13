import Contenedor from "./Container";

const Footer = () => {
    return (
        <footer className="mt-12 mb-8">
            <Contenedor className="flex justify-between gap-4">
                <p className="text-sm">
                    Factura App &copy; { new Date().getFullYear() }
                </p>
                <p className="text-sm">
                    Creado por Omar Schmidt con Next.JS, Xata y Clerk
                </p>
            </Contenedor>
        </footer>
    )
}

export default Footer;