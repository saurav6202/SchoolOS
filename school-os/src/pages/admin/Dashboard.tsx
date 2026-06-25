import QuickStats from "../../components/admin/dashboard/QuickStats"
import WelcomeBanner from "../../components/admin/dashboard/WelcomeBanner"

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <WelcomeBanner />
      <QuickStats />
    </div>
  )
}

export default Dashboard
