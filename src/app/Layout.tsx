import {ReactNode} from "react";

function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="md:container h-full w-full">
            { children }
        </div>
    );
}

export default Layout;
