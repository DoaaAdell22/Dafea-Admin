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
import { AiFillNotification } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { IoDocumentsOutline } from "react-icons/io5";
import { TbTransform } from "react-icons/tb";

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
 
  
  // {
  //   key: "Users",
  //   to: "Users",
  //   label: <FormattedMessage id="Users" />,
  //   icon: <FaUsers className="!text-xl" />,
  //   disabled: false,
  // },
  {
    key: "Users",
    label: <FormattedMessage id="Clients" />,
    icon: <TbUsersGroup className="!text-xl" />,
    disabled: false,
    children : [
      {
        key: "Users",
      to: "Users",
      label: <FormattedMessage id="Users" />,
      icon: <FiUsers className="!text-xl" />,
      disabled: false,
      },
      {
        key: "business-info-files",
      to: "business-info-files",
      label: <FormattedMessage id="Documentation-files" />,
      icon: <IoDocumentsOutline className="!text-xl" />,
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
  // {
  //   key: "Subscription-Plan",
  //   to: "Subscription-Plan",
  //   label: <FormattedMessage id="Subscription-Plan" />,
  //   icon: <MdOutlineNextPlan className="!text-xl" />,
  //   disabled: false,
  // },
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
    key: "transformed-order",
    to: "transformed-order",
    label: <FormattedMessage id="Transformed-order" />,
    icon: <TbTransform className="!text-xl" />,
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
  {
    key: "General-notification",
    to: "General-notification",
    label: <FormattedMessage id="General-notification" />,
    icon: <AiFillNotification className="!text-xl" />,
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

