export const navbarStyles = {
    drawer:{
        width:250,
        flexShrink:0,
        '& .MuiDrawer-paper':{
            width:250,
            top:'65px',
            boxSizing:'border-box',
            backgroundColor:'#304663',
            fontFamily: 'Arial Narrow',
            color:'rgba(255, 255, 255, 0.7)'
        },
        '& .Mui-selected':{
            color:'red',
        },
    },
    icons : {
        marginLeft:'10px',
        color: 'rgba(255, 255, 255, 0.7)!important'
    },
    text:{
        '& span':{
            fontSize:'16px',
            fontWeight:'600',
            fontFamily: 'Arial Narrow',
            marginLeft:'-10px'
        }
    },
    text1:{
        '& span':{
            fontSize:'16px',
            fontWeight:'600',
            marginLeft:'-10px',
            fontFamily: 'Arial Narrow',
            color:'purple'
        }
    }
}