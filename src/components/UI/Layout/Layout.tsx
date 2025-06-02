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
import { Outlet } from 'react-router-dom'
import { SideMenu, Header } from '~/components'

const sideMenuSections = [
  {
    items: [
      {
        label: 'Inbox',
        icon: <Inbox strokeWidth={1.5} />,
        onClick: () => {},
        badge: 8,
      },
    ],
  },
  {
    title: 'Perspective Groups',
    items: [
      {
        label: 'Perspective Groups',
        icon: <Folder strokeWidth={1.5} />,
        onClick: () => {},
      },
    ],
  },
  {
    title: 'Enrollments',
    items: [
      {
        label: 'Pre Coverage Periods',
        icon: <BookOpen strokeWidth={1.5} />,
        onClick: () => {},
      },
      {
        label: 'Coverage Periods',
        icon: <StickyNote strokeWidth={1.5} />,
        onClick: () => {},
        isActive: true,
      },
      {
        label: 'Enrollment Tasks',
        icon: <Briefcase strokeWidth={1.5} />,
        onClick: () => {},
      },
      {
        label: 'Customer Tickets',
        icon: <Ticket strokeWidth={1.5} />,
        onClick: () => {},
      },
    ],
  },
  {
    title: 'Discrepancies',
    items: [
      {
        label: 'Enrollment Discrepancies',
        icon: <FileSearch strokeWidth={1.5} />,
        onClick: () => {},
      },
    ],
  },
  {
    title: 'Reports',
    items: [
      {
        label: 'Member Counts',
        icon: <Users strokeWidth={1.5} />,
        onClick: () => {},
      },
      {
        label: 'SLA Performance',
        icon: <BarChart3 strokeWidth={1.5} />,
        onClick: () => {},
      },
      {
        label: 'Time to Production',
        icon: <Clock strokeWidth={1.5} />,
        onClick: () => {},
      },
    ],
  },
  {
    title: 'Admin',
    items: [
      {
        label: 'Users',
        icon: <Users strokeWidth={1.5} />,
        onClick: () => {},
      },
      {
        label: 'Account Settings',
        icon: <Settings strokeWidth={1.5} />,
        onClick: () => {},
      },
    ],
  },
]

const Layout = () => {
  return (
    <div className="min-h-screen flex">
      <SideMenu sections={sideMenuSections} />
      <main className="h-screen flex flex-1 flex-col">
        <Header />
        <div className="flex-1 p-6 overflow-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout
