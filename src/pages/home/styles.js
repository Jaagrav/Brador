const styles = {
    homePage: {
        height: "100vh",
        width: "100vw",
    },    
    backdrop: {
        zIndex: 100,
        color: '#fff',
        backdropFilter: "blur(15px)",
    },
    brandingName: {
        fontSize: 40,
        fontFamily: "Cinzel, sans-serif",
        textAlign: "center",
        color: "white",
        padding: "10px 0"
    },
    bradorsContainer: {
        width: "95%",
        maxWidth: "40pc",
        background: "#274860cc",
        // backdropFilter: "blur(15px)",
        borderRadius: "8px",
        margin: "0 auto",
        padding: "14px",
        maxHeight: "calc(100% - 85px)",
        overflow: "hidden auto",
    },
    bradorsHeader: {
        display: "grid",
        gridTemplateColumns: "1fr auto auto",
    },
    bradorHeaderSpan: {
        fontSize: 24,
        margin: "auto 0",
    },
    photoURL: {
        height: "40px",
        width: "40px",
        borderRadius: "8px",
        margin: "auto",
        cursor: "pointer",
    },
    brador: {
        display: "grid",
        gridGap: "10px",
        gridTemplateColumns: (window.innerWidth > 600)?"auto 1fr 1fr 1fr":"auto 1fr",
        background: "rgba(39, 42, 62, 0.61)",
        borderRadius: "8px",
        padding: (window.innerWidth > 600)?"10px":"20px 10px",
        marginTop: 10,
    },
    bradorDragHandleHolder: {
        display: "flex"
    },
    bradorDragHandle: {
        margin: "auto",
        cursor: "grab",
    },
    bradorTitle: {
        fontSize: "1.3rem",
        margin: "auto 0",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    bradorLastUpdated: {
        padding: "2px 20px",
        gridTemplateRows: "auto auto",
        textAlign: "center",
        display: (window.innerWidth > 600)?"grid":"none",
    },
    bradorCreated: {
        padding: "2px 20px",
        gridTemplateRows: "auto auto",
        textAlign: "center",
        display: (window.innerWidth > 600)?"grid":"none",
    },
    bradorSmallSpan: {
        fontSize: 12
    }
};

export {styles}; 