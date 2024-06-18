"use client";
import { useParams } from "next/navigation"

const Hero = ({ params }: { params: { id: string } }) => {
    return(
        <div>
            <p>hero {params.id}</p>
        </div>
    )
}
export default Hero