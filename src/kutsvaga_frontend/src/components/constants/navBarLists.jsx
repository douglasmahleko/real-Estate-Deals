import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonIcon from '@mui/icons-material/Person';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import EventNoteIcon from '@mui/icons-material/EventNote';

export const NavBarLists = [
    {
        id : 0,
        icon : <HomeIcon />,
        label : "Home",
        level : "both",
        route : "/"
    },
    {
        id : 1,
        icon : <PersonAddIcon />,
        label : "Register as Agent",
        level : "both",
        route : "addAgent"
    },
    {
        id : 2,
        icon : <GroupAddIcon />,
        label : "Register as Client",
        level : "both",
        route : "addClient"
    },
    {
        id : 3,
        icon : <SwapHorizIcon />,
        label : "Show Clients",
        level : "AGENT",
        route : "showClients"
    },
    {
        id : 4,
        icon : <AddHomeWorkIcon />,
        label : "Add House",
        level : "AGENT",
        route : "addHouse"
    },
    {
        id : 5,
        icon : <MapsHomeWorkIcon />,
        label : "Show Houses",
        level : "both",
        route : "showHouses"
    },
    {
        id : 6,
        icon : <AllInclusiveIcon />,
        label : "Payment History",
        level : "both",
        route : "history"
    },
    {
        id : 7,
        icon : <SupportAgentIcon />,
        label : "Show Agents",
        level : "CLIENT",
        route : "showAgents"
    },
    {
        id : 8,
        icon : <EventNoteIcon />,
        label : "Add Prerequisites",
        level : "CLIENT",
        route : "myPrerequisites"
    },
    {
        id : 9,
        icon : <LocalGroceryStoreIcon />,
        label : "Houses Off Market",
        level : "AGENT",
        route : "offMarket"
    },
    {
        id : 10,
        icon : <PlaylistAddCircleIcon />,
        label : "Preview Prerequisites",
        level : "both",
        route : "previewPrerequisites"
    },
    {
        id : 11,
        icon : <FormatListNumberedRtlIcon />,
        label : "View Short Lists",
        level : "both",
        route : "viewShortLists"
    },
    {
        id : 12,
        icon : <AssistantPhotoIcon />,
        label : "Houses Reccommended",
        level : "both",
        route : "recommendations"
    },
    {
        id : 13,
        icon : <ManageAccountsIcon />,
        label : "Edit Contact",
        level : "both",
        route : "editProfile"
    },
    {
        id : 14,
        icon : <PersonIcon />,
        label : "Show Profile",
        level : "both",
        route : "showProfile"
    }    
]