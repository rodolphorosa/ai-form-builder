export const MenuContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-[540px] min-h-0 min-w-0 flex-1 overflow-y-auto p-2">
            {children}
        </div>
    )
}