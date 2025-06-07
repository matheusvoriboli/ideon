import {
  Folder,
  Inbox,
  Briefcase,
  Ticket,
  Users,
  BarChart3,
  Clock,
  Settings,
  BookOpen,
  StickyNote,
  FileSearch,
} from 'lucide-react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { SideMenu, Header } from '~/components'
import { Routes, notImplemented } from '~/utils'

const Layout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleDashboardChange = (dashboard: {
    id: string
    title: string
    acronym: string
  }) => {
    notImplemented(dashboard.title)
  }

  const sideMenuSections = [
    {
      items: [
        {
          label: 'Inbox',
          icon: <Inbox strokeWidth={1.5} />,
          onClick: () => navigate(Routes.INBOX),
          badge: 8,
          isActive: location.pathname === Routes.INBOX,
        },
      ],
    },
    {
      title: 'Perspective Groups',
      items: [
        {
          label: 'Perspective Groups',
          icon: <Folder strokeWidth={1.5} />,
          onClick: () => notImplemented('Perspective Groups'),
        },
      ],
    },
    {
      title: 'Enrollments',
      items: [
        {
          label: 'Pre Coverage Periods',
          icon: <BookOpen strokeWidth={1.5} />,
          onClick: () => notImplemented('Pre Coverage Periods'),
        },
        {
          label: 'Coverage Periods',
          icon: <StickyNote strokeWidth={1.5} />,
          onClick: () => navigate(Routes.COVERAGE_PERIODS),
          isActive: location.pathname === Routes.COVERAGE_PERIODS,
        },
        {
          label: 'Enrollment Tasks',
          icon: <Briefcase strokeWidth={1.5} />,
          onClick: () => notImplemented('Enrollment Tasks'),
        },
        {
          label: 'Customer Tickets',
          icon: <Ticket strokeWidth={1.5} />,
          onClick: () => notImplemented('Customer Tickets'),
        },
      ],
    },
    {
      title: 'Discrepancies',
      items: [
        {
          label: 'Enrollment Discrepancies',
          icon: <FileSearch strokeWidth={1.5} />,
          onClick: () => notImplemented('Enrollment Discrepancies'),
        },
      ],
    },
    {
      title: 'Reports',
      items: [
        {
          label: 'Member Counts',
          icon: <Users strokeWidth={1.5} />,
          onClick: () => notImplemented('Member Counts'),
        },
        {
          label: 'SLA Performance',
          icon: <BarChart3 strokeWidth={1.5} />,
          onClick: () => notImplemented('SLA Performance'),
        },
        {
          label: 'Time to Production',
          icon: <Clock strokeWidth={1.5} />,
          onClick: () => notImplemented('Time to Production'),
        },
      ],
    },
    {
      title: 'Admin',
      items: [
        {
          label: 'Users',
          icon: <Users strokeWidth={1.5} />,
          onClick: () => notImplemented('Users'),
        },
        {
          label: 'Account Settings',
          icon: <Settings strokeWidth={1.5} />,
          onClick: () => notImplemented('Account Settings'),
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen flex bg-ideon-light dark:bg-ideon-dark">
      <aside role="navigation" aria-label="Main menu">
        <SideMenu
          sections={sideMenuSections}
          onDashboardChange={handleDashboardChange}
        />
      </aside>
      <main className="h-screen flex flex-1 flex-col" role="main">
        <Header />
        <section
          className="flex-1 p-6 overflow-hidden bg-ideon-light dark:bg-ideon-dark"
          aria-label="Main content"
        >
          <Outlet />
        </section>
      </main>
    </div>
  )
}

export default Layout
