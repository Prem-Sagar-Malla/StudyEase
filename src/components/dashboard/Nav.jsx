import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cibBloggerB,
  cilBook,
  cilDoubleQuoteSansLeft,
  cilSchool,
  cilSettings,
  cilSpeedometer,
  cilContact
} from '@coreui/icons'
import { CNavGroup, CNavItem, } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Services',
    to: '/services',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Services',
        to: '/services/add-services',
      },
      {
        component: CNavItem,
        name: 'View All Services',
        to: '/services/view-all-services',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Classes',
    to: '/classes',
    icon: <CIcon icon={cilSchool} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Classes',
        to: '/classes/add-classes',
      },
      {
        component: CNavItem,
        name: 'View All Classes',
        to: '/classes/view-all-classes',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Subjects',
    to: '/subjects',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Subjects',
        to: '/subjects/add-subjects',
      },
      {
        component: CNavItem,
        name: 'View All Subjects',
        to: '/subjects/view-all-subjects',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Books',
    to: '/books',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Books',
        to: '/books/add-books',
      },
      {
        component: CNavItem,
        name: 'View All Books',
        to: '/books/view-all-books',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Blogs',
    to: '/blogs',
    icon: <CIcon icon={cibBloggerB} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Blogs',
        to: '/blogs/add-blogs',
      },
      {
        component: CNavItem,
        name: 'View All Blogs',
        to: '/blogs/view-all-blogs',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Quotes',
    to: '/quotes',
    icon: <CIcon icon={cilDoubleQuoteSansLeft} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Quotes',
        to: '/quotes/add-quotes',
      },
      {
        component: CNavItem,
        name: 'View All Quotes',
        to: '/quotes/view-all-quotes',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Contact Us',
    to: '/contact-us',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'View All Contacts',
        to: '/contact-us/view-all-contacts',
      },
    ],
  },
]

export default _nav
