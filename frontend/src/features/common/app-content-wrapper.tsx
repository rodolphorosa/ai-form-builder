export default function AppContentWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row h-screen w-full overflow-hidden">
            {children}
        </div>
    )
}