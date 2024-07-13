import React from 'react'

import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
import { MdAdminPanelSettings } from 'react-icons/md'

const links = [
  {
    text: 'meals',
    path: '.',
    icon: <MdQueryStats />,
  },
  {
    text: 'schedule meal',
    path: 'schedule-meal',
    icon: <FaWpforms />,
  },
  {
    text: 'add item',
    path: 'add-item',
    icon: <IoBarChartSharp />,
  },
  {
    text: 'items',
    path: 'items',
    icon: <ImProfile />,
  },
  {
    text: 'create meal',
    path: 'create-meal',
    icon: <MdAdminPanelSettings />,
  },
]

export default links
