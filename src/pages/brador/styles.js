const styles = {
    bradorPage: {
        height: "100vh",
        width: "100vw",
        display: "grid",
        gridTemplateRows: "auto 1fr"
    },
    header: {
        width: "100%",
        padding: "0 14px",
        display: "grid",
        gridTemplateColumns: "auto auto auto"
    },
    brandingName: {
        fontSize: 20,
        fontFamily: "Cinzel, sans-serif",
        color: "white",
        padding: "10px 0"
    },
    bradorTitle: {
        textAlign: "center",
        background: "none",
        outline: "none",
        border: "none",
        fontWeight: "600",
        fontSize: 14
    },
    photoURL: {
        height: "30px",
        width: "30px",
        borderRadius: "8px",
        margin: "auto 0 auto auto",
    },
    body: {
        padding: "0 14px 14px 14px",
        overflow: "auto"
    },
    backdrop: {
        zIndex: 100,
        color: '#fff',
        backdropFilter: "blur(15px)",
    },
    list: {
        background: "rgba(39, 72, 96, 0.8)",
        height: "fit-content",
        width: "18pc",
        minWidth: "18pc",
        maxWidth: "18pc",
        borderRadius: "6px",
        marginRight: "14px"
    },
    listHead: {
        display: "grid",
        gridTemplateColumns: "1fr auto",
        padding: "10px 0"
    },
    createNail: {
        display: "grid",
        gridTemplateColumns: "1fr auto",
        marginTop: "-10px",
    },
    newNailTitle: {
        margin: 12,
        background: "transparent",
        outline: "none",
        border: "none",
        resize: "none",
    },
    listTitle: {
        margin: "auto 0",
        width: "100%",
        padding: "0 14px",
        background: "transparent",
        outline: "none",
        border: "none",
        fontSize: "18px",
        resize: "none",
        pointerEvents: "none"
    },
    nailTitle: {
        margin: "auto 0",
        width: "100%",
        background: "transparent",
        outline: "none",
        border: "none",
    },
    nailsList: {
        padding: "1px 0"
    },
    nail: {
        background: "rgba(39, 42, 62, 0.61)",
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        marginBottom: "12px",
        padding: "10px 0"
    },
    nailDragHandle: {
        margin: "auto"
    },
    nailContent: {
        fontSize: "14px",
        margin: "auto 0",
        resize: "none",
        cursor: "context-menu",
        lineHeight: "18px"
    },
    dragIcon: {
        verticalAlign: "middle",
        margin: "0 2px 0 4px"
    },
    options: {
        height: "fit-content",
        margin: "auto"
    }
}

export {styles};