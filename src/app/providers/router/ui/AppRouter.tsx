import { useCallback } from "react"
import { Suspense } from "react"
import { PageLoader } from "../../../../widgets/PageLoader/PageLoader"
import { Route, Routes } from "react-router-dom"
import { routeConfig, type AppRouteProps } from "../../../../shared/config/routeConfig/routeConfig"

const AppRouter = () => {
    const renderWithWrapper = useCallback((route:AppRouteProps)=>{
        const element = <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
        return <Route key={route.path} path={route.path} element={element} />
    },[])

    return <Routes>
        {Object.values(routeConfig).map(renderWithWrapper)}
    </Routes>
}

export default AppRouter;