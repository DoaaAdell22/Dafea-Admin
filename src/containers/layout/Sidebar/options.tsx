import {
  AppstoreOutlined,
  UserOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { GiWorld } from "react-icons/gi";

import { FaBoxOpen, FaCodeBranch, FaListUl, FaUser } from "react-icons/fa6";
import { FaMoneyBillWave } from "react-icons/fa";

import { IoIosSettings } from "react-icons/io";

import { FaUsers } from "react-icons/fa";

import { MdOutlineNextPlan } from "react-icons/md";
import { MdSwapHorizontalCircle } from "react-icons/md";
import { AiOutlineFileText } from "react-icons/ai";

import { FaTreeCity } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import { TbUsersGroup } from "react-icons/tb";
import { MdPendingActions } from "react-icons/md";
import { MdIncompleteCircle } from "react-icons/md";
import { BsClock } from "react-icons/bs";

// Registrations



interface MenuItem {
  key: string;
  to?: string;
  icon?: any;
  label: any;
  onClick?: () => void;
  hidden?: boolean;
  disabled?: boolean;
  children?: MenuItem[];
}
const getMenuItems: (profile) => MenuItem[] = (profile) =>{ 
  return [
 
  
  {
    key: "Users",
    to: "Users",
    label: <FormattedMessage id="Users" />,
    icon: <FaUsers className="!text-xl" />,
    disabled: false,
  },
  {
    key: "merchants",
    label: <FormattedMessage id="merchants" />,
    icon: <TbUsersGroup className="!text-xl" />,
    disabled: false,
    children : [
      {
        key: "current",
      to: "current",
      label: <FormattedMessage id="current" />,
      icon: <BsClock className="!text-xl" />,
      disabled: false,
      },
      {
        key: "pending",
      to: "pending",
      label: <FormattedMessage id="Pending" />,
      icon: <MdPendingActions className="!text-xl" />,
      disabled: false,
      },
      {
        key: "Uncompleted",
      to: "Uncompleted",
      label: <FormattedMessage id="Uncompleted" />,
      icon: <MdIncompleteCircle className="!text-xl" />,
      disabled: false,
      },
    ]
  },
  {
    key: "Countries",
    to: "Countries",
    label: <FormattedMessage id="Countries" />,
    icon: <GiWorld className="!text-xl" />,
    disabled: false,
  },
  {
    key: "Cities",
    to: "Cities",
    label: <FormattedMessage id="Cities" />,
    icon: <FaTreeCity className="!text-xl" />,
    disabled: false,
  },
  {
    key: "Subscription-Plan",
    to: "Subscription-Plan",
    label: <FormattedMessage id="Subscription-Plan" />,
    icon: <MdOutlineNextPlan className="!text-xl" />,
    disabled: false,
  },
  {
    key: "Withdraws",
    to: "Withdraws",
    label: <FormattedMessage id="Withdraws" />,
    icon: <FaMoneyBillWave className="!text-xl" />,
    disabled: false,
  },
  {
    key: "Transactions",
    to: "Transactions",
    label: <FormattedMessage id="Transactions" />,
    icon: <MdSwapHorizontalCircle className="!text-xl" />,
    disabled: false,
  },
  {
    key: "Orders",
    to: "Orders",
    label: <FormattedMessage id="Orders" />,
    icon: <AiOutlineFileText className="!text-xl" />,
    disabled: false,
  },
  {
    key: "Faq",
    to: "Faq",
    label: <FormattedMessage id="Faq" />,
    icon: <FaQuestionCircle className="!text-xl" />,
    disabled: false,
  },
  {
    key: "Settings",
    to: "Settings",
    label: <FormattedMessage id="Settings" />,
    icon: <IoIosSettings className="!text-xl" />,
    disabled: false,
  },
  
  
  

  // {
  //   key: "offers-group",
  //   label: <FormattedMessage id={"offers"} />,
  //   icon: <IoMdSettings className="!text-xl" />,
  //   disabled: false,
  //   children: [
  //     {
  //       key: "offers",
  //       to: "offers",
  //       label: <FormattedMessage id="offers" />,
  //       icon: <MdPolicy className="!text-xl" />,
  //       disabled: false,
  //       hidden: false,
  //     },
  //     {
  //       key: "voucher",
  //       to: `voucher`,
  //       label: <FormattedMessage id="voucher" />,
  //       icon: <AppstoreOutlined />,
  //       disabled: false,
  //       // hidden: !getPermissions("permissions", "Get", profile),
  //     },
  //   ],
  // },
]};
export default getMenuItems;

