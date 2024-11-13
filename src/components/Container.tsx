import { cn } from "@/lib/utils"

interface ContenedorProps extends React.ComponentProps<"div">{

}

const Contenedor = ({ children, className, ...props}: ContenedorProps) => {
    return (
        <div {...props} className={cn('max-w-5xl mx-auto px-5', className)}>
            {children}
        </div>
    )
}

export default Contenedor;