const styles = {
    bradorPage: {
        height: "100vh",
        width: "100vw",
        display: "grid",
        gridTemplateRows: "auto 1fr"
    },
    header: {
        padding: "0 14px",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)"
    },
    brandingName: {
        fontSize: 30,
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
        fontSize: 18
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
    list: {
        background: "rgba(39, 72, 96, 0.8)",
        height: "fit-content",
        width: "18pc",
        borderRadius: "6px",
        marginRight: "14px"
    },
    listHead: {
        display: "grid",
        gridTemplateColumns: "1fr auto",
    },
    listTitle: {
        margin: "auto 0",
        padding: "0 14px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    nail: {
        background: "rgba(39, 42, 62, 0.61)",
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        marginBottom: "12px"
    },
    nailDragHandle: {
        margin: "auto"
    },
    nailContent: {
        fontSize: "14px",
        margin: "auto 0",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    dragIcon: {
        verticalAlign: "middle",
        margin: "0 2px 0 4px"
    }
}

export {styles};