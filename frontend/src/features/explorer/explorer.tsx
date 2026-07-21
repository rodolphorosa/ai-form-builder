import { Sidebar } from "./sidebar"
import { Projects } from "./projects"

interface ExplorerProps {

}


export const Explorer = ({ }: ExplorerProps) => {
    return (
        <div className="flex flex-row h-screen w-screen overflow-hidden">
            <Sidebar />
            <div className="w-[65%] mx-auto">
                <Projects />
            </div>
        </div>
    )
}